<script>
  import { currentPage, maxRecordPerPage, maxPage } from "../store/store";
  export let fetchdata = () => {};

  export let datapoints = 0;
  export let dis = 0;
</script>

<div class="flex text-sm items-center justify-between py-3">
  <div class="flex gap-3">
    <form class="flex gap-4 items-center">
      <div class="form-control">
        <label class="input-group input-group-sm">
          <div
            on:click={() => {
              $currentPage -= 1;
              fetchdata();
            }}
            class="btn btn-sm"
          >
            -
          </div>
          <input
            bind:value={$currentPage}
            type="text"
            class="input input-bordered w-20 text-center  input-sm "
          />
          <div
            on:click={() => {
              $currentPage += 1;
              fetchdata();
            }}
            class="btn btn-sm"
          >
            +
          </div>
        </label>
      </div>
      <div class="text-sm opacity-40">
        Page {$currentPage} ({$maxRecordPerPage} records) of {$maxPage} pages
      </div>
    </form>
  </div>
  <div class="flex gap-3">
    <div class="text-sm opacity-40">
      Displaying <b>{dis}</b> of Total <b>{datapoints}</b> data points
    </div>
  </div>
</div>
