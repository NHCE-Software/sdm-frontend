<script>
  import { detailsModalOpen } from "../store/store";
</script>

<input
  type="checkbox"
  checked={$detailsModalOpen}
  id="detailsmodal"
  class="modal-toggle"
/>

<div class="modal">
  <div class="modal-box relative">
    <label
      on:click={() => {
        detailsModalOpen.set(false);
      }}
      class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
    >
    <h3 class="font-bold text-lg">Congratulations random Internet user!</h3>
    <p class="py-4">
      You've been selected for a chance to get one year of subscription to use
      Wikipedia for free!
    </p>
  </div>
</div>
