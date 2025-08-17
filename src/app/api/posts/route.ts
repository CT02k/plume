
import prisma from "@/utils/prisma";

export async function GET(){

//     await prisma.post.create({
//         data: {
//             image: "/example_post.png",
//             title: "Como vender drogas online 2",
//             contentPreview: "Como você pode começar seu império do tráfico de drogas online, hoje mesmo dentro do conforto sua casa. Parte 2",
//             content: `## Como vender drogas online

// Você já pensou: _**“poxa, acordar cedo, pegar ônibus lotado e trabalhar 8 horas por dia não é pra mim…”**_? Pois bem, talvez o empreendedorismo digital seja sua vocação.

// Com a magia da internet, agora você pode abrir seu próprio negócio de venda de drogas sem sair do conforto da sua casa — o único risco é a PF bater na sua porta qualquer hora dessas.

// ### Aqui vão algumas dicas para o seu futuro império do tráfico:

// - **Marketing é tudo** – Não adianta só vender, tem que saber divulgar.
// - **Logística eficiente** – Amazon entrega em um dia, por que você não? Pense em parcerias com motoboys, drones ou coisa assim.
// - **Atendimento ao cliente** – Responda rápido! Respostas rápidas = mais conversão
// - **Branding** – Crie uma logo descente. Afinal, crime sem design é bagunça.
// `,
//             tags: ["Drogas", "Negócios", "Marketing"],
//             url: "como-vender-drogas-online-2"
//         }
//     })

  const posts = await prisma.post.findMany().catch(() => {
    return new Response(JSON.stringify({error: true}), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  })

  return new Response(JSON.stringify(posts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}