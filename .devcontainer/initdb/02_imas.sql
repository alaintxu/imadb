-- data/imas.sql
-- Init SQL for I.M.A. scenarios (fresh database only).

BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Stable namespace root (UUID DNS namespace from RFC 4122).
CREATE OR REPLACE FUNCTION ima_author_namespace_uuid(p_author_username TEXT)
RETURNS UUID
LANGUAGE SQL
IMMUTABLE
AS $$
	SELECT uuid_generate_v5('6ba7b810-9dad-11d1-80b4-00c04fd430c8'::uuid, lower(trim(p_author_username)));
$$;

-- Deterministic UUID v5 for an I.M.A. using author + slug.
CREATE OR REPLACE FUNCTION ima_id_uuid(p_author_username TEXT, p_slug TEXT)
RETURNS UUID
LANGUAGE SQL
IMMUTABLE
AS $$
	SELECT uuid_generate_v5(ima_author_namespace_uuid(p_author_username), lower(trim(p_slug)));
$$;

-- Main I.M.A. records. `villain_code` references the villain in `sets`.
CREATE TABLE IF NOT EXISTS imas (
	id UUID PRIMARY KEY,
	slug TEXT NOT NULL UNIQUE,
	title TEXT NOT NULL,
	villain_code TEXT NOT NULL REFERENCES sets(code),
	source_url TEXT,
	author_username TEXT NOT NULL,
	original BOOLEAN NOT NULL DEFAULT FALSE,
	description TEXT NOT NULL,
	special_rules TEXT
);

CREATE OR REPLACE FUNCTION set_ima_id_from_author_and_slug()
RETURNS trigger
LANGUAGE plpgsql
AS $trigger$
BEGIN
	IF NEW.id IS NULL THEN
		NEW.id := ima_id_uuid(NEW.author_username, NEW.slug);
	END IF;

	RETURN NEW;
END
$trigger$;

DROP TRIGGER IF EXISTS trg_set_ima_id ON imas;

CREATE TRIGGER trg_set_ima_id
BEFORE INSERT ON imas
FOR EACH ROW
EXECUTE FUNCTION set_ima_id_from_author_and_slug();

-- Enforce that villain_code points to a villain set, not any other set type.
CREATE OR REPLACE FUNCTION validate_ima_villain_code()
RETURNS trigger
LANGUAGE plpgsql
AS $trigger$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM sets s
		WHERE s.code = NEW.villain_code
			AND s.set_type = 'villain'
	) THEN
		RAISE EXCEPTION USING
			MESSAGE = format('villain_code "%s" must reference a set with set_type = villain', NEW.villain_code),
			ERRCODE = '23514';
	END IF;

	RETURN NEW;
END
$trigger$;

DROP TRIGGER IF EXISTS trg_validate_ima_villain_code ON imas;

CREATE TRIGGER trg_validate_ima_villain_code
BEFORE INSERT OR UPDATE OF villain_code ON imas
FOR EACH ROW
EXECUTE FUNCTION validate_ima_villain_code();

-- Reusable tag catalog for I.M.A. scenarios.
CREATE TABLE IF NOT EXISTS ima_tags (
	code TEXT PRIMARY KEY,
	name TEXT NOT NULL
);

-- Many-to-many relation between I.M.A. scenarios and tags.
CREATE TABLE IF NOT EXISTS ima_tag_assignments (
	ima_id UUID NOT NULL REFERENCES imas(id) ON DELETE CASCADE,
	tag_code TEXT NOT NULL REFERENCES ima_tags(code) ON DELETE CASCADE,
	PRIMARY KEY (ima_id, tag_code)
);

-- Related sets mentioned by the I.M.A. setup.
CREATE TABLE IF NOT EXISTS ima_related_sets (
	ima_id UUID NOT NULL REFERENCES imas(id) ON DELETE CASCADE,
	set_code TEXT NOT NULL REFERENCES sets(code),
	sort_order INTEGER NOT NULL CHECK (sort_order > 0),
	PRIMARY KEY (ima_id, set_code)
);

