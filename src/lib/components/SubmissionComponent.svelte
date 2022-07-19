<script>
  // @ts-nocheck

  export let title = "";
  export let filters;
  export let key;
  let enabled = false;
  let submitted = false;
  export function setfalse() {
    enabled = false;
    submitted = false;
  }
  $: {
    if (enabled) {
      if (submitted) {
        filters.docs[key] = "Submitted";
      } else {
        filters.docs[key] = "Not Submitted";
      }
    } else {
      delete filters.docs[key];
      filters = { ...filters };
    }
  }
</script>

<div class="flex gap-2 p-6 border rounded-2xl items-center">
  <input type="checkbox" bind:checked={enabled} class="checkbox" />
  <div class="text-sm">{title}</div>
  <div class="flex flex-col ml-auto justify-center items-center gap-2">
    {#if filters.docs[key]}
      <div class="text-xs text-center opacity-30">
        {filters.docs[key] === "Submitted" ? "Sub" : "Not Sub"}
      </div>
    {/if}
    <input
      disabled={!enabled}
      type="checkbox"
      class="toggle"
      bind:checked={submitted}
    />
  </div>
</div>
