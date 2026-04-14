"use client";
import { CardSet } from "@/lib/sets/sets";
import { Suspense, useState } from "react";
import IconForConcept from "@/components/IconForConcept";
import SetSelect from "@/components/SetSelect";
import SetSelectMulti from "@/components/SetSelectMulti";
import IMACard from "./IMACard/IMACard";
import { IMA } from "@/lib/imas/imas";
import { useTranslation } from "@/i18n";

export default function IMAForm() {
    const { t } = useTranslation();
    const [selectedVillain, setSelectedVillain] = useState<CardSet | null>(null);
    const [selectedModules, setSelectedModules] = useState<CardSet[]>([]);
    const [selectedNemesis, setSelectedNemesis] = useState<CardSet[]>([]);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [sending, setSending] = useState(false);
    const tmpIma: IMA = {
        id: "XXX",
        slug: "tmp",
        title: title,
        villain_code: selectedVillain?.code || "",
        modular_set_codes: [...selectedModules, ...selectedNemesis].map(module => module.code),
        tags: [],
        source_url: "",
        author_username: "",
        original: false,
        description: description,
        special_rules: ""
    }

    const sendIma = async () => {
        setSending(true);
        await setTimeout(() => {
            alert("IMA enviado (simulación)");
            setSending(false);
        }, 1000);
    }


    return (
        <div className="p-4 flex flex-col gap-4 typewritter">
            <div className="flex gap-4 justify-between">
                <label className="w-full">
                    {t("imasNew.villain")}
                    <SetSelect onSelectChange={(set) => setSelectedVillain(set)} setType="villain" className="w-full" />
                </label>
                <label className="w-full">
                    {t("imasNew.modules")}
                    <Suspense fallback={<div>{t("imasNew.loadingModules")}</div>}>
                        <SetSelectMulti onSelectChange={(sets) => setSelectedModules(sets)} setType="modular" className="w-full" />
                    </Suspense>
                </label>
                <label className="w-full">
                    {t("imasNew.nemesis")}
                    <Suspense fallback={<div>{t("imasNew.loadingModules")}</div>}>
                        <SetSelectMulti onSelectChange={(sets) => setSelectedNemesis(sets)} setType="nemesis" className="w-full" />
                    </Suspense>
                </label>
            </div>
            <label>
                {t("imasNew.titleLabel")}
                <input 
                    type="text" 
                    className="w-full p-4 border rounded handwritten shadow bg-clip" 
                    placeholder={t("imasNew.titlePlaceholder")} 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <label>
                {t("imasNew.description")}
                <textarea 
                    className="w-full h-48 p-4 border rounded handwritten shadow bg-clip" 
                    placeholder={t("imasNew.descriptionPlaceholder")} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
            <div>
                <button className="border rounded flex gap-1 items-center pt-2 pb-1 px-4 bg-clip shadow" onClick={sendIma} disabled={sending}>
                    <IconForConcept concept="add" />
                    {sending ? t("imasNew.sending") : t("imasNew.save")}
                </button>
            </div>

            {selectedVillain && <IMACard ima={tmpIma} />}
        </div>
    );
}