INSERT INTO imas (
	slug,
	title,
	villain_code,
	source_url,
	author_username,
	original,
	description,
	special_rules
)
VALUES
	(
		'lmdt_armor_wars',
		'LMDT - Armor Wars',
		'ultron',
		'https://lamanodethanos.com/armor-wars/',
		'lmdt',
		FALSE,
		$description$
Durante el programa T4E18 – La cuesta de enero tuvimos sección de I.M.A. donde se mostraron unos cuantos escenarios creados para poner las cosas difíciles a los Superhéroes. Aquí os traemos uno de ellos, para que podáis dar variedad a vuestras partidas. El escenario ha sido creado por Dani Caedes y para jugar hay que modificar ligeramente el mazo del villano.

Ultrón ha acaparado un arsenal de armamento que previamente había incautado S.H.I.E.L.D. Con todas estas armas, busca potenciar a sus drones para borrar del mapa a todos sus enemigos. Lucha con tu superhéroe en una carrera por completar tu armadura antes que Ultrón y neutralizar su amenaza.
		$description$,
		$rules$
Para este escenario se retirarán del mazo del villano de Ultrón las siguientes cartas:

- Arsenal desvalijado: Quita las dos cartas de esbirro Guardia acorazado.
- Archienemigo de Hombre Hormiga: Quita la carta del esbirro Chaqueta Amarilla.
- Artilugios de duende: De este conjunto solo se utiliza el Plan secundario Suministro ilimitado.
- Civiles en peligro: De este conjunto solo se utiliza el Accesorio Armadura de Vibránium.
		$rules$
	),
	(
		'lmdt_super_verde',
		'LMDT - Super Verde',
		'mutagen_formula',
		'https://lamanodethanos.com/ima-super-verde/',
		'lmdt',
		FALSE,
		$description$
Durante el programa T4E18 – La cuesta de enero tuvimos sección de I.M.A. donde se mostraron unos cuantos escenarios creados para poner las cosas difíciles a los Superhéroes. Aquí os traemos uno de ellos, para que podáis dar variedad a vuestras partidas. El escenario está recomendado para 2 o más jugadores y ha sido creado por Dani Caedes.

La Banda Badoon ha secuestrado a Groot y están siendo perseguidos por los Guardianes de la Galaxia. En su huida llegan hasta la Tierra y terminan estrellándose en Nueva York, en medio de Central Park.

Justo por allí estaba pasando Jennifer Walters, con su cliente Norman Osborn de camino a los juzgados. Escoltados por Hulk. Ante la desconocida amenaza, Norman Osborn entró en pánico y se transformó en el duende verde. En medio del caos, los Badoon vieron al Duende y lo tomaron como su líder.
		$description$,
		$rules$
Regla 1: Todos los esbirros Badoon adquieren el rasgo Duende.
Regla 2: El jugador inicial gana el control de Groot. Si Groot es derrotado y abandona la partida, los jugadores pierden la partida.
Regla 3: Para partidas de 3 y 4 jugadores, el primer Duende mostrado en la ronda gana la palabra clave Oleada. Esta regla es opcional.
		$rules$
	),
	(
		'lmdt_el_veneno_que_vino_desde_el_espacio',
		'LMDT - El Veneno que vino desde el espacio',
		'venom',
		'https://lamanodethanos.com/ima-el-veneno-que-vino-del-espacio/',
		'lmdt',
		FALSE,
		$description$
Durante el programa T4E18 – La cuesta de enero tuvimos sección de I.M.A. donde se mostraron escenarios para poner las cosas difíciles a los Superhéroes. Este escenario está diseñado por Joan y requiere modificar ligeramente el mazo del villano.

La Banda Badoon ha vuelto a hacer de las suyas y ha llegado hasta la Tierra para intentar secuestrar a Venom.
		$description$,
		$rules$
Para este escenario se retirarán del mazo del villano de Venom las siguientes cartas:

- El campanario.
- El plan secundario: Defensa del campanario.
- Las dos copias de perfidia: Réplica mordaz.
- Las dos copias de perfidia: Por quién doblan las campanas.
		$rules$
	),
	(
		'lmdt_purple_rain',
		'LMDT - Purple Rain',
		'thanos',
		'https://www.ivoox.com/lmdt-2-0-t4e18-la-cuesta-de-audios-mp3_rf_101491764_1.html',
		'lmdt',
		FALSE,
		$description$
Este Laboratorio fue creado por EtiCarasoft y transcrito por Freakmod.

El escenario ha sido creado por Dani Caedes. El villano será Thanos, escoltado por Mística y Maestro de armas.
		$description$,
		NULL
	),
	(
		'lmdt_molde_maestro',
		'LMDT - Molde Maestro',
		'master_mold',
		'https://www.ivoox.com/lmdt-2-0-t4e09-top-basico-audios-mp3_rf_95072679_1.html',
		'lmdt',
		FALSE,
		$description$
Este Laboratorio fue creado por EtiCarasoft y transcrito por Freakmod.

Se complica Molde Maestro sustituyendo el conjunto modular de Tolerancia Cero por Civiles en peligro.
		$description$,
		NULL
	),
	(
		'lmdt_3x36_calavera',
		'LMDT - 3x36 Calavera',
		'crossbones',
		'https://lamanodethanos.com/ima-craneo-rojo/',
		'lmdt',
		FALSE,
		$description$
En T3E36, el primer experimento usa Asalto de Hydra y los conjuntos de archienemigo de Spiderwoman y Capitán América para alimentar interacciones con el rasgo Hydra.
		$description$,
		$rules$
Se recomienda no usar los héroes de esos archienemigos para evitar que Sombra de pasado sea solo una Oleada.
		$rules$
	),
	(
		'lmdt_3x36_hombre_absorbente',
		'LMDT - 3x36 Hombre absorbente',
		'absorbing_man',
		'https://lamanodethanos.com/ima-craneo-rojo/',
		'lmdt',
		FALSE,
		$description$
En T3E36, para Hombre Absorbente se elige Mr. Hyde y se aplica regla casera para empezar en mesa enfrentados a Calvin Zavo.
		$description$,
		$rules$
Empezar en mesa enfrentados a Calvin Zavo.
		$rules$
	),
	(
		'lmdt_3x36_supervisor',
		'LMDT - 3x36 Supervisor',
		'taskmaster',
		'https://lamanodethanos.com/ima-craneo-rojo/',
		'lmdt',
		FALSE,
		$description$
En T3E36, con Supervisor se selecciona Con los pies en la Tierra para forzar decisiones de alter ego y potenciar el escenario.
		$description$,
		NULL
	),
	(
		'lmdt_3x36_zola',
		'LMDT - 3x36 Zola',
		'zola',
		'https://lamanodethanos.com/ima-craneo-rojo/',
		'lmdt',
		FALSE,
		$description$
En T3E36, para Zola se usa Hermanos Grimm para amplificar la presión de esbirros con accesorios.
		$description$,
		NULL
	),
	(
		'lmdt_3x36_craneo_rojo',
		'LMDT - 3x36 Cráneo rojo',
		'red_skull',
		'https://lamanodethanos.com/ima-craneo-rojo/',
		'lmdt',
		FALSE,
		$description$
En T3E36, para Cráneo Rojo se sustituyen conjuntos por Tácticas de guerrilla y Estado de emergencia.
		$description$,
		NULL
	),
	(
		'lmdt_6x01_defensa_a_la_desesperada',
		'LMDT - 6x01 - Defensa a la desesperada',
		'tower_defense',
		'https://youtube.com/shorts/s27ds51Z2FQ?si=weFcn4VSFu6x_IIB',
		'lmdt',
		FALSE,
		$description$
Escenario Defender la torre usando Orden Negra y Normal.
		$description$,
		$rules$
Tras la preparación de la partida, coloca el Entorno Torre de los Vengadores con su cara Dañado boca arriba.
		$rules$
	),
	(
		'lmdt_6x02_dyscordima',
		'LMDT - 6x02 - DyscordI(M)A',
		'stryfe',
		'https://youtube.com/shorts/riaz4ltwaM4?si=JuOw9iCz7r73_6Z3',
		'lmdt',
		FALSE,
		$description$
Escenario Dyscordia usando Fantasía, Hope Summers, Pesadilla personal, Zzzax y Normal.
		$description$,
		$rules$
Opcional: quitar Hope Summers y colocar el Entorno Juego de Mojos desde el inicio.
		$rules$
	)
