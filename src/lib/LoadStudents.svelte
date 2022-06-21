<script>
  import Navbar from "./components/Navbar.svelte";
  import * as dfd from "danfojs";
  let files;
  let currentStep = 0;
  let step = ["Upload CSV", "Preview", "Finish"];
  let parsedData = {
    columns: [],
    data: [],
  };
  async function processCSV() {
    let df = await dfd.readCSV(files[0]);
    df = df.dropNa({ axis: 1 });
    parsedData.columns = df.columns;
    parsedData.data = df.values;
    console.log(df.values);
  }
  $: {
    if (files && files.length > 0) {
      processCSV();
    }
  }
</script>

<section>
  <Navbar />
  <div class="flex flex-col p-5 mt-10 max-w-7xl mx-auto">
    <div class="text-3xl font-bold">Data Loading</div>
    <div>Load Student data on SDM</div>
  </div>
  <div class="flex flex-col p-5 max-w-7xl mx-auto">
    <ul class="steps">
      {#each step as s, index}
        <li class={`step  ${index <= currentStep ? "step-primary" : ""}`}>
          {s}
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex flex-col p-6 mt-10 mx-auto border max-w-7xl rounded-2xl  ">
    {#if currentStep === 0}
      <!-- upload CSV form -->
      <form
        on:submit|preventDefault={(e) => {
          currentStep += 1;
        }}
        class="flex flex-col gap-3 "
      >
        <div>
          <div class="text-3xl font-bold">Upload student data file</div>
          <div>Please note that only CSV files are supported</div>
        </div>
        <input
          type="file"
          name="file"
          bind:files
          class="file:bg-purple-100 mt-5 file:text-purple-600 file:border-none file:px-4 file:py-3  file:rounded-full file:mr-5 hover:file:bg-blue-200 file:transition-all file:font-semibold"
          id=""
        />
        <button type="submit" class="btn rounded-3xl bg-purple-700 mt-4"
          >Submit</button
        >
      </form>
    {/if}
    {#if currentStep === 1}
      <!-- Preview Table -->
      <div class="flex items-center justify-between py-6">
        <div class="">
          Please check if the data is loading correctly. If not, there is a
          problem in your CSV most likely.
        </div>
        <div>
          <div
            on:click={() => {
              currentStep += 1;
            }}
            class="btn bg-purple-700"
          >
            Yes, the data is flawless
          </div>
          <div
            on:click={() => {
              currentStep -= 1;
              files = undefined;
            }}
            class="btn bg-red-500 border-none"
          >
            No, Go back
          </div>
        </div>
      </div>
      <div class="text-xl font-bold opacity-50 py-3">Data Preview:</div>
      <table class="table table-zebra overflow-auto">
        <tr>
          {#each parsedData.columns as cols}
            <th class="border"> {cols}</th>
          {/each}
        </tr>
        {#each parsedData.data as row}
          <tr>
            {#each row as r}
              <td class="border">{r}</td>
            {/each}
          </tr>
        {/each}
      </table>
      <table />
    {/if}
    {#if currentStep === 2}
      <!-- Confirmation -->
      <div class="flex items-center justify-between">
        <div class="text-3xl">Confirm Data Load</div>
        <div>
          <div
            on:click={() => {
              // format and server call
            }}
            class="btn bg-purple-500 border-none"
          >
            Yes, Proceed
          </div>
          <div
            on:click={() => {
              currentStep -= 1;
            }}
            class="btn bg-red-500 border-none"
          >
            No, Go back
          </div>
        </div>
      </div>
      <div class="max-w-4xl">
        Quality of data on the system depends on the data that loads on the
        system. Doing this operation will load the current data onto the system.
        Please confirm this action.
        <br />
        <span class="text-red-500">
          Loading wrong data will lead to manual deletion of all the loaded
          records
        </span>
      </div>
    {/if}
  </div>
</section>
