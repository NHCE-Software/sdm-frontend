<script>
  import { editingModalOpen, nowEditing } from "../store/store";
  import Input from "./Input.svelte";
  import Options from "./Options.svelte";
  export let updateData = (id) => {};
  let mode = "docs";
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
    <div class="modal-box relative max-w-5xl">
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label
        on:click={() => {
          editingModalOpen.set(false);
        }}
        class="btn btn-sm btn-circle absolute right-2 top-2">✕</label
      >
      <div class="text-lg font-bold flex  items-center">
        <div>Editing {$nowEditing.name}</div>
        <div class="tabs mx-10">
          <div
            on:click={() => (mode = "general")}
            class={`tab ${mode === "general" ? "tab-active" : ""}`}
          >
            General
          </div>
          <div
            on:click={() => (mode = "relation")}
            class={`tab ${mode === "relation" ? "tab-active" : ""}`}
          >
            Relations
          </div>
          <div
            on:click={() => (mode = "grade")}
            class={`tab ${mode === "grade" ? "tab-active" : ""}`}
          >
            Grade
          </div>
          <div
            on:click={() => (mode = "docs")}
            class={`tab ${mode === "docs" ? "tab-active" : ""}`}
          >
            Documents
          </div>
        </div>
      </div>
      {#if mode === "general"}
        <div class="py-3 flex flex-col">
          <div class="flex  gap-2">
            <Input header="Name" bind:value={$nowEditing.name} />
            <Input
              type="date"
              header="Date of Birth"
              bind:value={$nowEditing.dob}
            />
            <Options
              header="Gender"
              options={["Male", "Female"]}
              bind:value={$nowEditing.gender}
            />
          </div>
          <div class="my-4 grid grid-cols-4 gap-3">
            <Input header="Phone Number" bind:value={$nowEditing.phonenumber} />
            <Input
              header="Email"
              type="email"
              bind:value={$nowEditing.emailid}
            />
            <Input header="Branch" bind:value={$nowEditing.branch} />
            <Options
              header="Stream"
              options={["Professional", "Global"]}
              bind:value={$nowEditing.stream}
            />
            <Input header="Religion" bind:value={$nowEditing.religion} />
            <Input header="Caste" bind:value={$nowEditing.caste} />
            <Input header="Nationality" bind:value={$nowEditing.nationality} />
            <Input
              header="Mother Tongue"
              bind:value={$nowEditing.mothertongue}
            />
          </div>
          <div class="divider">Internal Information</div>
          <div class="my-4 grid grid-cols-3 gap-3">
            <Input header="BS #" bind:value={$nowEditing.internal.bsno} />
            <Input
              header="Enquiry Number"
              bind:value={$nowEditing.internal.enqno}
            />
            <Input
              type="date"
              header="Date of Admission"
              bind:value={$nowEditing.internal.dateofadmission}
            />
          </div>
          <div class="divider">Address Information</div>
          <div class="my-4 flex flex-col gap-3">
            <div class="grid grid-cols-3 gap-3">
              <Input header="City" bind:value={$nowEditing.address.city} />
              <Input header="State" bind:value={$nowEditing.address.state} />
              <Input
                header="Pin Code"
                bind:value={$nowEditing.address.pincode}
              />
            </div>
            <div class="flex gap-3">
              <Input
                type="area"
                header="Permanent Address"
                bind:value={$nowEditing.address.permanentAddress}
              />
              <Input
                type="area"
                header="Communication Address"
                bind:value={$nowEditing.address.communicationAddress}
              />
            </div>
          </div>
        </div>
      {/if}
      {#if mode === "relation"}
        <div class="py-3 grid grid-cols-2 gap-3">
          {#each $nowEditing.relations as relation, index}
            <div class="border p-3 rounded-xl">
              <div class="flex justify-between text-xl font-bold my-2">
                <div>Relation #{index + 1}</div>
                <div
                  on:click={() => {
                    if (confirm("Are you sure you want to delete?")) {
                      $nowEditing.relations.splice(index, 1);
                      $nowEditing.relations = [...$nowEditing.relations];
                    }
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <Input header="Name" bind:value={relation.name} />

                <Input
                  header="Relation Type"
                  bind:value={relation.relationType}
                />
                <Input header="Email" bind:value={relation.emailid} />
                <Input
                  header="Phone Number"
                  bind:value={relation.phonenumber}
                />
                <Input
                  header="Landline Number"
                  bind:value={relation.landline}
                />
                <Input header="Occupation" bind:value={relation.occupation} />
                <Input header="Occupation" bind:value={relation.income} />
              </div>
            </div>
          {/each}
          <div
            on:click={() => {
              $nowEditing.relations.push({
                name: "",
                relationType: "",
                emailid: "",
                phonenumber: "",
                landline: "",
                occupation: "",
                income: "",
              });
              $nowEditing = { ...$nowEditing };
            }}
            class="bg-purple-50 hover:text-purple-500 hover:bg-purple-100 transition-all delay-100 flex justify-center items-center rounded-2xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
        </div>
      {/if}
      {#if mode === "grade"}
        <div class="py-3 grid grid-cols-3 gap-3">
            <Input
                header="College Name"
                bind:value={$nowEditing.grade.collName12}
            />
            <Input
              header="Board"
              bind:value={$nowEditing.grade.board12}
            />
            <Input
              header="State"
              bind:value={$nowEditing.grade.state12}
            />
            <Input
              header="Year of Passing"
              bind:value={$nowEditing.grade.yearofpassing12}
            />
            <Input
            header="PCM percentage"
            bind:value={$nowEditing.grade.pcmpercent}
          />
          <Input
          header="PCM Aggregate"
          bind:value={$nowEditing.grade.pcmagg}
        />
        <Input
        header="Reg number"
        bind:value={$nowEditing.grade.regno}
        />
      

      

        </div>
        <div class="divider">Marks Information</div>
        <div class="grid grid-cols-3 gap-3">
          <Input
          header="Maths "
          bind:value={$nowEditing.grade.marks.maths}
              />
              <Input
          header="physics"
          bind:value={$nowEditing.grade.marks.physics}
              />
              <Input
          header="Chemistry"
          bind:value={$nowEditing.grade.marks.chemistry}
              />
              <Input
          header="Computers"
          bind:value={$nowEditing.grade.marks.computer}
              />
              <Input
          header="Biology"
          bind:value={$nowEditing.grade.marks.bio}
              />
              <Input
          header="Electronics"
          bind:value={$nowEditing.grade.marks.electronics}
              />
        </div>
      {/if}
      {#if mode === "docs"}
        <div class="py-3">
Documents
        </div>
      {/if}
      <button
        on:click={() => {
          // server call
          updateData($nowEditing.sid);
        }}
        class="btn mt-5 w-full"
      >
        Save</button
      >
    </div>
  </div>
{/if}
