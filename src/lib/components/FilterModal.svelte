<script>
  // @ts-nocheck
  import SubmissionComponent from "./SubmissionComponent.svelte";
  import { filterModalOpen } from "../store/store";
  import RangeSlider from "svelte-range-slider-pips";
  import Options from "./Options.svelte";
  let filters = {
    docs: {},
    stream: "",
    branch: "",
  };
  let pmcscorerangeslider = [30, 70];
  let streamOptions = ["Why were they open"];
  let boardOptions = ["Why were they open"];
  let branchOptions = ["fire"];
  $: {
    console.log(pmcscorerangeslider);
    filters.score = {
      ub: Math.max(...pmcscorerangeslider),
      lb: Math.min(...pmcscorerangeslider),
    };
    console.log(filters);
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
          title="10th Marks card"
          bind:filters
          key="markscard10th"
        />
        <SubmissionComponent
          title="12th Marks card"
          bind:filters
          submitted={"markscard12th" in filters.docs}
          key="markscard12th"
        />
        <SubmissionComponent
          title="Transfer Certificate"
          bind:filters
          submitted={"tc" in filters.docs}
          key="tc"
        />
        <SubmissionComponent
          title="Migration Certificate"
          bind:filters
          submitted={"mig" in filters.docs}
          key="mig"
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
  </div>
</div>
