"use client";

import { Bell } from "lucide-react";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

function Header() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const delay = setTimeout(() => {
      if (query === "") router.push("/");
      if (query.trim()) {
        router.replace(`/movies?q=${query}`);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [query, router]);

  return (
    <div className="flex items-center justify-between relative z-10">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md"
        placeholder="Search for films, directors or actors..."
      />

      <div className="flex items-center gap-4 ml-6">
        <div className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition">
          <Bell size={20} />
        </div>

        <div className="rounded-full bg-white p-2">
          <Image src="/user.png" alt="User" width={20} height={20} />
        </div>
      </div>
    </div>
  );
}

export default Header;
