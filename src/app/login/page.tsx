"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import Logo from "@/components/Logo";

export default function Login() {
    const [form, setForm] = useState({
        username: "",
        password: ""
    });
    const [message, setMessage] = useState({
        text: "",
        error: false
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setMessage({ text: "", error: false });

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            const data = await response.json();
            setMessage({ text: data.message, error: false });
            router.push("/dashboard");
        } catch (err) {
            setMessage({ text: (err as Error).message, error: true });
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <div className="icon-bg">
            <Logo className="w-10" type="icon" divide={3} plume />
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome back</h1>
        <p className="text-gray-400">Please enter your credentials to continue</p>
        <div className="form-container">
                <div className="input-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" required value={form.username} onChange={handleChange} />
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" required value={form.password} onChange={handleChange} />
                </div>
                <button className="button-primary w-72" onClick={handleSubmit} type="submit">Login</button>
                {message.text && (
                    <p className={`mt-4 ${message.error ? "text-red-500" : "text-green-500"}`}>
                        {message.text}
                    </p>
                )}
        </div>
        </div>
    );
}