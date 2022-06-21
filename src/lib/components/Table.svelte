<script>
  import dayjs from "dayjs";

  import { editingModalOpen, nowEditing, selectedIDs } from "../store/store";
  export let data = [];
  $: {
    if ($nowEditing) {
      console.log($nowEditing);
      console.log($nowEditing.docs.find((item) => item.docname === "10th"));
    }
  }
</script>

<table class="w-full  border-separate">
  <tr class="bg-slate-50 border-none">
    <th class="p-3 font-bold capitalize text-left" />
    <th class="p-3 font-bold capitalize text-left">Name</th>
    <th class="p-3 font-bold capitalize text-left">Branch</th>
    <th class="p-3 font-bold capitalize text-left">Stream</th>
    <th class="p-3 font-bold capitalize text-left">10th</th>
    <th class="p-3 font-bold capitalize text-left">12th</th>
    <th class="p-3 font-bold capitalize text-left">PCM Agg</th>
    <th class="p-3 font-bold capitalize text-left">TC</th>
    <th class="p-3 font-bold capitalize text-left">MIG</th>
    <th class="p-3 font-bold capitalize text-left">Contact</th>
    <th class="p-3 font-bold capitalize text-left">Gender</th>
    <th class="p-3 font-bold capitalize text-left">DOB</th>
    <th class="p-3 font-bold capitalize text-left" />
  </tr>

  {#each data as student}
    <tr>
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
      <td class="border p-3 w-1/6">{student.name}</td>
      <td class="border p-3 w-1/12 max-w-[10px]">{student.branch} </td>
      <td class="border p-3 w-9">{student.stream}</td>

      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "10th") ? "✅" : "❌"}
      </td>
      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "12th") ? "✅" : "❌"}
      </td>

      <td class="border p-3 w-[10px]">{student.grade.pcmagg}</td>
      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "TC") ? "✅" : "❌"}
      </td>
      <td class="border p-3 w-[10px]">
        {student.docs.find((item) => item.docname === "MIG") ? "✅" : "❌"}
      </td>

      <td class="border p-3 max-w-[20px]"
        >{[
          `${student.phonenumber}(Student) `,
          ...student.relations.map(
            (item) => `${item.phonenumber}(${item.relationType}) `
          ),
        ]}</td
      >
      <td class="border p-3 w-[10px]">{student.gender}</td>
      <td class="border p-3 w-9">{dayjs(student.dob).format("DD/MM/YYYY")}</td>
      <td class="border p-3 w-[10px]">
        <div class="flex items-center justify-center">
          <!-- svelte-ignore a11y-label-has-associated-control -->
          <button
            class="hover:bg-purple-100 hover:text-purple-500  p-3 rounded-xl transition-all"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <div
            class="dropdown dropdown-end p-3 rounded-xl  hover:bg-purple-100"
          >
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label tabindex="0" class=" hover:text-purple-500  transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li
                on:click={() => {
                  console.log("edit");
                  editingModalOpen.set(true);
                  nowEditing.set(student);
                }}
                class="p-3 cursor-pointer hover:bg-purple-100 hover:text-purple-500"
              >
                Update
              </li>
              <li
                class="p-3 cursor-pointer hover:bg-red-100 hover:text-red-500"
              >
                Delete
              </li>
            </ul>
          </div>
        </div>
      </td>
    </tr>
  {/each}
</table>
