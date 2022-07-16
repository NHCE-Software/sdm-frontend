<script>
  import Table from "./components/Table.svelte";
  import writeXlsxFile from "write-excel-file";

  // import swal from "sweetalert";
  import Navbar from "./components/Navbar.svelte";
  import { nowEditing } from "./store/store";
  import EditModal from "./components/EditModal.svelte";
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

  let updateData = (sid) => {
    data = data.map((item) => {
      if (item.sid === sid) return $nowEditing;
      else return item;
    });
    data = [...data];
  };
</script>

<EditModal {updateData} />
<section>
  <Navbar />
  <div class="p-5 flex  gap-3 w-full items-center">
    <div class="text-2xl font-bold">Student Details</div>
    <div class="ml-auto">
      <div class="flex flex-col gap-1">
        <div class="flex flex-col flex-1 gap-1">
          <label class="capitalize text-sm opacity-50" for={"search"}
            >Search</label
          >
          <input
            type="text"
            class="input capitalize input-bordered"
            placeholder={"Start typing here"}
          />
        </div>
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-1">
        <label for=".."> Filters</label>
        <div class="bg-purple-200 rounded-full text-purple-500 p-3">
          No filters applied
        </div>
      </div>
    </div>
    <div>
      <div class="flex flex-col gap-1 mx-6">
        <label for="..">Export data</label>
        <div class="flex gap-3">
          <div
            class="bg-purple-200 rounded-full text-purple-500 p-3 text-center btn outline-none border-none hover:text-white"
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
            class="bg-purple-200 rounded-full text-purple-500 p-3 text-center btn outline-none border-none hover:text-white"
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
        </div>
      </div>
    </div>
  </div>

  <div class="p-5">
    <Table {data} />
  </div>
</section>
