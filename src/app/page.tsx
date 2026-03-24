import { getAllSets } from '@/lib/sets/sets';
import type { CardSet } from '@/lib/sets/sets';
import Table from "@/components/Table";

export default async function Home() {
  const sets: CardSet[] = await getAllSets();
  const table_headers = ['Set', 'Código', 'Tipo'];
  const table_data = sets.map(set => [set.name.es, set.code, set.set_type]);

  return (
    <>
    <Table headers={table_headers} data={table_data} rowsPerPage={15} filter={[2]} />
    </>
  );
}
