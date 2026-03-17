import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/imas", label: "Lista de IMAs" },
  { href: "/api/sets", label: "Sets API" },
];

export default function Navigation() {
  return (
    <header className="border-b border-slate-200 bg-clip typewritter">
      <nav className="w-full flex items-center justify-between px-4 pt-3 pb-2">
        <Link className="text-lg font-bold tracking-wide" href="/">
          IMAdb
        </Link>
        <ul className="flex items-center gap-2 text-sm font-medium">
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
