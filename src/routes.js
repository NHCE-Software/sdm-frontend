// @ts-nocheck
import Auth from "./lib/Auth.svelte";
import NotFound from "./lib/NotFound.svelte";
import StudentDetails from "./lib/StudentDetails.svelte";
import LoadStudents from "./lib/LoadStudents.svelte";
import StudentDetails2 from "./lib/StudentDetails2.svelte";
import { wrap } from "svelte-spa-router/wrap";

function checkAuth() {
  return localStorage.getItem("token") ? true : false;
}

const routes = {
  "/": Auth,
  "/studentdetails": StudentDetails,
  "/studentdetails2": wrap({ component: StudentDetails2 }),
  "/loadstudents": LoadStudents,
  "*": NotFound,
};

export default routes;
