<script>
  import dayjs from "dayjs";
  import swal from "sweetalert";

  import {
    editingModalOpen,
    editMode,
    nowEditing,
    selectedIDs,
  } from "../store/store";
  export let data = [];
</script>

<table class="w-full  border-separate">
  <tr class="bg-slate-50 border-none">
    <th class="p-3 font-bold capitalize text-left" />
    <th class="p-3 font-bold capitalize text-left">Name</th>
    <th class="p-3 font-bold capitalize text-left">Branch</th>
    <th class="p-3 font-bold capitalize text-left">Stream</th>
    <th class="p-3 font-bold capitalize text-left">10th</th>
    <th class="p-3 font-bold capitalize text-left">12th</th>
    <th class="p-3 font-bold capitalize text-left">Score</th>
    <th class="p-3 font-bold capitalize text-left">TC</th>
    <th class="p-3 font-bold capitalize text-left">MIG</th>
    <th class="p-3 font-bold capitalize text-left">Contact</th>
    <th class="p-3 font-bold capitalize text-left">Gender</th>
    <th class="p-3 font-bold capitalize text-left">DOB</th>
    <th class="p-3 font-bold capitalize text-left" />
  </tr>

  {#each data as student}
    <tr
      class={`${
        student.grade.pcmscore && student.grade.pcmscore < 45
          ? "bg-red-100"
          : ""
      }`}
    >
      <td class="border p-3 w-[10px]">
        <div class="flex items-center justify-center">
          <input
            on:change={() => {
              if ($selectedIDs.includes(student.sid)) {
                // remove from selectedIDs
                selectedIDs.set(
                  $selectedIDs.filter((id) => id !== student.sid)
                );
              } else {
                // add to selectedIDs
                selectedIDs.set([...$selectedIDs, student.sid]);
              }
            }}
            type="checkbox"
            class="checkbox"
          />
        </div>
      </td>
      <td class="border p-3 w-1/6">
        <div class="avatar flex items-center gap-5">
          <!-- <div class="w-10 rounded-full">
            <img alt="dp" src={student.studentpic} />
          </div> -->
          {student.name}
        </div>
      </td>
      <td class="border p-3 w-1/12 max-w-[10px]">{student.branch} </td>
      <td class="border p-3 w-9">{student.stream}</td>

      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "10th") ? "✅" : "❌"}
      </td>
      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "12th") ? "✅" : "❌"}
      </td>

      <td class="border p-3 w-[10px]">{student.grade.pcmscore.toFixed(2)}</td>
      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "TC") ? "✅" : "❌"}
      </td>
      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "MIG") ? "✅" : "❌"}
      </td>

      <td class="border p-3 max-w-[20px]"
        >{[
          `${student.phonenumber}(Student) `,
          ...student.relations.map((item) => {
            if (item && item.phonenumber)
              return `${item.phonenumber}(${item.relationType})`;
          }),
        ]}</td
      >
      <td class="border p-3 w-[10px]">{student.gender}</td>
      <td class="border p-3 w-9">{dayjs(student.dob).format("DD/MM/YYYY")}</td>
      <td class="border p-3 w-[10px]">
        <div class="flex items-center justify-center gap-2">
          <div
            class="hover:text-purple-500  transition-all p-3 rounded-xl  hover:bg-purple-100"
            on:click={() => {
              //console.log("edit");
              editingModalOpen.set(true);
              nowEditing.set(student);
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </div>
          <div
            on:click={() => {
              swal(
                "Under construction",
                "Working on this feature maam",
                "info"
              );
            }}
            class="hover:text-purple-500  transition-all p-3 rounded-xl  hover:bg-purple-100"
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
      </td>
    </tr>
  {/each}
</table>
