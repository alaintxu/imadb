"use client";
import { useTranslation } from "@/i18n";
import { MdPhotoAlbum } from "react-icons/md";

export function ScenarioPageClient() {
    const { t } = useTranslation();
    
    return (
        <h1 className="text-4xl sticker handwritten mb-2 max-w-full px-8 py-4 w-max flex items-center gap-2 glass" title={t("scenarios.title")}>
            <MdPhotoAlbum />
            <span>{t("scenarios.subtitle")}</span>
        </h1>
    );
}

export function LoadingContent() {
    const { t } = useTranslation();
    return <>{t("scenarios.loading")}</>;
}
