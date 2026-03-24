import { getIMAByID, IMA } from "@/lib/imas/imas";
import { getSetByCode } from "@/lib/sets/sets";
import { notFound } from "next/navigation";

import { cardSetNameByLanguage } from "@/lib/sets/sets_front";

type Params = { id: string };

export default async function IMADetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const normalized = id.trim().toLowerCase();

  const ima: IMA | undefined = await getIMAByID(normalized);

  if (!ima) {
    notFound();
  }

  const villain = await getSetByCode(ima.villain_code);

  return (
    <section className="mx-auto max-w-3xl p-6 bg-blue-50 text-black rounded">
      <h1 className="text-2xl font-bold mb-3">{ima.title}</h1>
      <p className="mb-2">
        <span className="font-semibold">ID:</span> {ima.id}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Slug:</span> {ima.slug}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Villain:</span> {villain ? cardSetNameByLanguage(villain, "es") : "Unknown"} ({ima.villain_code})
      </p>
      <p className="mb-2">
        <span className="font-semibold">Author:</span> {ima.author_username}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Original:</span> {ima.original ? "Yes" : "No"}
      </p>
      {ima.source_url && (
        <p className="mb-4">
          <span className="font-semibold">Source:</span>{" "}
          <a className="underline" href={ima.source_url} target="_blank" rel="noreferrer">
            {ima.source_url}
          </a>
        </p>
      )}
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Description</h2>
        <p>{ima.description}</p>
      </div>
      {ima.special_rules && (
        <div>
          <h2 className="text-lg font-semibold mb-1">Special Rules</h2>
          <p>{ima.special_rules}</p>
        </div>
      )}
    </section>
  );
}
