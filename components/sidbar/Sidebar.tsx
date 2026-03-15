"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  Compass,
  Film,
  Heart,
  Clock,
  Plus,
  Folder,
  Download,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Compass },
    { label: "Genres", href: "/genres", icon: Film },
    { label: "Favorites", href: "/favorites", icon: Heart },
    { label: "Continue Watching", href: "/continue-watching", icon: Clock },
    { label: "Recently Added", href: "/recent", icon: Plus },
    { label: "My Collections", href: "/collections", icon: Folder },
    { label: "Downloads", href: "/downloads", icon: Download },
  ];

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-black/60 backdrop-blur"
      >
        <Menu size={20} />
      </button>

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 p-6 z-40 transform transition-transform",
          open ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        {/* LOGO */}
        <div className="flex items-center gap-2 mb-10">
          <Image src="/icon.png" alt="logo" width={28} height={28} />
          <span className="font-semibold text-lg">Netlify</span>
        </div>

        <nav className="flex flex-col justify-between h-[calc(100vh-120px)]">
          <div className="space-y-2">
            {navItems.map((item, i) => (
              <React.Fragment key={item.label}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition",
                    "hover:bg-white/10",
                    pathname === item.href &&
                      "bg-purple-500/20 text-purple-300",
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </a>

                {i === 3 && <div className="border-t border-white/10 my-3" />}
              </React.Fragment>
            ))}

            <div className="border-t border-white/10 my-3" />

            <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer">
              <Settings size={18} />
              Settings
            </div>
          </div>

          <div onClick={() => signOut({callbackUrl: "/login"})} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 cursor-pointer">
            <LogOut size={18} />
            Logout
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
