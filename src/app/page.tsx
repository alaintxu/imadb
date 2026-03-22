import { getAllSets } from '@/lib/sets/sets';
import type { CardSet } from '@/lib/sets/sets';
import Table from "@/components/Table";
import IMAForm from "./ima_form";

export default async function Home() {
  const sets: CardSet[] = await getAllSets();
  const table_headers = ['Set', 'Código', 'Tipo'];
  const table_data = sets.map(set => [set.name.es, set.code, set.set_type]);

  return (
    <>
    <IMAForm />
    <Table headers={table_headers} data={table_data} rowsPerPage={15} filter={[2]} />
    </>
  );
}
