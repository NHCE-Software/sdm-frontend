// @ts-nocheck
import Auth from "./lib/Auth.svelte";
import NotFound from "./lib/NotFound.svelte";
import StudentDetails from "./lib/StudentDetails.svelte";
import LoadStudents from "./lib/LoadStudents.svelte";
import StudentDetails2 from "./lib/StudentDetails2.svelte";

const routes = {
  "/": Auth,
  "/studentdetails": StudentDetails,
  "/studentdetails2": StudentDetails2,
  "/loadstudents": LoadStudents,
  "*": NotFound,
};

export default routes;
