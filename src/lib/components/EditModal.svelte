<script>
  import { editingModalOpen, nowEditing } from "../store/store";
  export let updateData = (id) => {};
</script>

<!-- Put this part before </body> tag -->
<input
  type="checkbox"
  checked={$editingModalOpen}
  id="editModal"
  class="modal-toggle"
/>
{#if $nowEditing}
  <div class="modal">
    <div class="modal-box relative">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        on:click={() => {
          editingModalOpen.set(false);
        }}
        class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
      >
      <h3 class="text-lg font-bold">Editing {$nowEditing.name}</h3>
      <p class="py-4">
        <input
          type="text"
          class="input-bordered input"
          bind:value={$nowEditing.name}
        />
        <button
          on:click={() => {
            // server call
            updateData($nowEditing.sid);
          }}
          class="btn"
        >
          Save</button
        >
      </p>
    </div>
  </div>
{/if}
