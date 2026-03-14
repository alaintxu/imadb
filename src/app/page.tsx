import { getAllSets } from '../lib/sets/sets';
import type { CardSet } from '../lib/sets/set_types';
import Table from "../components/Table";
import VillainPage from "./villain_page";

export default async function Home() {
  const sets: CardSet[] = await getAllSets();
  const table_headers = ['Set', 'Código', 'Tipo'];
  const table_data = sets.map(set => [set.name, set.code, set.set_type]);

  return (
    <>
    <VillainPage />
    <Table headers={table_headers} data={table_data} rowsPerPage={15} filter={[2]} />
    </>
  );
}
