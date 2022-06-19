<script>
  export let header = "";
  export let options = [];
  export let value = "";
</script>

<div class="flex flex-col gap-1">
  <label for="..">{header}</label>
  <select bind:value class="select w-full  bg-purple-50">
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</div>
