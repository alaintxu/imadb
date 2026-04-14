export const translations = {
  en: {
    nav: {
      imas: "IMA List",
      scenarios: "Scenarios",
      admin: "Admin",
    },
    home: {
      title: "Card Sets",
      tableHeaders: {
        set: "Set",
        code: "Code",
        type: "Type",
      },
    },
    imas: {
      title: "IMAs",
      createNew: "Create new IMA",
      filterPlaceholder: "Filter by scenario...",
      openIma: "Open IMA",
      modularSets: "Modular sets",
    },
    scenarios: {
      title: "Choose a scenario",
      subtitle: "IMAs by scenario",
      filterPlaceholder: "Filter scenario by text...",
      loading: "Loading scenarios...",
    },
    sets:{
      types: {
        modular: "Modular",
        hero: "Hero",
        villain: "Villain",
        nemesis: "Nemesis",
        standard: "Standard",
        expert: "Expert",
        hero_special: "Hero Special",
        evidence: "Evidence",
        leader: "Leader",
      }
    },
    imasNew: {
      title: "New IMA",
      villain: "Villain",
      modules: "Modules",
      nemesis: "Nemesis",
      titleLabel: "Title",
      titlePlaceholder: "IMA title",
      description: "Description",
      descriptionPlaceholder: "Description",
      save: "Save IMA",
      sending: "Sending...",
      loadingModules: "Loading modules...",
    },
    setSelect: {
      selectSet: "Select a set...",
      noSetsFound: "No sets found",
    },
    table: {
      page: "Page",
      of: "of",
      filter: "---",
    },
    loading: {
      loading: "Loading...",
    },
  },
  es: {
    nav: {
      imas: "Lista de IMAs",
      scenarios: "Escenarios",
      admin: "Admin",
    },
    home: {
      title: "Sets de cartas",
      tableHeaders: {
        set: "Set",
        code: "Código",
        type: "Tipo",
      },
    },
    imas: {
      title: "IMAs",
      createNew: "Crear nuevo IMA",
      filterPlaceholder: "Filtrar por escenario...",
      openIma: "Abrir IMA",
      modularSets: "Encuentros modulares",
    },
    scenarios: {
      title: "Elige un escenario",
      subtitle: "IMAs por escenario",
      filterPlaceholder: "Filtrar escenario con texto...",
      loading: "Cargando escenarios...",
    },
    sets:{
      types: {
        modular: "Modular",
        hero: "Héroe",
        villain: "Villano",
        nemesis: "Archienemigo",
        standard: "Estándar",
        expert: "Experto",
        hero_special: "Especial de Héroe",
        evidence: "Evidencia",
        leader: "Líder",
      }
    },
    imasNew: {
      title: "Nuevo IMA",
      villain: "Villano",
      modules: "Módulos",
      nemesis: "Archienemigos",
      titleLabel: "Título",
      titlePlaceholder: "Título del IMA",
      description: "Descripción",
      descriptionPlaceholder: "Descripción",
      save: "Guardar IMA",
      sending: "Enviando...",
      loadingModules: "Cargando módulos...",
    },
    setSelect: {
      selectSet: "Selecciona un set...",
      noSetsFound: "No se encontraron sets",
    },
    table: {
      page: "Página",
      of: "de",
      filter: "---",
    },
    loading: {
      loading: "Cargando...",
    },
  },
} as const;

export type Language = keyof typeof translations;
export type TranslationKeys = typeof translations.en;
