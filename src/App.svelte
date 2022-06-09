<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<Router {routes} />

<style>
  @import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap");

  :global(body) {
    font-family: "Manrope", sans-serif;
  }
</style>
