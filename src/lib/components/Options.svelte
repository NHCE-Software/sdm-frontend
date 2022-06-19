<script>
  export let header = "";
  export let options = [];
  export let value = "";
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="opacity-50">{header}</label>
  <select id={header} bind:value class="select w-full select-bordered">
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</div>
