<script>
  // @ts-nocheck
  import SubmissionComponent from "./SubmissionComponent.svelte";
  import { filterModalOpen } from "../store/store";
  import RangeSlider from "svelte-range-slider-pips";
  import Options from "./Options.svelte";
  export let filteroptions = {};
  export let fetchdata;
  export let filters;
  let pmcscorerangeslider = [0, 100];

  let streamOptions;
  let boardOptions;
  let branchOptions;
  let sc1;
  let sc2;
  let sc3;
  let sc4;
  $: {
    console.log(filters);
    streamOptions = filteroptions.stream || ["Why were they open"];
    boardOptions = filteroptions.board12 || ["Why were they open"];
    branchOptions = filteroptions.branch || ["Why were they open"];
    filters.score = {
      ub: Math.max(...pmcscorerangeslider),
      lb: Math.min(...pmcscorerangeslider),
    };
    //console.log(filters);
  }
</script>

<input
  type="checkbox"
  checked={$filterModalOpen}
  id="filter-modal"
  class="modal-toggle"
/>
<div class="modal">
  <div class="modal-box relative max-w-screen-md">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label
      on:click={() => {
        filterModalOpen.set(false);
      }}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <h3 class="text-lg font-bold">Advanced Filtering</h3>
    <div class="py-4">
      <div class="text-lg opacity-50 font-bold">Submitted Documents</div>
      <div class="my-3 grid grid-cols-2 gap-2">
        <SubmissionComponent
          bind:this={sc1}
          title="10th Marks card"
          bind:filters
          submitted={"10th" in filters.docs}
          key="10th"
        />
        <SubmissionComponent
          bind:this={sc2}
          title="12th Marks card"
          bind:filters
          submitted={"12th" in filters.docs}
          key="12th"
        />
        <SubmissionComponent
          bind:this={sc3}
          title="Transfer Certificate"
          bind:filters
          submitted={"TC" in filters.docs}
          key="TC"
        />
        <SubmissionComponent
          bind:this={sc4}
          title="Migration Certificate"
          bind:filters
          submitted={"MIG" in filters.docs}
          key="MIG"
        />
      </div>
      <div class="text-lg opacity-50  font-bold">General</div>
      <div class="my-3 grid grid-cols-2 gap-3">
        <div>
          <Options
            header="Stream"
            options={streamOptions}
            bind:value={filters.stream}
          />
        </div>
        <div>
          <Options
            header="Branch"
            options={branchOptions}
            bind:value={filters.branch}
          />
        </div>
        <div>
          <Options
            header="Board"
            options={boardOptions}
            bind:value={filters.board}
          />
        </div>
      </div>
      <div class="text-lg opacity-50  font-bold">PCM Score</div>
      <div class="my-3 z-20">
        <RangeSlider all="label" pips bind:values={pmcscorerangeslider} float />
      </div>
    </div>
    <div class=" flex gap-10 ml-auto justify-end">
      <button
        on:click={() => {
          filters = {
            stream: "",
            branch: "",
            docs: {},
            score: {
              ub: 100,
              lb: 0,
            },
          };
          pmcscorerangeslider = [0, 100];
          if (sc1) sc1.setfalse();
          if (sc2) sc2.setfalse();
          if (sc3) sc3.setfalse();
          if (sc4) sc4.setfalse();
        }}
        class="hover:text-purple-500 transition-all">Clear Filter</button
      >
      <button
        on:click={() => {
          fetchdata("filter");
          filterModalOpen.set(false);
        }}
        class="btn">Apply</button
      >
    </div>
  </div>
</div>
