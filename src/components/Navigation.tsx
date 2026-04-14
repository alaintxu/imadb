"use client";

import Link from "next/link";
import Image from "next/image";
import { getNavLoading } from "@/store/entities/ui";
import { useAppSelector } from "@/hooks/useStore";
import { MdAdminPanelSettings, MdPhotoAlbum } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { useTranslation } from "@/i18n";

const navItems = [
  { href: "/imas", labelKey: "nav.imas" as const, icon: ImLab },
  { href: "/scenarios", labelKey: "nav.scenarios" as const, icon: MdPhotoAlbum },
  { href: "/admin", labelKey: "nav.admin" as const, icon: MdAdminPanelSettings },
];

const navItemClass = "border-color-primary font-bold rounded px-3 pt-1.5 pb-1 text-slate-700 transition hover:bg-secondary hover:text-white";

const languageLabels: Record<string, string> = {
  en: "EN",
  es: "ES",
};

export default function Navigation() {
  const { t, language, setLanguage } = useTranslation();
  const navLoading = useAppSelector(getNavLoading);
  const languages: ("en" | "es")[] = ["en", "es"];

  return (
    <header className="border-b border-slate-200 bg-clip typewritter">
      <nav className="w-full flex items-center justify-between px-4">
        <Link className="text-2xl font-bold tracking-wide flex items-center mt-2" href="/">
          <Image src={navLoading ? '/lab_animated.svg' : '/lab.svg'} alt="Lab logo" width={32} height={32} loading="eager" className="mb-2 mr-2" style={{ height: "auto" }} />
          IMAdb
        </Link>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-2 text-sm font-medium mt-4 mb-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link className={navItemClass} href={item.href}>
                  <item.icon size={16} className="inline mr-1 mb-1"/>
                  {t(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex items-center border rounded overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2 py-1 text-xs font-bold transition ${
                  language === lang
                    ? "bg-modok text-white"
                    : "bg-transparent text-slate-700 hover:bg-secondary hover:text-white"
                }`}
              >
                {languageLabels[lang]}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
