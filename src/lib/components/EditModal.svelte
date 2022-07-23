<script>
  // @ts-nocheck

  import axios from "axios";
  import swal from "sweetalert";
  import {
    editMode,
    editingModalOpen,
    nowEditing,
    baseurl,
  } from "../store/store";
  import Input from "./Input.svelte";
  import Options from "./Options.svelte";
  export let updateData = (id) => {};
  let mode = "general";
  let doctypes = ["10th", "12th", "TC", "MIG"];
  let tempoptions = [...doctypes, "Others"];
  let temppcmscore;
  if ($nowEditing) temppcmscore = $nowEditing.grade.pcmscore;
  $: {
    if ($nowEditing) {
      let m = parseInt($nowEditing.grade.marks.maths || "0");
      let p = parseInt($nowEditing.grade.marks.physics || "0");
      let c = parseInt($nowEditing.grade.marks.chemistry || "0");
      let e = parseInt($nowEditing.grade.marks.electronics || "0");
      let cp = parseInt($nowEditing.grade.marks.computer || "0");
      let b = parseInt($nowEditing.grade.marks.bio || "0");
      let o = parseInt($nowEditing.grade.marks.others || "0");
      temppcmscore = (m + c + p + e + cp + b + o) / 3;
      $nowEditing.grade.pcmscore = temppcmscore;
    }
  }
</script>

<input
  type="checkbox"
  checked={$editingModalOpen}
  id="editModal"
  class="modal-toggle"
