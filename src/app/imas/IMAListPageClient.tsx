"use client";
import { useTranslation } from "@/i18n";
import LinkButton from "@/components/LinkButton";

interface IMAListPageClientProps {
    villainCode?: string;
}

export function IMAListPageClient({ villainCode }: IMAListPageClientProps) {
    const { t } = useTranslation();
    
    return (
        <>
            <h1 className="text-4xl sticker handwritten mb-2 max-w-full px-8 py-4 w-max flex items-center gap-2 glass">
                <span>{t("imas.title")}</span>
                {villainCode && <span>({villainCode})</span>}
            </h1>
            <div className="flex justify-end mb-4">
                <LinkButton href="/imas/new" className="btn" iconConcept="add" >
                    {t("imas.createNew")}
                </LinkButton>
            </div>
        </>
    );
}
