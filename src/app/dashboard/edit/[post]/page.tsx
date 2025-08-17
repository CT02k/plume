// app/edit/[post]/page.tsx
import prisma from "@/utils/prisma";
import { handleSubmit } from "./actions";

type EditPageProps = {
  params: Promise<{ post: string }>;
};

export default async function EditPage({ params }: EditPageProps) {
  const { post: slug } = await params;
  
  const post = await prisma.post.findUnique({
    where: { url: slug },
  });

  const existingData = post || {
    image: "",
    title: "",
    contentPreview: "",
    tags: [],
    url: slug,
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl text-white font-bold mb-4">
        {post ? "Edit Post" : "Create Post"}
      </h1>

      <form
        action={handleSubmit}
        method="POST"
        encType="multipart/form-data"
        className="flex flex-col gap-4"
      >
        <label htmlFor="title">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="My incredible post"
          defaultValue={existingData.title}
          required
          className="border p-2 rounded"
        />

        <label htmlFor="image">
          Image URL
        </label>
        <input
          type="text"
          name="image"
          placeholder="https://my.image.com/i/post.jpg"
          defaultValue={existingData.image}
          required
          className="border p-2 rounded"
        />

        <label htmlFor="contentPreview">
          Post preview
        </label>
        <textarea
          name="contentPreview"
          placeholder="My content short preview"
          defaultValue={existingData.contentPreview}
          required
          className="border p-2 rounded"
        />

        <label htmlFor="tags">
          Post tags
        </label>
        <input
          type="text"
          name="tags"
          placeholder="Tag 1, Tag 2"
          defaultValue={existingData.tags.join(", ")}
          required
          className="border p-2 rounded"
        />

        <label htmlFor="url">
          Post url slug
        </label>
        <input
          type="text"
          name="url"
          placeholder="my-url-slug"
          defaultValue={existingData.url}
          required
          readOnly={!!post}
          className="border p-2 rounded bg-gray-100"
        />

        <label className="font-semibold">
          Content upload (.md file)
        </label>
        <input
          type="file"
          name="file"
          accept=".md"
          required={!post}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="button-primary"
        >
          Save
        </button>
      </form>
    </div>
  );
}

