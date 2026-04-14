import { getAllSets } from '@/lib/sets/sets';
import type { CardSet } from '@/lib/sets/sets';
import Table from "@/components/Table";
import { cardSetNameByLanguage } from '@/lib/sets/sets_front';
import { getSSRTranslations } from './ssr_translations';


export default async function Home() {
  const sets: CardSet[] = await getAllSets();
  const { language, t } = await getSSRTranslations();
  const table_headers = [t.home.tableHeaders.set, t.home.tableHeaders.code, t.home.tableHeaders.type];
  const table_data = sets.map(set => [cardSetNameByLanguage(set, language), set.code, set.set_type]);

  return (
    <Table headers={table_headers} data={table_data} rowsPerPage={15} filter={[2]} />
  );
}
