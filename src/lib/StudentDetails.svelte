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
      submitted10th: true,
      submitted12th: false,
      submittedTC: false,
      submittedMigration: false,
      others: "",
      sid: "1"
    },
  ];
  let columnName = {
    name:"name",
    branch : "branch",
    others: "others",
    agg: "Agg %",
    gender : "gender",
    stream: "stream",
    dob : "dob", 
    submitted10th : "10th",
    submitted12th : "12th",
    submittedTC : "TC",
    submittedMigration : "Mig",
  }
</script>

<section>
  <Navbar />
  <div class="p-5">
    <table class="table w-full overflow-auto p-5 table-auto">
      <tr class="bg-purple-100 rounded-3xl uppercase">
        {#each Object.keys(data[0]) as d }
        {#if d !== "sid"}
          <th class="border">{columnName[d]}</th>          
        {/if} 
        {/each}
        <th class="border">ACTION</th>

      </tr>
      
      <tr>
      {#each data as d }
        {#each Object.keys(data[0]) as k}
          {#if k !== "sid"}
          {#if (k === "submitted10th" || k === "submitted12th" || k === "submittedTC" || k === "submitedMigration") && d[k]  }
          <td class="border">✅</td>
        {:else if (k === "submitted10th" || k === "submitted12th" || k === "submittedTC" || k === "submittedMigration") && !d[k]}
          <td class="border">❌</td>
        {:else}
          <td class="border">{d[k]? d[k]: "-"}</td>
        {/if}
        {/if}
        {/each}
      {/each}
        <td class="border">Wel</td>
    </tr>
      
    </table>
  </div>
</section>
