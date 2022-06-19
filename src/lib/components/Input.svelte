<script>
  export let type = "text";
  export let header;
  export let value;
</script>

{#if type === "date"}
  <div class="flex flex-col  gap-1">
    <label class="capitalize text-sm opacity-50" for={header}>{header}</label>
    <input
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
      id={header}
      bind:value
      class=" textarea textarea-bordered w-full flex-1"
      cols="30"
    />
  </div>
{:else}
  <div class="flex flex-col flex-1 gap-1">
    <label class="capitalize text-sm opacity-50" for={header}>{header}</label>
    <input
      id={header}
      bind:value
      type="text"
      class="input capitalize input-bordered"
      placeholder={header}
    />
  </div>
{/if}
