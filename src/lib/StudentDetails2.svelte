<script>
  import Pagination from "./components/Pagination.svelte";

  import Table from "./components/Table.svelte";
  import loadinggif from "../assets/loading.gif";
  import Navbar from "./components/Navbar.svelte";
  import {
    addModalOpen,
    currentPage,
    maxRecordPerPage,
    maxPage,
    filterModalOpen,
    nowEditing,
    baseurl,
  } from "./store/store";
  import EditModal from "./components/EditModal.svelte";
  import AddModal from "./components/AddModal.svelte";
  import FilterModal from "./components/FilterModal.svelte";
  import { onMount } from "svelte";
  import axios from "axios";
  import Options from "./components/Options.svelte";

  async function fetchdata(mode) {
    console.log("Fetching", $currentPage, $maxPage);
    if (mode === "filter" || mode === "search") {
      // do not check for pages as the pages will change after applying filter
      // setting the page to 1st page
      $currentPage = 1;
    } else {
      //
      if ($currentPage <= 0) {
        $currentPage = 1;
        return;
      }

      if ($currentPage > $maxPage) {
        $currentPage = $maxPage;
        return;
      }
    }

    loading = true;
    //console.log($currentPage, $maxRecordPerPage);

    let newfilter = {
      // $and: [],
    };
    let and = [];

    for (const dd of Object.keys(filters.docs)) {
      //console.log(dd);
      and.push({
        "docs.docname":
          filters.docs[dd] === "Submitted" ? { $eq: dd } : { $ne: dd },
      });
    }

    if (and.length !== 0) newfilter["$and"] = and;
    newfilter["grade.pcmscore"] = {
      $gte: filters.score.lb,
      $lte: filters.score.ub,
    };
    console.log(filters);
    if (filters.board12) newfilter["grade.board12"] = filters.board12;
    if (filters.branch) newfilter["branch"] = filters.branch;
    if (filters.stream) newfilter["stream"] = filters.stream;
    if (search) newfilter[searchCategory] = { $regex: search, $options: "i" };

    console.log("NEWFILTER  : ", newfilter);
    const body = {
      query: `query Query($record: JSON) {
          getStudents(record: $record)
      }`,
      variables: {
        record: {
          page: $currentPage,
          limit: $maxRecordPerPage,
          filter: newfilter,
        },
      },
    };
    const res = await axios.post($baseurl, body);
    //console.log(res.data);
    $maxPage = res.data.data.getStudents.totalpages;
    datapoints = res.data.data.getStudents.totalrecords;
    data = res.data.data.getStudents.students;
    data = data.map((item) => {
      item.sid = item._id;
      return item;
    });
    //console.log(data[0]);
    loading = false;
  }
  onMount(async () => {
    await fetchdata();
  });

  let data = [];
  let search;
  let loading = false;
  let filters = { docs: {}, stream: "", branch: "" };
  let datapoints = 0;
  let filteroptions = {};
  let searchCategory = "name";
  let updateData = (sid) => {
    data = data.map((item) => {
      if (item.sid === sid) return $nowEditing;
      else return item;
    });

    data = [...data];
    //console.log(data);
  };
</script>

<FilterModal bind:filters {fetchdata} bind:filteroptions />
<AddModal {fetchdata} />
<EditModal {updateData} />
<section>
  <Navbar />
  <div class="p-5 flex  gap-3 w-full items-center">
    <div class="text-2xl font-bold">Student Details</div>

    <div class="form-control ml-auto ">
      <form
        on:submit|preventDefault={async () => {
          await fetchdata("search");
        }}
      >
        <div class="input-group">
          <select bind:value={searchCategory} class="select select-bordered">
            <option value="name">Name</option>
            <option value="phonenumber">Ph no</option>
            <option value="relations.name">Relation</option>
          </select>
          <input
            bind:value={search}
            type="text"
            placeholder="Search…"
            class="input input-bordered "
          />
          <button type="submit" class="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              /></svg
            >
          </button>
        </div>
      </form>
    </div>

    <div>
      <div class="flex flex-col gap-1 mx-6">
        <div class="flex gap-3">
          <div
            data-tip="Download All Data"
            class="tooltip tooltip-bottom bg-purple-200 rounded-full text-purple-500 p-3 text-center btn outline-none border-none hover:text-white"
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </div>
          <div
            data-tip="Download Selected Data"
            class="tooltip tooltip-bottom bg-purple-200 rounded-full text-purple-500 p-3 text-center btn outline-none border-none hover:text-white"
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
                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
              />
            </svg>
          </div>
          <div
            on:click={async () => {
              const body = {
                query: `query Query {
                          distinctValues
                        }`,
              };
              const { data } = await axios.post($baseurl, body);
              //console.log("bru", data);
              if (data) filteroptions = data.data.distinctValues;
              filterModalOpen.set(true);
            }}
            data-tip="Filter"
            class="tooltip tooltip-bottom bg-purple-200 rounded-full  text-purple-500 p-3 text-center btn outline-none border-none hover:text-white"
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
          </div>
          <div
            on:click={() => {
              //console.log("add");
              addModalOpen.set(true);
            }}
            data-tip="Add Single Lead"
            class="tooltip tooltip-bottom bg-purple-200 rounded-full px-6 text-purple-500 p-3 text-center btn outline-none border-none hover:text-white"
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
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="p-5 ">
    <Pagination {fetchdata} {datapoints} dis={data.length} />
    {#if loading}
      <div
        class="flex animate-bounce flex-col gap-5 justify-center items-center w-full h-96"
      >
        <img
          src={loadinggif}
          class="w-20 h-20 rounded-full
          "
          alt=""
          srcset=""
        />
        <div class="animate-pulse">Fetching data please wait...</div>
      </div>
    {:else}
      <Table bind:data />
    {/if}
    <Pagination {fetchdata} {datapoints} dis={data.length} />
  </div>
</section>
