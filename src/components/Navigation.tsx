"use client";

import Link from "next/link";
import Image from "next/image";
import { getNavLoading } from "@/store/entities/ui";
import { useAppSelector } from "@/hooks/useStore";
import { MdAdminPanelSettings, MdPhotoAlbum } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { useTranslation } from "@/i18n";
import { SignedIn, SignedOut, UserButton } from "@neondatabase/auth/react/ui";
import { authClient } from "@/lib/auth/client";
import { isAdminUser } from "@/lib/auth/admin";

const navItems = [
  { href: "/imas", labelKey: "nav.imas" as const, icon: ImLab },
  { href: "/scenarios", labelKey: "nav.scenarios" as const, icon: MdPhotoAlbum },
];

const adminNavItems = [
  { href: "/admin/packs_to_sets", labelKey: "nav.admin" as const, icon: MdAdminPanelSettings }
];

const navItemClass = "border-color-primary font-bold rounded px-3 pt-1.5 pb-1 text-slate-700 transition hover:bg-secondary hover:text-white";

const languageLabels: Record<string, string> = {
  en: "EN",
  es: "ES",
};

export default function Navigation() {
  const { t, language, setLanguage } = useTranslation();
  const navLoading = useAppSelector(getNavLoading);
  const { data: session } = authClient.useSession();
  const languages: ("en" | "es")[] = ["en", "es"];
  const isAdmin = isAdminUser(session?.user);

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
            {isAdmin ? (
              adminNavItems.map((item) => (
                <li key={item.href}>
                  <Link className={navItemClass} href={item.href}>
                    <item.icon size={16} className="inline mr-1 mb-1"/>
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))
            ) : null}
          </ul>
          <div className="mt-1 flex items-center gap-2 text-sm font-medium mt-4 mb-3">
            <SignedOut>
              <Link className={navItemClass} href="/auth/sign-in">
                {t("nav.sign_in")}
              </Link>
              <Link className={navItemClass} href="/auth/sign-up">
                {t("nav.sign_up")}
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div className="flex items-center border rounded overflow-hidden">
            {languages.map((lang) => {
              const isCurrentLang = language === lang;
              const className = `
                px-2 
                py-1 
                text-xs 
                font-bold 
                transition 
                ${isCurrentLang 
                  ? "bg-modok text-black cursor-default" 
                  : "bg-transparent text-slate-700 hover:bg-secondary hover:text-white"
                }
                `.trim();
              return (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={className}
                >
                  {isCurrentLang && "* "}
                  {languageLabels[lang]}
                </button>
              )})}
          </div>
        </div>
      </nav>
    </header>
  );
}