ON CONFLICT (slug) DO UPDATE
SET
	title = EXCLUDED.title,
	villain_code = EXCLUDED.villain_code,
	source_url = EXCLUDED.source_url,
	author_username = EXCLUDED.author_username,
	original = EXCLUDED.original,
	description = EXCLUDED.description,
	special_rules = EXCLUDED.special_rules;

INSERT INTO ima_tags (code, name)
VALUES ('lmdt', 'La Mano de Thanos')
ON CONFLICT (code) DO UPDATE
SET name = EXCLUDED.name;

INSERT INTO ima_related_sets (ima_id, set_code, sort_order)
VALUES
	(ima_id_uuid('lmdt', 'lmdt_armor_wars'), 'ransacked_armory', 1),
	(ima_id_uuid('lmdt', 'lmdt_armor_wars'), 'ant_nemesis', 2),
	(ima_id_uuid('lmdt', 'lmdt_armor_wars'), 'goblin_gear', 3),
	(ima_id_uuid('lmdt', 'lmdt_armor_wars'), 'under_attack', 4),
	(ima_id_uuid('lmdt', 'lmdt_super_verde'), 'band_of_badoon', 1),
	(ima_id_uuid('lmdt', 'lmdt_el_veneno_que_vino_desde_el_espacio'), 'symbiotic_strength', 1),
	(ima_id_uuid('lmdt', 'lmdt_el_veneno_que_vino_desde_el_espacio'), 'band_of_badoon', 2),
	(ima_id_uuid('lmdt', 'lmdt_el_veneno_que_vino_desde_el_espacio'), 'vnm_nemesis', 3),
	(ima_id_uuid('lmdt', 'lmdt_purple_rain'), 'mystique', 1),
	(ima_id_uuid('lmdt', 'lmdt_purple_rain'), 'weap_master', 2),
	(ima_id_uuid('lmdt', 'lmdt_molde_maestro'), 'sentinels', 1),
	(ima_id_uuid('lmdt', 'lmdt_molde_maestro'), 'under_attack', 2),
	(ima_id_uuid('lmdt', 'lmdt_3x36_calavera'), 'hydra_assault', 1),
	(ima_id_uuid('lmdt', 'lmdt_3x36_calavera'), 'spider_woman_nemesis', 2),
	(ima_id_uuid('lmdt', 'lmdt_3x36_calavera'), 'captain_america_nemesis', 3),
	(ima_id_uuid('lmdt', 'lmdt_3x36_hombre_absorbente'), 'mister_hyde', 1),
	(ima_id_uuid('lmdt', 'lmdt_3x36_supervisor'), 'down_to_earth', 1),
	(ima_id_uuid('lmdt', 'lmdt_3x36_zola'), 'brothers_grimm', 1),
	(ima_id_uuid('lmdt', 'lmdt_3x36_craneo_rojo'), 'guerrilla_tactics', 1),
	(ima_id_uuid('lmdt', 'lmdt_3x36_craneo_rojo'), 'state_of_emergency', 2),
	(ima_id_uuid('lmdt', 'lmdt_6x01_defensa_a_la_desesperada'), 'black_order', 1),
	(ima_id_uuid('lmdt', 'lmdt_6x01_defensa_a_la_desesperada'), 'standard', 2),
	(ima_id_uuid('lmdt', 'lmdt_6x02_dyscordima'), 'fantasy', 1),
	(ima_id_uuid('lmdt', 'lmdt_6x02_dyscordima'), 'hope_summers', 2),
	(ima_id_uuid('lmdt', 'lmdt_6x02_dyscordima'), 'personal_nightmare', 3),
	(ima_id_uuid('lmdt', 'lmdt_6x02_dyscordima'), 'zzzax', 4),
	(ima_id_uuid('lmdt', 'lmdt_6x02_dyscordima'), 'standard', 5)
ON CONFLICT (ima_id, set_code) DO UPDATE
SET sort_order = EXCLUDED.sort_order;

INSERT INTO ima_tag_assignments (ima_id, tag_code)
VALUES
	(ima_id_uuid('lmdt', 'lmdt_armor_wars'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_super_verde'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_el_veneno_que_vino_desde_el_espacio'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_purple_rain'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_molde_maestro'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_3x36_calavera'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_3x36_hombre_absorbente'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_3x36_supervisor'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_3x36_zola'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_3x36_craneo_rojo'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_6x01_defensa_a_la_desesperada'), 'lmdt'),
	(ima_id_uuid('lmdt', 'lmdt_6x02_dyscordima'), 'lmdt')
ON CONFLICT (ima_id, tag_code) DO NOTHING;

COMMIT;

-- End of self-contained import
