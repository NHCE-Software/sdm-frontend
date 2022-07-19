<script>
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

  async function fetchdata(mode) {
    if (mode === "filter") {
      // do not check for pages as the pages will change after applying filter
      // setting the page to 1st page
      $currentPage = 1;
    } else {
      //
      if ($currentPage <= 0) {
        $currentPage = 1;
        return;
      }

      if ($currentPage >= $maxPage) {
        $currentPage = $maxPage;
        return;
      }
    }

    console.log("fetching data");

    loading = true;
    console.log($currentPage, $maxRecordPerPage);
    let newfilter = {
      stream: filters.stream ? filters.stream : undefined,
      branch: filters.branch ? filters.branch : undefined,
      docs: { ...filters.docs },
    };
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
    console.log(res.data);
    $maxPage = res.data.data.getStudents.totalpages;
    datapoints = res.data.data.getStudents.totalrecords;
    data = res.data.data.getStudents.students;
    data = data.map((item) => {
      item.sid = item._id;
      return item;
    });
    console.log(data[0]);
    loading = false;
  }
  onMount(async () => {
    await fetchdata();
  });

  let data = [
    {
      sid: "1",
      name: "Sachin",
      stream: "Prof",
      branch: "Mech",
      gender: "sigmamail",
      dob: "2000-07-04",
      religion: "Hindu",
      nationality: "Indian",
      mothertongue: "Hindi",
      caste: "Caste",
      phonenumber: "9191919191",
      emailid: "sachin@gmail.com",
      remarks: "",
      internal: {
        bsno: "69",
        enqno: "69",
        dateofadmission: "2000-07-04",
      },
      income: "3000",
      relations: [
        {
          relationType: "Father",
          name: "SachinFather",
          phonenumber: "9191919191",
          occupation: "Software Engineer",
          landline: "9191919191",
        },
      ],
      address: {
        city: "Pune",
        state: "Maharashtra",
        country: "India",
        pincode: "411028",
        permanentAddress: "asdfasd",
        communicationAddress: "asdfasd",
      },
      grade: {
        collName12: "RV collez",
        board12: "CBSE",
        state12: "Bangalore",
        yearofpassing12: "2020",
        pcmscore: "80", // CALCULATE
        modeofcal: "Percentage",
        overallpercentorcgpa: "80",
        regno: "12345",
        qualipassed: "",
        marks: {
          maths: "80",
          physics: "80",
          chemistry: "80",
          electronics: "80",
          computer: "80",
          bio: "80",
        },
      },

      docsdue: "", // TODO
      docs: [
        {
          docname: "Others",
          docothername: "Admission Form",
          //doclink: "http://www.africau.edu/images/default/sample.pdf",
        },
        {
          docname: "MIG",
          docothername: "othername",
          //doclink: "http://www.africau.edu/images/default/sample.pdf",
        },
      ],
    },
  ];
  let loading = false;
  let filters = { docs: {}, stream: "", branch: "" };
  let datapoints = 0;
  let updateData = (sid) => {
    data = data.map((item) => {
      if (item.sid === sid) return $nowEditing;
      else return item;
    });
    data = [...data];
  };
</script>

<FilterModal bind:filters {fetchdata} />
<AddModal />
<EditModal {updateData} />
<section>
  <Navbar />
  <div class="p-5 flex  gap-3 w-full items-center">
    <div class="text-2xl font-bold">Student Details</div>

    <div class="form-control ml-auto ">
      <div class="input-group">
        <input
          type="text"
          placeholder="Search…"
          class="input input-bordered "
        />
        <button class="btn btn-square">
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
            on:click={() => {
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
              console.log("add");
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
    <div class="flex text-sm items-center justify-between py-3">
      <div class="flex gap-3">
        <form class="flex gap-4 items-center">
          <div class="form-control">
            <label class="input-group input-group-sm">
              <div
                on:click={() => {
                  $currentPage -= 1;
                  fetchdata();
                }}
                class="btn btn-sm"
              >
                -
              </div>
              <input
                bind:value={$currentPage}
                type="text"
                class="input input-bordered w-20 text-center  input-sm "
              />
              <div
                on:click={() => {
                  $currentPage += 1;
                  fetchdata();
                }}
                class="btn btn-sm"
              >
                +
              </div>
            </label>
          </div>
          <div class="text-sm opacity-40">
            Page {$currentPage} ({$maxRecordPerPage} records) of {$maxPage} pages
          </div>
        </form>
      </div>
      <div class="flex gap-3">
        <div class="text-sm opacity-40">
          Displaying <b>{data.length}</b> of Total <b>{datapoints}</b> data points
        </div>
      </div>
    </div>
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
      <Table {data} />
    {/if}
  </div>
</section>
