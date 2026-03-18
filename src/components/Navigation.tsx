"use client";

import Link from "next/link";
import Image from "next/image";
import { getNavLoading } from "@/store/entities/ui";
import { useAppSelector } from "@/hooks/useStore";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/imas", label: "Lista de IMAs" },
  { href: "/scenarios", label: "Escenarios"},
  /*{ href: "/api/sets", label: "Sets API" },*/
];

export default function Navigation() {
  const navLoading = useAppSelector(getNavLoading)
  return (
    <header className="border-b border-slate-200 bg-clip typewritter">
      <nav className="w-full flex items-center justify-between px-4">
        <Link className="text-2xl font-bold tracking-wide flex items-center mt-2" href="/">
          <Image src={navLoading ? '/lab_animated.svg' : '/lab.svg'} alt="Lab logo" width={32} height={32} className="mb-2 mr-2" />
          IMAdb
        </Link>
        <ul className="flex items-center gap-2 text-sm font-medium mt-4 mb-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                className="
                border-color-primary font-bold rounded px-3 pt-1.5 pb-1 text-slate-700 transition 
                hover:bg-secondary hover:text-white"
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
