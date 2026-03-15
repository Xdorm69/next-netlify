"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      alert("Signup failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center absolute top-0 left-0 z-[100] bg-background w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[350px]">
        <h1 className="text-2xl font-bold">Signup</h1>

        <input
          type="text"
          placeholder="Name"
          className="border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link href={"/login"}>Already have an account? Login</Link>

        <button className="bg-black text-white p-2">Signup</button>
      </form>
    </div>
  );
}
