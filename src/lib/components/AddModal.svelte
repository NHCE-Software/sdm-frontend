<script>
  import { addModalOpen } from "../store/store";
  import Input from "./Input.svelte";
  import Options from "./Options.svelte";
  let newData = {
    sid: "",
    name: "",
    stream: "",
    branch: "",
    gender: "",
    dob: "",
    religion: "",
    nationality: "",
    mothertongue: "",
    caste: "",
    phonenumber: "",
    emailid: "",
    studentpic: "",
    remarks: "",
    internal: {
      bsno: "",
      enqno: "",
      dateofadmission: "",
    },
    income: "",
    address: {
      city: "",
      state: "",
      country: "",
      pincode: "",
      permanentAddress: "",
      communicationAddress: "",
    },
    grade: {
      collName12: "",
      board12: "",
      state12: "",
      yearofpassing12: "",
      pcmscore: "",
      modeofcal: "",
      overallpercentorcgpa: "",
      regno: "",
      qualipassed: "",
      marks: {
        maths: "",
        physics: "",
        chemistry: "",
        electronics: "",
        computer: "",
        bio: "",
      },
    },
    docs: [],
    docsdue: "",
    relations: [],
  };
  let mode = "grade";
  let doctypes = ["10th", "12th", "TC", "MIG"];
  let tempoptions = [...doctypes, "Others"];
  let temppcmscore = 0.0;
  $: {
    let m = parseInt(newData.grade.marks.maths || "0");
    let p = parseInt(newData.grade.marks.physics || "0");
    let c = parseInt(newData.grade.marks.chemistry || "0");
    temppcmscore = (m + c + p) / 3;
  }
</script>

<input
  type="checkbox"
  checked={$addModalOpen}
  id="addModal"
  class="modal-toggle"
/>

