-- data/sets.sql
-- Self-contained init SQL: creates `sets` table and imports rows
-- from the embedded JSON using `jsonb_to_recordset`. This file can be
-- placed in `/docker-entrypoint-initdb.d/` and will run on first DB init.

-- Ensure enum type exists (safe to run repeatedly)
-- Create enum type in an idempotent way (works on older/newer parsers)
DO $do$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'set_type_enum') THEN
    EXECUTE 'CREATE TYPE set_type_enum AS ENUM (''level'', ''villain'', ''modular'', ''nemesis'', ''unknown'', ''other'')';
  END IF;
END
$do$;

BEGIN;

-- Create table; `code` is the natural primary key.
CREATE TABLE IF NOT EXISTS sets (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  set_type set_type_enum
);

-- Insert rows from the embedded JSON array.
INSERT INTO sets (code, name, set_type)
SELECT js.code, js.name, js.set_type::set_type_enum
FROM jsonb_to_recordset($$
[
  {
    "code": "expert",
    "name": "Experto",
    "set_type": "level"
  },
  {
    "code": "expert_ii",
    "name": "Experto II",
    "set_type": "level"
  },
  {
    "code": "standard",
    "name": "Normal",
    "set_type": "level"
  },
  {
    "code": "standard_ii",
    "name": "Normal II",
    "set_type": "level"
  },
  {
    "code": "standard_iii",
    "name": "Normal III",
    "set_type": "level"
  },
  {
    "code": "absorbing_man",
    "name": "Hombre absorbente",
    "set_type": "villain"
  },
  {
    "code": "brotherhood_of_badoon",
    "name": "Hermandad de los Badoon",
    "set_type": "villain"
  },
  {
    "code": "bulldozer",
    "name": "Bulldozer",
    "set_type": "villain"
  },
  {
    "code": "infiltrate_the_museum",
    "name": "Infiltrados en el museo",
    "set_type": "villain"
  },
  {
    "code": "escape_the_museum",
    "name": "Huida del museo",
    "set_type": "villain"
  },
  {
    "code": "crossbones",
    "name": "Calavera",
    "set_type": "villain"
  },
  {
    "code": "ebony_maw",
    "name": "Fauces Negras",
    "set_type": "villain"
  },
  {
    "code": "exp_kang",
    "name": "Kang Experto",
    "set_type": "villain"
  },
  {
    "code": "hela",
    "name": "Hela",
    "set_type": "villain"
  },
  {
    "code": "kang",
    "name": "Kang",
    "set_type": "villain"
  },
  {
    "code": "klaw",
    "name": "Klaw",
    "set_type": "villain"
  },
  {
    "code": "loki",
    "name": "Loki",
    "set_type": "villain"
  },
  {
    "code": "magneto_villain",
    "name": "Magneto",
    "set_type": "villain"
  },
  {
    "code": "mansion_attack",
    "name": "Ataque a la mansión",
    "set_type": "villain"
  },
  {
    "code": "master_mold",
    "name": "Molde Maestro",
    "set_type": "villain"
  },
  {
    "code": "mutagen_formula",
    "name": "La fórmula mutagénica",
    "set_type": "villain"
  },
  {
    "code": "mysterio",
    "name": "Mysterio",
    "set_type": "villain"
  },
  {
    "code": "nebula",
    "name": "Nébula",
    "set_type": "villain"
  },
  {
    "code": "piledriver",
    "name": "Martinete",
    "set_type": "villain"
  },
  {
    "code": "red_skull",
    "name": "Cráneo Rojo",
    "set_type": "villain"
  },
  {
    "code": "rhino",
    "name": "Rino",
    "set_type": "villain"
  },
  {
    "code": "risky_business",
    "name": "Negocios arriesgados",
    "set_type": "villain"
  },
  {
    "code": "ronan",
    "name": "Ronan el acusador",
    "set_type": "villain"
  },
  {
    "code": "sabretooth",
    "name": "Dientes de sable",
    "set_type": "villain"
  },
  {
    "code": "sandman",
    "name": "Hombre de arena",
    "set_type": "villain"
  },
  {
    "code": "sinister_six",
    "name": "Los Seis Siniestros",
    "set_type": "villain"
  },
  {
    "code": "taskmaster",
    "name": "Supervisor",
    "set_type": "villain"
  },
  {
    "code": "thanos",
    "name": "Thanos",
    "set_type": "villain"
  },
  {
    "code": "the_hood",
    "name": "El Encapuchado",
    "set_type": "villain"
  },
  {
    "code": "thunderball",
    "name": "Bola de Trueno",
    "set_type": "villain"
  },
  {
    "code": "tower_defense",
    "name": "Defender la torre",
    "set_type": "villain"
  },
  {
    "code": "ultron",
    "name": "Ultrón",
    "set_type": "villain"
  },
  {
    "code": "venom",
    "name": "Veneno",
    "set_type": "villain"
  },
  {
    "code": "venom_goblin",
    "name": "Duende Veneno",
    "set_type": "villain"
  },
  {
    "code": "wrecker",
    "name": "Destructor",
    "set_type": "villain"
  },
  {
    "code": "zola",
    "name": "Zola",
    "set_type": "villain"
  },
  {
    "code": "project_wideawake",
    "name": "Proyecto despertar",
    "set_type": "villain"
  },
  {
    "code": "magog",
    "name": "MaGog",
    "set_type": "villain"
  },
  {
    "code": "spiral",
    "name": "Espiral",
    "set_type": "villain"
  },
  {
    "code": "mojo",
    "name": "Mojo",
    "set_type": "villain"
  },
  {
    "code": "marauders",
    "name": "Merodeadores",
    "set_type": "villain"
  },
  {
    "code": "juggernaut",
    "name": "Juggernaut",
    "set_type": "villain"
  },
  {
    "code": "mister_sinister",
    "name": "Mister Siniestro",
    "set_type": "villain"
  },
  {
    "code": "stryfe",
    "name": "Dyscordia",
    "set_type": "villain"
  },
  {
    "code": "unus",
    "name": "Unus",
    "set_type": "villain"
  },
  {
    "code": "four_horsemen",
    "name": "Cuatro jinetes",
    "set_type": "villain"
  },
  {
    "code": "apocalypse",
    "name": "Apocalipsis",
    "set_type": "villain"
  },
  {
    "code": "dark_beast",
    "name": "Bestia Oscura",
    "set_type": "villain"
  },
  {
    "code": "black_widow_villain",
    "name": "Viuda Negra",
    "set_type": "villain"
  },
  {
    "code": "batroc",
    "name": "Batroc",
    "set_type": "villain"
  },
  {
    "code": "m.o.d.o.k.",
    "name": "M.O.D.O.K.",
    "set_type": "villain"
  },
  {
    "code": "thunderbolts",
    "name": "Thunderbolts",
    "set_type": "villain"
  },
  {
    "code": "baron_zemo",
    "name": "Barón Zemo",
    "set_type": "villain"
  },
  {
    "code": "enchantress_villain",
    "name": "Encantadora",
    "set_type": "villain"
  },
  {
    "code": "god_of_lies",
    "name": "Dios de las mentiras",
    "set_type": "villain"
  },
  {
    "code": "a_mess_of_things",
    "name": "Un auténtico estropicio",
    "set_type": "modular"
  },
  {
    "code": "acolytes",
    "name": "Acólitos",
    "set_type": "modular"
  },
  {
    "code": "anachronauts",
    "name": "Anacronautas",
    "set_type": "modular"
  },
  {
    "code": "ant",
    "name": "Hombre Hormiga",
    "set_type": "modular"
  },
  {
    "code": "armadillo",
    "name": "Armadillo",
    "set_type": "modular"
  },
  {
    "code": "armies_of_titan",
    "name": "Ejércitos de Titán",
    "set_type": "modular"
  },
  {
    "code": "bad_publicity",
    "name": "Mala publicidad",
    "set_type": "modular"
  },
  {
    "code": "badoon_headhunter",
    "name": "Cazador de Cabezas Badoon",
    "set_type": "modular"
  },
  {
    "code": "band_of_badoon",
    "name": "Banda Badoon",
    "set_type": "modular"
  },
  {
    "code": "beasty_boys",
    "name": "Malas bestias",
    "set_type": "modular"
  },
  {
    "code": "black_order",
    "name": "Orden Negra",
    "set_type": "modular"
  },
  {
    "code": "black_panther",
    "name": "Pantera Negra",
    "set_type": "modular"
  },
  {
    "code": "black_widow",
    "name": "Viuda Negra",
    "set_type": "modular"
  },
  {
    "code": "bomb_scare",
    "name": "Amenaza de bomba",
    "set_type": "modular"
  },
  {
    "code": "brawler",
    "name": "Luchador",
    "set_type": "modular"
  },
  {
    "code": "brotherhood",
    "name": "Hermandad de mutantes",
    "set_type": "modular"
  },
  {
    "code": "brothers_grimm",
    "name": "Hermanos Grimm",
    "set_type": "modular"
  },
  {
    "code": "captain_america",
    "name": "Capitán América",
    "set_type": "modular"
  },
  {
    "code": "captain_marvel",
    "name": "Capitana Marvel",
    "set_type": "modular"
  },
  {
    "code": "challenge",
    "name": "Desafío",
    "set_type": "modular"
  },
  {
    "code": "children_of_thanos",
    "name": "Hijos de Thanos",
    "set_type": "modular"
  },
  {
    "code": "city_in_chaos",
    "name": "Caos en la ciudad",
    "set_type": "modular"
  },
  {
    "code": "colossus",
    "name": "Coloso",
    "set_type": "modular"
  },
  {
    "code": "commander",
    "name": "Comandante",
    "set_type": "modular"
  },
  {
    "code": "community_service",
    "name": "Servicios comunitarios",
    "set_type": "modular"
  },
  {
    "code": "crime",
    "name": "Policíaco",
    "set_type": "modular"
  },
  {
    "code": "crossfire_crew",
    "name": "Banda de Fuego Cruzado",
    "set_type": "modular"
  },
  {
    "code": "cyclops",
    "name": "Cíclope",
    "set_type": "modular"
  },
  {
    "code": "deathstrike",
    "name": "Dama Mortal",
    "set_type": "modular"
  },
  {
    "code": "defender",
    "name": "Defensor",
    "set_type": "modular"
  },
  {
    "code": "doctor_strange",
    "name": "Doctor Extraño",
    "set_type": "modular"
  },
  {
    "code": "doctor_strange_invocation_deck",
    "name": "Invocación",
    "set_type": "modular"
  },
  {
    "code": "down_to_earth",
    "name": "Con los pies en la tierra",
    "set_type": "modular"
  },
  {
    "code": "drax",
    "name": "Drax",
    "set_type": "modular"
  },
  {
    "code": "enchantress",
    "name": "Encantadora",
    "set_type": "modular"
  },
  {
    "code": "expcamp",
    "name": "Campaña en Experto",
    "set_type": "modular"
  },
  {
    "code": "exper_weapon",
    "name": "Armas Experimentales",
    "set_type": "modular"
  },
  {
    "code": "frost_giants",
    "name": "Gigantes de hielo",
    "set_type": "modular"
  },
  {
    "code": "galactic_artifacts",
    "name": "Artefactos galácticos",
    "set_type": "modular"
  },
  {
    "code": "gam",
    "name": "Gamora",
    "set_type": "modular"
  },
  {
    "code": "ghost_spider",
    "name": "Ghost-Spider",
    "set_type": "modular"
  },
  {
    "code": "goblin_gear",
    "name": "Artilugios de duende",
    "set_type": "modular"
  },
  {
    "code": "goblin_gimmicks",
    "name": "Trucos de duende",
    "set_type": "modular"
  },
  {
    "code": "groot",
    "name": "Groot",
    "set_type": "modular"
  },
  {
    "code": "guerrilla_tactics",
    "name": "Tácticas de guerrilla",
    "set_type": "modular"
  },
  {
    "code": "hawkeye",
    "name": "Ojo de Halcón",
    "set_type": "modular"
  },
  {
    "code": "hulk",
    "name": "Hulk",
    "set_type": "modular"
  },
  {
    "code": "hydra_assault",
    "name": "Asalto de Hydra",
    "set_type": "modular"
  },
  {
    "code": "hydra_camp",
    "name": "Campaña de Hydra",
    "set_type": "modular"
  },
  {
    "code": "hydra_patrol",
    "name": "Patrulla de Hydra",
    "set_type": "modular"
  },
  {
    "code": "infinity_gauntlet",
    "name": "Guantelete del Infinito",
    "set_type": "modular"
  },
  {
    "code": "inheritors",
    "name": "Los herederos",
    "set_type": "modular"
  },
  {
    "code": "iron_man",
    "name": "Iron Man",
    "set_type": "modular"
  },
  {
    "code": "ironheart",
    "name": "Ironheart",
    "set_type": "modular"
  },
  {
    "code": "ironspider_sinister",
    "name": "Los Seis Siniestros de Iron Spider",
    "set_type": "modular"
  },
  {
    "code": "kree_fanatic",
    "name": "Fanático kree",
    "set_type": "modular"
  },
  {
    "code": "kree_militant",
    "name": "Militantes Kree",
    "set_type": "modular"
  },
  {
    "code": "legions_of_hel",
    "name": "Legiones de Hel",
    "set_type": "modular"
  },
  {
    "code": "legions_of_hydra",
    "name": "Legiones de Hydra",
    "set_type": "modular"
  },
  {
    "code": "masters_of_evil",
    "name": "Señores del Mal",
    "set_type": "modular"
  },
  {
    "code": "menagerie_medley",
    "name": "Bestiario galáctico",
    "set_type": "modular"
  },
  {
    "code": "mister_hyde",
    "name": "Mister Hyde",
    "set_type": "modular"
  },
  {
    "code": "mot",
    "name": "Amo del tiempo",
    "set_type": "modular"
  },
  {
    "code": "ms_marvel",
    "name": "Ms. Marvel",
    "set_type": "modular"
  },
  {
    "code": "mts_campaign",
    "name": "Campaña de La sombra del titán loco",
    "set_type": "modular"
  },
  {
    "code": "mystique",
    "name": "Mística",
    "set_type": "modular"
  },
  {
    "code": "nebu",
    "name": "Nébula",
    "set_type": "modular"
  },
  {
    "code": "nova",
    "name": "Nova",
    "set_type": "modular"
  },
  {
    "code": "osborn_tech",
    "name": "Tecnología de Osborn",
    "set_type": "modular"
  },
  {
    "code": "personal_nightmare",
    "name": "Pesadilla personal",
    "set_type": "modular"
  },
  {
    "code": "power_drain",
    "name": "Alta tensión",
    "set_type": "modular"
  },
  {
    "code": "power_stone",
    "name": "Gema del Poder",
    "set_type": "modular"
  },
  {
    "code": "qsv",
    "name": "Mercurio",
    "set_type": "modular"
  },
  {
    "code": "ransacked_armory",
    "name": "Arsenal desvalijado",
    "set_type": "modular"
  },
  {
    "code": "rocket",
    "name": "Mapache Cohete",
    "set_type": "modular"
  },
  {
    "code": "running_interference",
    "name": "Impedimentos",
    "set_type": "modular"
  },
  {
    "code": "scw",
    "name": "Bruja Escarlata",
    "set_type": "modular"
  },
  {
    "code": "shadowcat",
    "name": "Gatasombra",
    "set_type": "modular"
  },
  {
    "code": "she_hulk",
    "name": "Hulka",
    "set_type": "modular"
  },
  {
    "code": "shield_tech",
    "name": "Tecnología de S.H.I.E.L.D.",
    "set_type": "modular"
  },
  {
    "code": "ship_command",
    "name": "Nave Espacial",
    "set_type": "modular"
  },
  {
    "code": "sinister_assault",
    "name": "Ataque siniestro",
    "set_type": "modular"
  },
  {
    "code": "sinister_syndicate",
    "name": "Sindicato Siniestro",
    "set_type": "modular"
  },
  {
    "code": "snitches_get_stitches",
    "name": "No hay traición sin castigo",
    "set_type": "modular"
  },
  {
    "code": "space_pirates",
    "name": "Piratas espaciales",
    "set_type": "modular"
  },
  {
    "code": "spdr",
    "name": "SP//dr",
    "set_type": "modular"
  },
  {
    "code": "spectrum",
    "name": "Spectrum",
    "set_type": "modular"
  },
  {
    "code": "spider_man",
    "name": "Spiderman",
    "set_type": "modular"
  },
  {
    "code": "spider_man_morales",
    "name": "Spiderman (Miles Morales)",
    "set_type": "modular"
  },
  {
    "code": "spider_woman",
    "name": "SpiderWoman",
    "set_type": "modular"
  },
  {
    "code": "spiderham",
    "name": "Spiderham",
    "set_type": "modular"
  },
  {
    "code": "state_of_emergency",
    "name": "Estado de emergencia",
    "set_type": "modular"
  },
  {
    "code": "stld",
    "name": "Starlord",
    "set_type": "modular"
  },
  {
    "code": "streets_of_mayhem",
    "name": "Caos en las calles",
    "set_type": "modular"
  },
  {
    "code": "symbiotic_strength",
    "name": "Fuerza simbiótica",
    "set_type": "modular"
  },
  {
    "code": "temporal",
    "name": "Temporal",
    "set_type": "modular"
  },
  {
    "code": "the_doomsday_chair",
    "name": "La silla del Juicio Final",
    "set_type": "modular"
  },
  {
    "code": "the_market",
    "name": "Mercado",
    "set_type": "modular"
  },
  {
    "code": "thor",
    "name": "Thor",
    "set_type": "modular"
  },
  {
    "code": "under_attack",
    "name": "Civiles en peligro",
    "set_type": "modular"
  },
  {
    "code": "valk",
    "name": "Valkiria",
    "set_type": "modular"
  },
  {
    "code": "vision",
    "name": "La Visión",
    "set_type": "modular"
  },
  {
    "code": "vnm",
    "name": "Veneno",
    "set_type": "modular"
  },
  {
    "code": "warlock",
    "name": "Adam Warlock",
    "set_type": "modular"
  },
  {
    "code": "warm",
    "name": "Máquina de Guerra",
    "set_type": "modular"
  },
  {
    "code": "weap_master",
    "name": "Maestro de armas",
    "set_type": "modular"
  },
  {
    "code": "western",
    "name": "Salvaje Oeste",
    "set_type": "modular"
  },
  {
    "code": "whispers_of_paranoia",
    "name": "Susurros paranoides",
    "set_type": "modular"
  },
  {
    "code": "wolverine",
    "name": "Lobezno",
    "set_type": "modular"
  },
  {
    "code": "wrecking_crew",
    "name": "Brigada de demolición",
    "set_type": "modular"
  },
  {
    "code": "wrecking_crew_modular",
    "name": "Brigada de demolición",
    "set_type": "modular"
  },
  {
    "code": "wsp",
    "name": "Avispa",
    "set_type": "modular"
  },
  {
    "code": "zero_tolerance",
    "name": "Tolerancia Cero",
    "set_type": "modular"
  },
  {
    "code": "zzzax",
    "name": "Zzzax",
    "set_type": "modular"
  },
  {
    "code": "future_past",
    "name": "Futuro pasado",
    "set_type": "modular"
  },
  {
    "code": "mut_gen_campaign",
    "name": "Campaña Genesis Mutante",
    "set_type": "modular"
  },
  {
    "code": "peacekeeper",
    "name": "Pacificador",
    "set_type": "modular"
  },
  {
    "code": "phoenix",
    "name": "Fénix",
    "set_type": "modular"
  },
  {
    "code": "storm",
    "name": "Tormenta",
    "set_type": "modular"
  },
  {
    "code": "storm_weather_deck",
    "name": "Clima",
    "set_type": "modular"
  },
  {
    "code": "sentinels",
    "name": "Centinelas",
    "set_type": "modular"
  },
  {
    "code": "shadow_king",
    "name": "El Rey Sombra",
    "set_type": "modular"
  },
  {
    "code": "fantasy",
    "name": "Fantasía",
    "set_type": "modular"
  },
  {
    "code": "horror",
    "name": "Terror",
    "set_type": "modular"
  },
  {
    "code": "sci-fi",
    "name": "Ciencia Ficción",
    "set_type": "modular"
  },
  {
    "code": "sitcom",
    "name": "Telecomedia",
    "set_type": "modular"
  },
  {
    "code": "longshot",
    "name": "Longshot",
    "set_type": "modular"
  },
  {
    "code": "gambit",
    "name": "Gambito",
    "set_type": "modular"
  },
  {
    "code": "exodus",
    "name": "Éxodo",
    "set_type": "modular"
  },
  {
    "code": "rogue",
    "name": "Pícara",
    "set_type": "modular"
  },
  {
    "code": "reavers",
    "name": "Cosechadores",
    "set_type": "modular"
  },
  {
    "code": "cable",
    "name": "Cable",
    "set_type": "modular"
  },
  {
    "code": "domino",
    "name": "Dominó",
    "set_type": "modular"
  },
  {
    "code": "morlock_siege",
    "name": "Asedio Morlock",
    "set_type": "modular"
  },
  {
    "code": "military_grade",
    "name": "Arsenal Militar",
    "set_type": "modular"
  },
  {
    "code": "mutant_slayers",
    "name": "Asesinos de Mutantes",
    "set_type": "modular"
  },
  {
    "code": "on_the_run",
    "name": "A la Fuga",
    "set_type": "modular"
  },
  {
    "code": "nasty_boys",
    "name": "Chicos Malos",
    "set_type": "modular"
  },
  {
    "code": "hope_summers",
    "name": "Hope Summers",
    "set_type": "modular"
  },
  {
    "code": "black_tom_cassidy",
    "name": "Tom Cassidy el Negro",
    "set_type": "modular"
  },
  {
    "code": "flight",
    "name": "Vuelo",
    "set_type": "modular"
  },
  {
    "code": "super_strength",
    "name": "Superfuerza",
    "set_type": "modular"
  },
  {
    "code": "telepathy",
    "name": "Telepatía",
    "set_type": "modular"
  },
  {
    "code": "extreme_measures",
    "name": "Medidas Extremas",
    "set_type": "modular"
  },
  {
    "code": "mutant_insurrection",
    "name": "Insurrección Mutante",
    "set_type": "modular"
  },
  {
    "code": "next_evol_campaign",
    "name": "Campaña Proxima Evolución",
    "set_type": "modular"
  },
  {
    "code": "psylocke",
    "name": "Mariposa Mental",
    "set_type": "modular"
  },
  {
    "code": "angel",
    "name": "Ángel",
    "set_type": "modular"
  },
  {
    "code": "deadpool",
    "name": "Deadpool",
    "set_type": "modular"
  },
  {
    "code": "x23",
    "name": "X-23",
    "set_type": "modular"
  },
  {
    "code": "dreadpool",
    "name": "Malsacre",
    "set_type": "modular"
  },
  {
    "code": "bishop",
    "name": "Bishop",
    "set_type": "modular"
  },
  {
    "code": "magik",
    "name": "Magik",
    "set_type": "modular"
  },
  {
    "code": "infinites",
    "name": "Infinitos",
    "set_type": "modular"
  },
  {
    "code": "dystopian_nightmare",
    "name": "Pesadilla distópica",
    "set_type": "modular"
  },
  {
    "code": "hounds",
    "name": "Sabuesos",
    "set_type": "modular"
  },
  {
    "code": "dark_riders",
    "name": "Jinetes Oscuros",
    "set_type": "modular"
  },
  {
    "code": "savage_land",
    "name": "Tierra Salvaje",
    "set_type": "modular"
  },
  {
    "code": "genosha",
    "name": "Genosha",
    "set_type": "modular"
  },
  {
    "code": "blue_moon",
    "name": "Luna azul",
    "set_type": "modular"
  },
  {
    "code": "en_sabah_nur",
    "name": "En Sabah Nur",
    "set_type": "modular"
  },
  {
    "code": "celestial_tech",
    "name": "Tecnología celestial",
    "set_type": "modular"
  },
  {
    "code": "clan_akkaba",
    "name": "Clan Akkaba",
    "set_type": "modular"
  },
  {
    "code": "age_of_apocalypse",
    "name": "La era de Apocalipsis",
    "set_type": "modular"
  },
  {
    "code": "aoa_mission",
    "name": "Misión",
    "set_type": "modular"
  },
  {
    "code": "aoa_campaign",
    "name": "Campaña",
    "set_type": "modular"
  },
  {
    "code": "overseer",
    "name": "Capataz",
    "set_type": "modular"
  },
  {
    "code": "prelates",
    "name": "Prelados",
    "set_type": "modular"
  },
  {
    "code": "iceman",
    "name": "Hombre de Hielo",
    "set_type": "modular"
  },
  {
    "code": "iceman_frostbite",
    "name": "Congelación",
    "set_type": "modular"
  },
  {
    "code": "sauron",
    "name": "Saurón",
    "set_type": "modular"
  },
  {
    "code": "jubilee",
    "name": "Júbilo",
    "set_type": "modular"
  },
  {
    "code": "arcade",
    "name": "Arcade",
    "set_type": "modular"
  },
  {
    "code": "nightcrawler",
    "name": "Rondador Nocturno",
    "set_type": "modular"
  },
  {
    "code": "crazy_gang",
    "name": "La banda loca",
    "set_type": "modular"
  },
  {
    "code": "magneto",
    "name": "Magneto",
    "set_type": "modular"
  },
  {
    "code": "hellfire",
    "name": "Fuego infernal",
    "set_type": "modular"
  },
  {
    "code": "maria_hill",
    "name": "Maria Hill",
    "set_type": "modular"
  },
  {
    "code": "nick_fury",
    "name": "Nick Furia",
    "set_type": "modular"
  },
  {
    "code": "a.i.m._abduction",
    "name": "Secuestros de I.M.A.",
    "set_type": "modular"
  },
  {
    "code": "a.i.m._science",
    "name": "Ciencia de I.M.A.",
    "set_type": "modular"
  },
  {
    "code": "batrocs_brigade",
    "name": "Brigada de Batroc",
    "set_type": "modular"
  },
  {
    "code": "scientist_supreme",
    "name": "Científico supremo",
    "set_type": "modular"
  },
  {
    "code": "gravitational_pull",
    "name": "Fuerza gravitatoria",
    "set_type": "modular"
  },
  {
    "code": "hard_sound",
    "name": "Sonido sólido",
    "set_type": "modular"
  },
  {
    "code": "pale_little_spider",
    "name": "Pálida arañita",
    "set_type": "modular"
  },
  {
    "code": "power_of_the_atom",
    "name": "El poder del átomo",
    "set_type": "modular"
  },
  {
    "code": "supersonic",
    "name": "Supersónico",
    "set_type": "modular"
  },
  {
    "code": "the_leaper",
    "name": "El Saltador",
    "set_type": "modular"
  },
  {
    "code": "s.h.i.e.l.d._executive_board",
    "name": "S.H.I.E.L.D. junta directiva",
    "set_type": "modular"
  },
  {
    "code": "executive_board_evidence",
    "name": "Pruebas de la junta",
    "set_type": "modular"
  },
  {
    "code": "silk",
    "name": "Seda",
    "set_type": "modular"
  },
  {
    "code": "growing_strong",
    "name": "Crecimiento fuerte",
    "set_type": "modular"
  },
  {
    "code": "black_panther_shuri",
    "name": "Pantera Negra (Shuri)",
    "set_type": "modular"
  },
  {
    "code": "extreme_risk",
    "name": "Riesgo extremo",
    "set_type": "modular"
  },
  {
    "code": "falcon",
    "name": "Halcón",
    "set_type": "modular"
  },
  {
    "code": "techno",
    "name": "Tecno",
    "set_type": "modular"
  },
  {
    "code": "winter_soldier",
    "name": "Soldado de Invierno",
    "set_type": "modular"
  },
  {
    "code": "whiteout",
    "name": "Viento blanco",
    "set_type": "modular"
  },
  {
    "code": "tigra",
    "name": "Tigra",
    "set_type": "modular"
  },
  {
    "code": "hulkling",
    "name": "Hulkling",
    "set_type": "modular"
  },
  {
    "code": "iron_man_leader",
    "name": "Iron Man",
    "set_type": "modular"
  },
  {
    "code": "registration",
    "name": "Registro",
    "set_type": "modular"
  },
  {
    "code": "mighty_avengers",
    "name": "Poderosos Vengadores",
    "set_type": "modular"
  },
  {
    "code": "the_initiative",
    "name": "La iniciativa",
    "set_type": "modular"
  },
  {
    "code": "maria_hill_modular",
    "name": "Maria Hill",
    "set_type": "modular"
  },
  {
    "code": "dangerous_recruits",
    "name": "Dangerous Recruits",
    "set_type": "modular"
  },
  {
    "code": "captain_marvel_leader",
    "name": "Capitana Marvel",
    "set_type": "modular"
  },
  {
    "code": "resistance",
    "name": "Resistencia",
    "set_type": "modular"
  },
  {
    "code": "cape_killer",
    "name": "Matacapas",
    "set_type": "modular"
  },
  {
    "code": "martial_law",
    "name": "Ley marcial",
    "set_type": "modular"
  },
  {
    "code": "heroes_for_hire",
    "name": "Heroes for Hire",
    "set_type": "modular"
  },
  {
    "code": "paladin",
    "name": "Paladin",
    "set_type": "modular"
  },
  {
    "code": "standard_pvp",
    "name": "Normal JCJ",
    "set_type": "modular"
  },
  {
    "code": "captain_america_leader",
    "name": "Capitán América",
    "set_type": "modular"
  },
  {
    "code": "new_avengers",
    "name": "Nuevos Vengadores",
    "set_type": "modular"
  },
  {
    "code": "secret_avengers",
    "name": "Vengadores secretos",
    "set_type": "modular"
  },
  {
    "code": "namor_modular",
    "name": "Namor",
    "set_type": "modular"
  },
  {
    "code": "atlanteans",
    "name": "Atlanteans",
    "set_type": "modular"
  },
  {
    "code": "spider_woman_leader",
    "name": "SpiderWoman",
    "set_type": "modular"
  },
  {
    "code": "spider_man_modular",
    "name": "SpiderMan",
    "set_type": "modular"
  },
  {
    "code": "defenders",
    "name": "Defensores",
    "set_type": "modular"
  },
  {
    "code": "hells_kitchen",
    "name": "Hell's Kitchen",
    "set_type": "modular"
  },
  {
    "code": "cloak_and_dagger_modular",
    "name": "Daga y Puñal",
    "set_type": "modular"
  },
  {
    "code": "trickster_magic",
    "name": "Magia embaucadora",
    "set_type": "modular"
  },
  {
    "code": "ant_nemesis",
    "name": "Archienemigo del Hombre Hormiga",
    "set_type": "nemesis"
  },
  {
    "code": "black_panther_nemesis",
    "name": "Archienemigo de Pantera Negra",
    "set_type": "nemesis"
  },
  {
    "code": "black_widow_nemesis",
    "name": "Archienemigo de Viuda Negra",
    "set_type": "nemesis"
  },
  {
    "code": "captain_america_nemesis",
    "name": "Archienemigo de Capitán América",
    "set_type": "nemesis"
  },
  {
    "code": "captain_marvel_nemesis",
    "name": "Archienemigo de Capitana Marvel",
    "set_type": "nemesis"
  },
  {
    "code": "colossus_nemesis",
    "name": "Archienemigo de Coloso",
    "set_type": "nemesis"
  },
  {
    "code": "cyclops_nemesis",
    "name": "Archienemigo de Cíclope",
    "set_type": "nemesis"
  },
  {
    "code": "doctor_strange_nemesis",
    "name": "Archienemigo de Doctor Extraño",
    "set_type": "nemesis"
  },
  {
    "code": "drax_nemesis",
    "name": "Archienemigo de Drax",
    "set_type": "nemesis"
  },
  {
    "code": "gam_nemesis",
    "name": "Archienemigo de Gamora",
    "set_type": "nemesis"
  },
  {
    "code": "ghost_spider_nemesis",
    "name": "Archienemigo de Ghost-Spider",
    "set_type": "nemesis"
  },
  {
    "code": "groot_nemesis",
    "name": "Archienemigo de Groot",
    "set_type": "nemesis"
  },
  {
    "code": "hawkeye_nemesis",
    "name": "Archienemigo de Ojo de Halcón",
    "set_type": "nemesis"
  },
  {
    "code": "hulk_nemesis",
    "name": "Archienemigo de Hulk",
    "set_type": "nemesis"
  },
  {
    "code": "iron_man_nemesis",
    "name": "Archienemigo de Iron Man",
    "set_type": "nemesis"
  },
  {
    "code": "ironheart_nemesis",
    "name": "Archienemigo de Ironheart",
    "set_type": "nemesis"
  },
  {
    "code": "ms_marvel_nemesis",
    "name": "Archienemigo de Ms. Marvel",
    "set_type": "nemesis"
  },
  {
    "code": "nebu_nemesis",
    "name": "Archienemigo de Nébula",
    "set_type": "nemesis"
  },
  {
    "code": "nova_nemesis",
    "name": "Archienemigo de Nova",
    "set_type": "nemesis"
  },
  {
    "code": "qsv_nemesis",
    "name": "Archienemigo de Mercurio",
    "set_type": "nemesis"
  },
  {
    "code": "rocket_nemesis",
    "name": "Archienemigo de Mapache Cohete",
    "set_type": "nemesis"
  },
  {
    "code": "scw_nemesis",
    "name": "Archienemigo de la Bruja Escarlata",
    "set_type": "nemesis"
  },
  {
    "code": "shadowcat_nemesis",
    "name": "Archienemigo de Gatasombra",
    "set_type": "nemesis"
  },
  {
    "code": "she_hulk_nemesis",
    "name": "Archienemigo de Hulka",
    "set_type": "nemesis"
  },
  {
    "code": "spdr_nemesis",
    "name": "Archienemigo de SP//dr",
    "set_type": "nemesis"
  },
  {
    "code": "spectrum_nemesis",
    "name": "Archienemigo de Spectrum",
    "set_type": "nemesis"
  },
  {
    "code": "spider_man_morales_nemesis",
    "name": "Archienemigo de Spiderman (Miles Morales)",
    "set_type": "nemesis"
  },
  {
    "code": "spider_man_nemesis",
    "name": "Archienemigo de Spiderman",
    "set_type": "nemesis"
  },
  {
    "code": "spider_woman_nemesis",
    "name": "Archienemigo de Spiderwoman",
    "set_type": "nemesis"
  },
  {
    "code": "spiderham_nemesis",
    "name": "Archienemigo de Spiderham",
    "set_type": "nemesis"
  },
  {
    "code": "stld_nemesis",
    "name": "Archienemigo de Starlord",
    "set_type": "nemesis"
  },
  {
    "code": "thor_nemesis",
    "name": "Archienemigo de Thor",
    "set_type": "nemesis"
  },
  {
    "code": "valk_nemesis",
    "name": "Archienemigo de Valkiria",
    "set_type": "nemesis"
  },
  {
    "code": "vision_nemesis",
    "name": "Archienemigo de La Visión",
    "set_type": "nemesis"
  },
  {
    "code": "vnm_nemesis",
    "name": "Archienemigo de Veneno",
    "set_type": "nemesis"
  },
  {
    "code": "warlock_nemesis",
    "name": "Archienemigo de Adam Warlock",
    "set_type": "nemesis"
  },
  {
    "code": "warm_nemesis",
    "name": "Archienemigo de Máquina de Guerra",
    "set_type": "nemesis"
  },
  {
    "code": "wolverine_nemesis",
    "name": "Archienemigo de Lobezno",
    "set_type": "nemesis"
  },
  {
    "code": "wsp_nemesis",
    "name": "Archienemigo de la Avispa",
    "set_type": "nemesis"
  },
  {
    "code": "phoenix_nemesis",
    "name": "Archienemigo de Fénix",
    "set_type": "nemesis"
  },
  {
    "code": "storm_nemesis",
    "name": "Archienemigo de Nemesis",
    "set_type": "nemesis"
  },
  {
    "code": "gambit_nemesis",
    "name": "Archienemigo de Gambito",
    "set_type": "nemesis"
  },
  {
    "code": "rogue_nemesis",
    "name": "Archienemigo de Pícara",
    "set_type": "nemesis"
  },
  {
    "code": "cable_nemesis",
    "name": "Archienemigo de Cable",
    "set_type": "nemesis"
  },
  {
    "code": "domino_nemesis",
    "name": "Archienemigo de Dominó",
    "set_type": "nemesis"
  },
  {
    "code": "psylocke_nemesis",
    "name": "Archienemigo de Mariposa Mental",
    "set_type": "nemesis"
  },
  {
    "code": "angel_nemesis",
    "name": "Archienemigo de Ángel",
    "set_type": "nemesis"
  },
  {
    "code": "deadpool_nemesis",
    "name": "Archienemigo de Deadpool",
    "set_type": "nemesis"
  },
  {
    "code": "x23_nemesis",
    "name": "Archienemigo de X-23",
    "set_type": "nemesis"
  },
  {
    "code": "bishop_nemesis",
    "name": "Archienemigo de Bishop",
    "set_type": "nemesis"
  },
  {
    "code": "magik_nemesis",
    "name": "Archienemigo de Magik",
    "set_type": "nemesis"
  },
  {
    "code": "iceman_nemesis",
    "name": "Archienemigo del Hombre de Hielo",
    "set_type": "nemesis"
  },
  {
    "code": "jubilee_nemesis",
    "name": "Archienemigo de Júbilo",
    "set_type": "nemesis"
  },
  {
    "code": "nightcrawler_nemesis",
    "name": "Archienemigo de Rondador Nocturno",
    "set_type": "nemesis"
  },
  {
    "code": "magneto_nemesis",
    "name": "Archienemigo de Magneto",
    "set_type": "nemesis"
  },
  {
    "code": "maria_hill_nemesis",
    "name": "Archienemigo de Maria Hill",
    "set_type": "nemesis"
  },
  {
    "code": "nick_fury_nemesis",
    "name": "Archienemigo de Nick Furia",
    "set_type": "nemesis"
  },
  {
    "code": "silk_nemesis",
    "name": "Archienemigo de Seda",
    "set_type": "nemesis"
  },
  {
    "code": "black_panther_shuri_nemesis",
    "name": "Archienemigo de Pantera Negra (Shuri)",
    "set_type": "nemesis"
  },
  {
    "code": "falcon_nemesis",
    "name": "Archienemigo de Halcón",
    "set_type": "nemesis"
  },
  {
    "code": "winter_soldier_nemesis",
    "name": "Archienemigo del Soldado de Invierno",
    "set_type": "nemesis"
  },
  {
    "code": "tigra_nemesis",
    "name": "Archienemigo de Tigra",
    "set_type": "nemesis"
  },
  {
    "code": "hulkling_nemesis",
    "name": "Archienemigo de Hulkling",
    "set_type": "nemesis"
  },
  {
    "code": "nebula_hero",
    "name": "Nébula",
    "set_type": "unknown"
  },
  {
    "code": "nebula_nemesis",
    "name": "Archienemigo de Nébula",
    "set_type": "unknown"
  }
]
$$::jsonb) AS js(code text, name text, set_type text)
ON CONFLICT (code) DO UPDATE SET name = EXCLUDED.name, set_type = EXCLUDED.set_type;



ALTER TABLE sets ADD COLUMN names jsonb NOT NULL DEFAULT '{}'::jsonb;
-- optional: backfill English from existing name
UPDATE sets SET names = jsonb_set(names, '{en}', to_jsonb(name), true)
WHERE NOT (names ? 'en');

-- Foreign key for packs

ALTER TABLE sets
  ADD COLUMN IF NOT EXISTS pack_code TEXT;

ALTER TABLE sets
  ADD CONSTRAINT sets_pack_code_fkey
  FOREIGN KEY (pack_code)
  REFERENCES packs(code)
  ON UPDATE CASCADE
  ON DELETE SET NULL;
  
CREATE INDEX IF NOT EXISTS idx_sets_pack_code ON sets(pack_code);

COMMIT;

-- End of self-contained import