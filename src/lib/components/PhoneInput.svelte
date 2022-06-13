<script>
  export let contactname;
  export let number;
</script>

<div class="flex flex-col flex-1 gap-1">
  <label class="input-group  ">
    <input
      id="Contact Name"
      bind:value={contactname}
      type="text"
      class="input capitalize bg-purple-700 font-bold w-fit text-white  input-bordered"
      placeholder="Contact Name"
    />
    <input
      id="phonenumber"
      bind:value={number}
      type="text"
      class="input capitalize w-full input-bordered"
      placeholder="Phone Number"
    />
    
  </label>
</div>
