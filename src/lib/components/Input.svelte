<script>
  export let type = "text";
  export let rows;
  export let header;
  export let value;
  import { addModalOpen, editingModalOpen, editMode } from "../store/store";
  let isDisabled = false;
  $: {
    isDisabled = !$editMode
      ? $addModalOpen
        ? false
        : $editingModalOpen
        ? true
        : false
      : false;
  }
</script>

{#if type === "date"}
  <div class="flex flex-col  gap-1">
    <label class="capitalize text-sm opacity-50" for={header}>{header}</label>

    <input
      disabled={isDisabled}
      id={header}
      bind:value
      type="date"
      class="input  input-bordered"
      placeholder={header}
    />
  </div>
{:else if type === "email"}
  <div class="flex flex-col  gap-1">
    <label class="capitalize text-sm opacity-50" for={header}>{header}</label>

    <input
      disabled={isDisabled}
      id={header}
      bind:value
      type="email"
      class="input input-bordered"
      placeholder={header}
    />
  </div>
{:else if type === "area"}
  <div class="flex flex-col flex-1 gap-1">
    <label class="capitalize text-sm opacity-50" for={header}>{header}</label>

    <textarea
      disabled={isDisabled}
      placeholder={header}
      id={header}
      bind:value
      rows={rows || 0}
      class=" textarea textarea-bordered w-full flex-1"
      cols="30"
    />
  </div>
{:else}
  <div class="flex flex-col flex-1 gap-1">
    <label class="capitalize text-sm opacity-50" for={header}>{header}</label>

    <input
      disabled={isDisabled}
      id={header}
      bind:value
      type="text"
      class="input capitalize input-bordered"
      placeholder={header}
    />
  </div>
{/if}
