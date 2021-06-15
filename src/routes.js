import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

// DEFINE ALL ROUTES FOR NAV IN APP
const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage")
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage")
  },
  {
    path: "/about",
    name: "about",
    component: () => import("./pages/AboutPage")
  },
  {
    path: "/stageMatches",
    name: "stageMatches",
    component: () => import("./pages/StageMatchesPage")
  },
  {
    path: "/favoriteMatches",
    name: "favoriteMatches",
    component: () => import("./pages/FavoriteMatchesPage")
  },
  {
    path: "/favoriteTeams",
    name: "favoriteTeams",
    component: () => import("./pages/FavoriteTeamsPage")
  },
  {
    path: "/favoritePlayers",
    name: "favoritePlayers",
    component: () => import("./pages/FavoritePlayersPage")
  },
  {
    path: "/leagueMangement/addMatch",
    name: "addMatch",
    component: () => import("./pages/AddMatchPage")
  },
  {
    path: "/leagueMangement/addResult",
    name: "addResult",
    component: () => import("./pages/AddResultPage")
  },
  {
    path: "/leagueMangement/addEventCalendar",
    name: "addEventCalendar",
    component: () => import("./pages/AddEventCalendarPage")
  },
  {
    path: "/leagueMangement",
    name: "leagueMangement",
    component: () => import("./pages/LeagueMangementPage")
  },
  {
    path: "/coach/:id",
    name: "coach",
    component: () => import("./pages/CoachPage")
  },
  {
    path: "/player/:id",
    name: "player",
    component: () => import("./pages/PlayerPage")
  },
  {
    path: "/team/:id",
    name: "team",
    component: () => import("./pages/TeamPage")
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

export default routes;
