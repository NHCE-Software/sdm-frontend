// @ts-nocheck
import Auth from "./lib/Auth.svelte";
import NotFound from "./lib/NotFound.svelte";
import StudentDetails from "./lib/StudentDetails.svelte";

const routes = {
  "/": Auth,
  "/studentdetails": StudentDetails,
  "*": NotFound,
};

export default routes;
