<script>
  import { onMount } from "svelte";

  import Navbar from "./components/Navbar.svelte";
  let data = [
    {
      name: "John",
      branch: "CSE",
      gender: "M",
      stream: "Prof",
      dob: "1/2/2",
      agg: "10",
      submited10th: false,
      submited12th: false,
      submitedTC: false,
      submitedMigration: false,
      others: "",
    },
  ];
</script>

<section>
  <Navbar />
</section>
