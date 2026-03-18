import { getSetsByType } from "@/lib/sets/sets";
import CardPhoto from "@/components/CardPhoto/CardPhoto";
import styles from "./page.module.css";
import { CardSet } from "@/store/entities/sets";


export default async function ScenarioListPage() {
    const scenarios: CardSet[] = await getSetsByType("villain");

    return (

        <section className={styles.container}>
            <h1 className={`sticker typewritter mb-2 ${styles.title}`}>Imas por escenario</h1>
            <h2 className={`sticker handwritten mb-2 ${styles.subtitle}`}>Elige el escenario</h2>
            <div className={`auto-grid ${styles.scenarioGrid}`}>
                {scenarios.map((scenario) => (
                    <CardPhoto 
                        name={scenario.name} 
                        code={scenario.code} 
                        key={scenario.code}
                        href={`/imas?scenario=${scenario.code}`} />
                ))}
            </div>
        </section>
    );
}