<div class="modal">
  <div class="modal-box relative flex flex-col max-w-5xl h-5/6">
    <!-- svelte-ignore a11y-label-has-associated-control -->

    <div class="text-lg font-bold flex  items-center justify-between">
      <div class="flex items-center gap-3">
        <div>Add a new record</div>
      </div>
      <div class="tabs">
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
      <label
        on:click={() => {
          addModalOpen.set(false);
        }}
        class="btn btn-sm btn-circle ">✕</label
      >
    </div>
    {#if mode === "general"}
      <div class="py-3 flex flex-col">
        <div class="flex  gap-2">
          <Input header="Name" bind:value={newData.name} />
          <Input type="date" header="Date of Birth" bind:value={newData.dob} />
          <Options
            header="Gender"
            options={["Male", "Female"]}
            bind:value={newData.gender}
          />
        </div>
        <div class="my-4 grid grid-cols-4 gap-3">
          <Input header="Phone Number" bind:value={newData.phonenumber} />
          <Input header="Email" type="email" bind:value={newData.emailid} />
          <Input header="Branch" bind:value={newData.branch} />
          <Options
            header="Stream"
            options={["Professional", "Global"]}
            bind:value={newData.stream}
          />
          <Input header="Religion" bind:value={newData.religion} />
          <Input header="Caste" bind:value={newData.caste} />
          <Input header="Nationality" bind:value={newData.nationality} />
          <Input header="Mother Tongue" bind:value={newData.mothertongue} />
        </div>
        <div class="divider">Internal Information</div>
        <div class="my-4 grid grid-cols-3 gap-3">
          <Input header="BS #" bind:value={newData.internal.bsno} />
          <Input header="Enquiry Number" bind:value={newData.internal.enqno} />
          <Input
            type="date"
            header="Date of Admission"
            bind:value={newData.internal.dateofadmission}
          />
        </div>
        <div class="divider">Address Information</div>
        <div class="my-4 flex flex-col gap-3">
          <div class="grid grid-cols-3 gap-3">
            <Input header="City" bind:value={newData.address.city} />
            <Input header="State" bind:value={newData.address.state} />
            <Input header="Pin Code" bind:value={newData.address.pincode} />
          </div>
          <div class="flex gap-3">
            <Input
              type="area"
              header="Permanent Address"
              bind:value={newData.address.permanentAddress}
            />
            <Input
              type="area"
              header="Communication Address"
              bind:value={newData.address.communicationAddress}
            />
          </div>
        </div>
      </div>
    {/if}
    {#if mode === "relation"}
      <div class="mt-3">
        <Input header="Overall Income" bind:value={newData.income} />
      </div>
      <div class="py-3 grid grid-cols-2 gap-3">
        {#each newData.relations as relation, index}
          <div class="border p-3 rounded-xl">
            <div class="flex justify-between text-xl font-bold my-2">
              <div>Relation #{index + 1}</div>
              <div
                on:click={() => {
                  if (confirm("Are you sure you want to delete?")) {
                    newData.relations.splice(index, 1);
                    newData.relations = [...newData.relations];
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
              <Input header="Phone Number" bind:value={relation.phonenumber} />
              <Input header="Landline Number" bind:value={relation.landline} />
              <Input header="Occupation" bind:value={relation.occupation} />
            </div>
          </div>
        {/each}

        <div
          on:click={() => {
            newData.relations.push({
              name: "",
              relationType: "",
              phonenumber: "",
              landline: "",
              occupation: "",
            });
            newData = { ...newData };
          }}
          class=" cursor-pointer border  p-5 hover:text-purple-500  hover:bg-purple-100 transition-all delay-100 flex justify-center items-center rounded-2xl"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <div class="font-bold">Add a relation</div>
        </div>
      </div>
    {/if}
    {#if mode === "grade"}
      <div class="py-3 grid grid-cols-3 gap-3">
        <Input header="College Name" bind:value={newData.grade.collName12} />
        <Input header="Board" bind:value={newData.grade.board12} />
        <Input header="State" bind:value={newData.grade.state12} />
        <Input
          header="Year of Passing"
          bind:value={newData.grade.yearofpassing12}
        />
        <Input
          header="PCM Agg/Percentage"
          bind:value={newData.grade.overallpercentorcgpa}
        />
        <Options
          header="PCM Mode of Calculation"
          options={["Percentage", "CGPA"]}
          bind:value={newData.grade.modeofcal}
        />
        <Input header="Reg number" bind:value={newData.grade.regno} />
        <Input header="Exams Passed" bind:value={newData.grade.qualipassed} />
      </div>
      <div class="divider">Marks Information (on 100)</div>
      <div class="grid grid-cols-3 gap-3">
        <Input header="Maths " bind:value={newData.grade.marks.maths} />
        <Input header="physics" bind:value={newData.grade.marks.physics} />
        <Input header="Chemistry" bind:value={newData.grade.marks.chemistry} />
        <Input header="Computers" bind:value={newData.grade.marks.computer} />
        <Input header="Biology" bind:value={newData.grade.marks.bio} />
        <Input
          header="Electronics"
          bind:value={newData.grade.marks.electronics}
        />
      </div>

      <div class="divider mt-5">Calulated score</div>
      <div class="grid grid-cols-2 mt-5 gap-10 ">
        <div>
          Calculated PCM score is an absolute standardized score for all the
          students on the platform. This score is calculated by averaging their
          pcm marks.
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
          <Input header="Documents Due" bind:value={newData.docsdue} />
        </div>
        <div class="divider">Submitted Document Records</div>
        <div class=" gap-3 grid grid-cols-3 py-3">
          {#each newData.docs as d, index}
            <div class="p-3 border flex flex-col rounded-2xl">
              <div class="flex justify-between">
                <div class="text-xl font-bold mb-4">Document {index + 1}</div>

                <svg
                  on:click={() => {
                    if (confirm("Are you sure you want to delete this?")) {
                      newData.docs.splice(index, 1);
                      newData = { ...newData };
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
          <div
            on:click={() => {
              newData.docs.push({
                docname: "",
                docothername: "",
              });
              newData = { ...newData };
            }}
            class="p-5 flex rounded-2xl hover:bg-purple-100 hover:text-purple-500 font-bold transition-all border justify-center items-center cursor-pointer"
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <div>Add a Document</div>
          </div>
        </div>
      </div>
    {/if}
    <button
      on:click={() => {
        // server call
        console.log(newData);
      }}
      class="btn mt-auto w-full "
    >
      Save</button
    >
  </div>
</div>
