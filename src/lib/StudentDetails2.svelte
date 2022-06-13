<script>
  import Options from "./components/Options.svelte";
  import Input from "./components/Input.svelte";
  import swal from "sweetalert";
  import Grid from "gridjs-svelte";
  import Navbar from "./components/Navbar.svelte";
  import { SvelteWrapper } from "gridjs-svelte/plugins";
  import { onMount } from "svelte";
  import ActionButton from "./components/ActionButton.svelte";
  import { editingModalOpen, selectedID } from "./store/store";
  import PhoneInput from "./components/PhoneInput.svelte";

  let data = [
    {
      name: "John",
      branch: "CSE",
      gender: "M",
      stream: "Prof",
      dob: "1/2/2",
      agg: "10",
      submitted10th: true,
      submitted12th: false,
      submittedTC: false,
      submittedMigration: false,
      others: "",
      id: "11",
      phonenumbers: [
        { number: "333333123", name: "father" },
        { number: "333333124", name: "mother" },
      ],
    },
    {
      name: "Aohn",
      branch: "CSE",
      gender: "M",
      stream: "Global",
      dob: "1/2/2",
      agg: "10",
      submitted10th: true,
      submitted12th: false,
      submittedTC: false,
      submittedMigration: false,
      others: "",
      id: "1",
      phonenumbers: [
        { number: "333333123", name: "father" },
        { number: "333333124", name: "mother" },
      ],
    },
  ];
  let cols = [
    {
      name: "si",
      hidden: true,
      data: (row) => {
        return row.id;
      },
    },
    { name: "name" },
    { name: "branch" },
    { name: "gender" },
    { name: "stream" },
    { name: "dob" },
    { name: "agg" },
    {
      name: "10th",
      data: (row) => {
        return row.submitted10th ? "✅" : "❌";
      },
    },
    {
      name: "12th",
      data: (row) => {
        return row.submitted12th ? "✅" : "❌";
      },
    },
    {
      name: "TC",
      data: (row) => {
        return row.submittedTC ? "✅" : "❌";
      },
    },
    {
      name: "MIG",
      data: (row) => {
        return row.submittedMigration ? "✅" : "❌";
      },
    },
    { name: "others" },

    {
      name: "action",
      plugin: {
        component: SvelteWrapper,
        props: {
          component: ActionButton,
        },
      },
    },
  ];
  let selectedStudentData = {};
  $: {
    selectedStudentData = data.find((d) => d.id === $selectedID);
  }
  $: {
    console.log(selectedStudentData);
  }
</script>

<input
  type="checkbox"
  checked={$editingModalOpen}
  id="editModal"
  on:change={(e) => {
    // @ts-ignore
    editingModalOpen.set(e.target.checked);
  }}
  class="modal-toggle"
/>
{#if selectedStudentData}
  <label class="modal" for="editModal">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="modal-box relative max-w-7xl">
      <label
        for="editModal"
        class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
      >
      <h3 class="font-bold text-lg">
        Editing {selectedStudentData.name}
      </h3>
      <div class="py-4">
        <form class="flex flex-col gap-3">
          <div class="flex w-full gap-3">
            <Input header="Name" bind:value={selectedStudentData.name} />
            <Options />
            <Options />
          </div>
          <div>
            <div class="divider opacity-40">Contact Details</div>
            <div class="flex w-full flex-col gap-3">
              <div class="flex items-center justify-between">
                <div>Phone Number</div>
                <div
                  on:click={() => {
                    console.log("clicked");
                    selectedStudentData.phonenumbers.push({
                      number: "",
                      name: "",
                    });
                    selectedStudentData.phonenumbers = [
                      ...selectedStudentData.phonenumbers,
                    ];
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                {#if selectedStudentData.phonenumbers.length > 0}
                  {#each selectedStudentData.phonenumbers as { number, name }}
                    <div class="flex items-center gap-3">
                      <PhoneInput bind:contactname={name} bind:number />
                      <svg
                        on:click={() => {
                          selectedStudentData.phonenumbers.splice(
                            selectedStudentData.phonenumbers.indexOf({
                              number,
                              name,
                            }),
                            1
                          );
                          selectedStudentData.phonenumbers = [
                            ...selectedStudentData.phonenumbers,
                          ];
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 hover:text-red-500 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </div>
                  {/each}
                {:else}
                  <div class="p-2 col-span-2 font-bold opacity-50 text-center">
                    No phone number to show
                  </div>
                {/if}
              </div>
              <div class="my-3">
                <Input header="Email" bind:value={selectedStudentData.email} />
              </div>
            </div>
          </div>
          <div>
            <div class="divider opacity-40">Stream Information</div>
            <div class="grid grid-cols-3 gap-3">
              <div class="flex flex-col gap-1">
                <label for="..">Stream</label>
                <select class="select w-full  bg-purple-50">
                  <option disabled selected>Pick your favorite Simpson</option>
                  <option>Homer</option>
                  <option>Marge</option>
                  <option>Bart</option>
                  <option>Lisa</option>
                  <option>Maggie</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </label>
  </label>
{/if}

<section>
  <Navbar />
  <div class="p-3">
    <Grid {data} columns={cols} sort={true} resizable={true} search={true} />
  </div>
</section>