/>
{#if $nowEditing}
  <div class="modal">
    <div class="modal-box relative flex flex-col max-w-5xl h-5/6">
      <!-- svelte-ignore a11y-label-has-associated-control -->

      <div class="text-lg font-bold flex  items-center justify-between">
        <div class="flex items-center gap-3">
          <label
            on:click={() => {
              editingModalOpen.set(false);
            }}
            class="btn btn-sm btn-circle ">✕</label
          >
          <div>{$editMode ? "Editing" : ""} {$nowEditing.name}</div>
        </div>
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
          <div
            on:click={() => (mode = "remarks")}
            class={`tab ${mode === "remarks" ? "tab-active" : ""}`}
          >
            Remarks
          </div>
        </div>
        <div class="flex gap-3 items-center">
          {#if !$editMode}
            <label for="edit-toggle" class="text-sm text-gray-500"
              >Edit Mode Disabled</label
            >
          {:else}
            <label for="edit-toggle" class="text-sm ">Edit Mode Enabled</label>
          {/if}
          <input
            id="edit-toggle"
            type="checkbox"
            class="toggle toggle-sm"
            bind:checked={$editMode}
          />
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
        <div class="mt-3">
          <Input header="Overall Income" bind:value={$nowEditing.income} />
        </div>
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
                  {#if $editMode}
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
                  {/if}
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <Input header="Name" bind:value={relation.name} />
                <Input
                  header="Relation Type"
                  bind:value={relation.relationType}
                />
                <Input
                  header="Phone Number"
                  bind:value={relation.phonenumber}
                />
                <Input
                  header="Landline Number"
                  bind:value={relation.landline}
                />
                <Input header="Occupation" bind:value={relation.occupation} />
              </div>
            </div>
          {/each}
          {#if $editMode}
            <div
              on:click={() => {
                $nowEditing.relations.push({
                  name: "",
                  relationType: "",
                  phonenumber: "",
                  landline: "",
                  occupation: "",
                });
                $nowEditing = { ...$nowEditing };
              }}
              class="bg-purple-50 hover:text-purple-500  hover:bg-purple-100 transition-all delay-100 flex justify-center items-center rounded-2xl"
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
              <div>Add a relation</div>
            </div>
          {/if}
        </div>
      {/if}
      {#if mode === "grade"}
        <div class="py-3 grid grid-cols-3 gap-3">
          <Input
            header="College Name"
            bind:value={$nowEditing.grade.collName12}
          />
          <Input header="Board" bind:value={$nowEditing.grade.board12} />
          <Input header="State" bind:value={$nowEditing.grade.state12} />
          <Input
            header="Year of Passing"
            bind:value={$nowEditing.grade.yearofpassing12}
          />
          <Input
            header="PCM Agg/Percentage"
            bind:value={$nowEditing.grade.overallpercentorcgpa}
          />
          <Options
            header="PCM Mode of Calculation"
            options={["Percentage", "CGPA"]}
            bind:value={$nowEditing.grade.modeofcal}
          />
          <Input header="Reg number" bind:value={$nowEditing.grade.regno} />
          <Input
            header="Exams Passed"
            bind:value={$nowEditing.grade.qualipassed}
          />
        </div>
        <div class="divider">Marks Information (on 100)</div>
        <div class="grid grid-cols-3 gap-3">
          <Input header="Maths " bind:value={$nowEditing.grade.marks.maths} />
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
          <Input header="Biology" bind:value={$nowEditing.grade.marks.bio} />
          <Input
            header="Electronics"
            bind:value={$nowEditing.grade.marks.electronics}
          />
          <Input header="Others" bind:value={$nowEditing.grade.marks.others} />
        </div>

        <div class="divider mt-5">Calulated score</div>
        <div class="grid grid-cols-2 mt-5 gap-10 ">
          <div>
            Calculated score is an absolute standardized score for all the
            students on the platform. This score calculated by averaging 3 marks
            (any subject) of the student .
          </div>
          <div
            class="bg-purple-300 text-purple-600  text-center text-3xl  rounded-2xl p-5"
          >
            {temppcmscore.toFixed(2)}
          </div>

          <div />
        </div>
      {/if}
      {#if mode === "docs"}
        <div class="py-3">
          <div class="py-5">
            <Input header="Documents Due" bind:value={$nowEditing.docsdue} />
          </div>
          <div class="divider">Document Records</div>
          <div class=" gap-3 grid grid-cols-3 py-3">
            {#each $nowEditing.docs as d, index}
              <div class="p-3 border flex flex-col rounded-2xl">
                <div class="flex justify-between">
                  <div class="text-xl font-bold mb-4">Document {index + 1}</div>
                  {#if $editMode}
                    <svg
                      on:click={() => {
                        if (confirm("Are you sure you want to delete this?")) {
                          $nowEditing.docs.splice(index, 1);
                          $nowEditing = { ...$nowEditing };
                        }
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 hover:text-red-500"
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
                  {/if}
                </div>
                <Options
                  header="Document Type"
                  options={tempoptions}
                  bind:value={d.docname}
                />
                <div class="mt-3">
                  {#if d.docname === "Others"}
                    <Input header="Document Name" bind:value={d.docothername} />
                  {/if}
                </div>
              </div>
            {/each}
            {#if $editMode}
              <div
                on:click={() => {
                  $nowEditing.docs.push({
                    docname: "",
                    docothername: "",
                  });
                  $nowEditing = { ...$nowEditing };
                }}
                class="p-3 flex rounded-2xl hover:bg-purple-300 hover:text-purple-600 font-bold transition-all border justify-center items-center cursor-pointer"
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
                <div>Add a Document</div>
              </div>{/if}
          </div>
        </div>
      {/if}
      {#if mode === "remarks"}
        <div class="py-3">
          <div class=" gap-3 grid  py-3">
            <Input header="Remark" bind:value={$nowEditing.remark} />
            <Input
              type="area"
              header="Notes"
              rows={12}
              bind:value={$nowEditing.notes}
            />
          </div>
        </div>
      {/if}
      <button
        disabled={!$editMode}
        on:click={async () => {
          // server call
          console.log($nowEditing);
          updateData($nowEditing.sid);

          const body = {
            query: `mutation LeadUpdateOne($record: UpdateOneStudentInput!, $filter: FilterUpdateOneStudentInput) {
                      leadUpdateOne(record: $record, filter: $filter) {
                        recordId
                      }
                    }`,

            variables: {
              record: {
                name: $nowEditing.name,
                stream: $nowEditing.stream,
                branch: $nowEditing.branch,
                gender: $nowEditing.gender,
                dob: $nowEditing.dob,
                religion: $nowEditing.religion,
                nationality: $nowEditing.nationality,
                mothertongue: $nowEditing.mothertongue,
                caste: $nowEditing.caste,
                phonenumber: $nowEditing.phonenumber,
                emailid: $nowEditing.emailid,
                remark: $nowEditing.remark,
                notes: $nowEditing.notes,
                internal: {
                  dateofadmission: $nowEditing.internal.dateofadmission,
                  enqno: $nowEditing.internal.enqno,
                  bsno: $nowEditing.internal.bsno,
                },
                relations: [...$nowEditing.relations],
                grade: {
                  ...$nowEditing.grade,
                  marks: { ...$nowEditing.grade.marks },
                  pcmscore: temppcmscore,
                },
                address: { ...$nowEditing.address },

                income: $nowEditing.income,
                docsdue: $nowEditing.docsdue,
                docs: [...$nowEditing.docs],
              },
              filter: {
                _id: $nowEditing.sid,
              },
            },
          };

          const res = await axios.post($baseurl, body);
          console.log(res.data);
          if (res.data.data.leadUpdateOne.recordId)
            swal("Update Successful", "Changes have be saved", "success");
          else
            swal(
              "Update Unsuccessful",
              "Changes have be not been saved",
              "error"
            );
        }}
        class="btn mt-auto w-full "
      >
        Save</button
      >
    </div>
  </div>
{/if}

<style>
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    @apply bg-purple-200;
  }

  ::-webkit-scrollbar-thumb {
    @apply rounded-full bg-purple-500;
  }
</style>
