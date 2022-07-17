<script>
  export let header = "";
  export let options = [];
  export let value = "";
  import {
    editMode,
    addModalOpen,
    editingModalOpen,
    filterModalOpen,
  } from "../store/store";
  let isDisabled = !$editMode
    ? $addModalOpen || $filterModalOpen
      ? false
      : $editingModalOpen
      ? true
      : false
    : false;
  $: {
    isDisabled = !$editMode
      ? $addModalOpen || $filterModalOpen
        ? false
        : $editingModalOpen
        ? true
        : false
      : false;
  }
</script>

<div class="flex flex-col gap-1">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="opacity-50 text-sm">{header}</label>
  <select
    disabled={isDisabled}
    id={header}
    bind:value
    class="select w-full select-bordered"
  >
    {#each options as option}
      <option>{option}</option>
    {/each}
  </select>
</div>
