<script>
  export let header;
  export let value;
</script>

<div class="flex flex-col flex-1 gap-1">
  <label class="capitalize" for={header}>{header}</label>
  <input
    id={header}
    bind:value
    type="text"
    class="input capitalize input-bordered"
    placeholder={header}
  />
</div>
