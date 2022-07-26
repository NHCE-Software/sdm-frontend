<script>
  // @ts-nocheck

  import Pagination from "./components/Pagination.svelte";
  import exceljs from "exceljs";
  import Table from "./components/Table.svelte";
  import loadinggif from "../assets/loading.gif";
  import Navbar from "./components/Navbar.svelte";
  import { saveAs } from "file-saver";
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
  import swal from "sweetalert";
  import schema from "./helpers/exportschema";
  function sanitize(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  }
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
  async function downloadXLSX() {
    swal(
      "This is going to take sometime",
      "Please wait till we fetch all the data. The download will start automatically"
    );
    const body = {
      query: `query LeadMany {
          leadMany {
            name
            stream
            branch
            gender
            dob
            religion
            nationality
            mothertongue
            caste
            phonenumber
            emailid
            remark
            notes

            income
            docsdue

            _id
            updatedAt
            createdAt
            internal {
              enqno
            dateofadmission
              bsno
            }
            relations {
              relationType
              name
              phonenumber
              occupation
              landline
              _id
            }
            address {
              city
              state
              country
              pincode
              permanentAddress
              communicationAddress
            }
            grade {
              collName12
              board12
              state12
              yearofpassing12
              pcmscore
              modeofcal
              overallpercentorcgpa
              regno
              qualipassed
              marks {
                maths
                physics
                chemistry
                electronics
                computer
                bio
                others
              }
            }
            docs {
              docname
              docothername
              _id
            }
            createdByUser {
              name
              email
              password
              _id
            }
          }
        }`,
    };
    const res = await axios.post($baseurl, body);
    let resdata = res.data.data.leadMany || [];
    let fin = [];
    for (let index = 0; index < resdata.length; index++) {
      const element = resdata[index];
      let f = {};
      for (let i of schema) {
        f[i.column] = i.value(element);
      }
      fin.push(f);
    }
    console.log(fin);
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet("main");
    const worksheet = workbook.getWorksheet("main");
    // adding all headers
    worksheet.addRow([
      "Internal data",
      "",
      "",
      "Student Info",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Relations",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Academics Detail",
      "",
      "",
      "",
      "",
      "",
      "Documents Submission",
      "",
      "",
      "",
      "",
      "",
      "Marks Details",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Address Details",
      "",
      "",
      "",
      "",
    ]);
    worksheet.mergeCells(`A1:C1`);
    worksheet.mergeCells(`D1:N1`);
    worksheet.mergeCells(`O1:Y1`);
    worksheet.mergeCells(`Z1:AE1`);
    worksheet.mergeCells(`AF1:AK1`);
    worksheet.mergeCells(`AL1:AU1`);
    worksheet.mergeCells(`AV1:AZ1`);

    worksheet.addRow(Object.keys(fin[0]));

    //adding all values
    for (let index = 0; index < fin.length; index++) {
      let row = Object.values(fin[index]);
      // row[0] = sanitize(row[0]);
      worksheet.addRow(row);
    }

    // adding validation
    for (let index = 3; index < 10000; index++) {
      worksheet.getCell(`AF${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Submitted,Not Submitted"'],
      };
      worksheet.getCell(`AG${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Submitted,Not Submitted"'],
      };
      worksheet.getCell(`AH${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Submitted,Not Submitted"'],
      };
      worksheet.getCell(`AI${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Submitted,Not Submitted"'],
      };
      worksheet.getCell(`AS${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Percentage,CGPA"'],
      };
      worksheet.getCell(`E${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Male,Female"'],
      };
      worksheet.getCell(`F${index}`).dataValidation = {
        type: "list",
        allowBlank: true,
        error: "Choose from the dropdown value only",
        showErrorMessage: true,
        prompt: "Use dropdown",
        formulae: ['"Professional,Global"'],
      };
    }

    workbook.xlsx.writeBuffer().then(function (buffer) {
      // done
      console.log(buffer);

      const blob = new Blob([buffer], { type: "applicationi/xlsx" });
      saveAs(blob, "sdmdata.xlsx");
    });
  }
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
            on:click={downloadXLSX}
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
