import Dashboard from "views/Dashboard.js";
import Inmates from "views/Inmates.js";
import Exconvicts from "views/Exconvicts";
import Guest from "views/Guest.js";
import TableList from "views/TableList.js";
// import UserProfile from "views/UserProfile.js";

let routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/inmates",
    name: "Inmates",
    icon: "tim-icons icon-single-02",
    component: Inmates,
    layout: "/admin",
  },
  {
    path: "/guest",
    name: "Guest",
    icon: "tim-icons icon-single-02",
    component: Guest,
    layout: "/admin",
  },
  {
    path: "/exconvicts",
    name: "Exconvicts",
    icon: "tim-icons icon-single-02",
    component: Exconvicts,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "tim-icons icon-puzzle-10",
    component: TableList,
    layout: "/admin",
  },
];
export default routes;
