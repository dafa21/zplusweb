export const URL = {
  DASHBOARD_WELCOME: () => "/dashboard/welcome",
  DASHBOARD_HEROES: () => "/dashboard/heroes",
  DASHBOARD_HEROES_ADD: () => "/dashboard/heroes/add",
  DASHBOARD_HEROES_EDIT: (id) => `/dashboard/heroes/${id}/edit`,
  DASHBOARD_PROBLEMS: () => "/dashboard/solutions",
  DASHBOARD_PROBLEMS_ADD: () => "/dashboard/solutions/add",
  DASHBOARD_PROBLEMS_EDIT: (id) => `/dashboard/solutions/${id}/edit`,
  DASHBOARD_FEATURES: () => "/dashboard/features",
  DASHBOARD_FEATURES_ADD: () => "/dashboard/features/add",
  DASHBOARD_FEATURES_EDIT: (id) => `/dashboard/features/${id}/edit`,
  DASHBOARD_CREDIBILITIES: () => "/dashboard/credibilities",
  DASHBOARD_CREDIBILITIES_ADD: () => "/dashboard/credibilities/add",
  DASHBOARD_CREDIBILITIES_EDIT: (id) => `/dashboard/credibilities/${id}/edit`,
  DASHBOARD_TESTIMONIES: () => "/dashboard/testimonies",
  DASHBOARD_TESTIMONIES_ADD: () => "/dashboard/testimonies/add",
  DASHBOARD_TESTIMONIES_EDIT: (id) => `/dashboard/testimonies/${id}/edit`,
  DASHBOARD_SOCIALS: () => "/dashboard/socials",
  DASHBOARD_SOCIALS_ADD: () => "/dashboard/socials/add",
  DASHBOARD_SOCIALS_EDIT: (id) => `/dashboard/socials/${id}/edit`,
  DASHBOARD_IDENTITY: () => "/dashboard/identity",
  DASHBOARD_VISION_AND_MISSION: () => "/dashboard/vision-and-mission",
  DASHBOARD_HISTORY: () => "/dashboard/history",
  DASHBOARD_MEMBERS: () => "/dashboard/members",
  DASHBOARD_MEMBERS_ADD: () => "/dashboard/members/add",
  DASHBOARD_MEMBERS_EDIT: (id) => `/dashboard/members/${id}/edit`,
  DASHBOARD_MODULES: () => "/dashboard/modules",
  DASHBOARD_MODULES_ADD: () => "/dashboard/modules/add",
  DASHBOARD_MODULES_EDIT: (id) => `/dashboard/modules/${id}/edit`,
  DASHBOARD_MODULE_FEATURES_ADD: (id) =>
    `/dashboard/modules/${id}/features/add`,
  DASHBOARD_MODULE_FEATURES_EDIT: (idModule, idFeature) =>
    `/dashboard/modules/${idModule}/features/${idFeature}/edit`,
  DASHBOARD_CLIENTS: () => "/dashboard/clients",
  DASHBOARD_CLIENTS_ADD: () => "/dashboard/clients/add",
  DASHBOARD_CLIENTS_EDIT: (id) => `/dashboard/clients/${id}/edit`,
};

export const MENUS = [
  {
    title: "Welcome",
    url: URL.DASHBOARD_WELCOME(),
  },
  {
    title: "Main Page",
    url: "#",
    items: [
      {
        title: "Hero",
        url: URL.DASHBOARD_HEROES(),
      },
      {
        title: "Problem and Solution",
        url: URL.DASHBOARD_PROBLEMS(),
      },
      {
        title: "Featured Feature",
        url: URL.DASHBOARD_FEATURES(),
      },
      {
        title: "Credibility",
        url: URL.DASHBOARD_CREDIBILITIES(),
      },
      {
        title: "Testimony",
        url: URL.DASHBOARD_TESTIMONIES(),
      },
      {
        title: "Social Media",
        url: URL.DASHBOARD_SOCIALS(),
      },
    ],
  },
  {
    title: "About Us",
    url: "#",
    items: [
      {
        title: "Identity",
        url: URL.DASHBOARD_IDENTITY(),
      },
      {
        title: "Vision and Mission",
        url: URL.DASHBOARD_VISION_AND_MISSION(),
      },
      {
        title: "History",
        url: URL.DASHBOARD_HISTORY(),
      },
      {
        title: "Team",
        url: URL.DASHBOARD_MEMBERS(),
      },
    ],
  },
  {
    title: "Module",
    url: URL.DASHBOARD_MODULES(),
  },
  {
    title: "Client",
    url: URL.DASHBOARD_CLIENTS(),
  },
];
