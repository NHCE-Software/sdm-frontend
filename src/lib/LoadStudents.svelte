<script>
  // @ts-nocheck

  import Navbar from "./components/Navbar.svelte";
  import readXlsxFile from "read-excel-file";
  import swal from "sweetalert";
  import axios from "axios";

  let files;
  let currentStep = 0;
  let disable = false;
  let step = ["Upload CSV", "Preview", "Finish"];
  let dataFormat = {
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
  let parsedData = {
    columns: [],
    data: [],
  };
  let loading = {
    parsingCSV: false,
  };
  let errors = {
    formaterr: false,
  };
  function sanitize(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  }

  function checkFormat(format) {
    let expectedformat = [
      "uid",
      "BS#",
      "Branch",
      "Enq. No",
      "Date of admission",
      "Student Name",
      "Sex",
      "Stream",
      "DOB",
      "Caste",
      "Religion",
      "Nationality",
      "Mother Tongue",
      "Student Mobile",
      "Email",
      "Father's Name",
      "Fathers Mobile",
      "Father's Occupation",
      "Fathers Landline",
      "Mothers Name",
      "Mothers mobile",
      "Mothers landline",
      "Total Income",
      "Name of the Local Gaurdian",
      "Gaurdian Mobile",
      "Gaurdian Landline",
      "12th College Name",
      "12th College State",
      "12th College Board",
      "Reg. No.",
      "Yr. of passing",
      "Qly Exam Passed",
      "TC",
      "Migration",
      "10th Card",
      "12th Card",
      "Docs Due Date",
      "Others Docs",
      "MO-Physics",
      "MO-Math",
      "MO-Chem",
      "MO-Bio",
      "MO-Elec",
      "MO-Comp",
      "Method of Calculation",
      "Overall  % or CGPA",
      "Address-City",
      "Address-State",
      "Address-Permanent",
      "Address-Pin code",
      "Address-Communication",
      "Remarks",
    ];
    if (expectedformat.length != format.length) return false;
    for (let index = 0; index < expectedformat.length; index++) {
      if (!format.includes(expectedformat[index])) return false;
    }

    return true;
  }

  function removeEmptyRows(data) {
    let finalrows = [];
    for (let index = 0; index < data.length; index++) {
      let row = data[index];
      let hasData = false;
      for (let index = 0; index < row.length; index++) {
        const element = row[index];

        if (element && element.toString().trim()) {
          hasData = true;
          break;
        }
      }
      if (hasData) finalrows.push(row);
    }
    return finalrows;
  }

  async function processCSV() {
    loading.parsingCSV = true;
    try {
      let data = await readXlsxFile(files[0]);

      console.log(data);
      parsedData.columns = data[1];
      parsedData.data = data.slice(2);
      console.log(parsedData);
      loading.parsingCSV = false;
      //check format
      if (!checkFormat(parsedData.columns)) {
        errors.formaterr = true;
      }
      //convert to lowercase and remove special chars
      parsedData.columns = parsedData.columns.map((item) => sanitize(item));
      // remove nulls
      parsedData.data = removeEmptyRows(parsedData.data);
    } catch (e) {
      console.log(e);
      loading.parsingCSV = false;
      errors.formaterr = true;
    }
  }
  async function formatandupload() {
    let fin = [];
    if (parsedData.data.length === 0)
      return swal(
        "There is nothing to load",
        "There are no parsed values from your excel sheet",
        "warning"
      );
    for (let index = 0; index < parsedData.data.length; index++) {
      const element = parsedData.data[index];
      let tempdata = { ...dataFormat };
      let ele = {};
      parsedData.columns.forEach((key, i) => (ele[key] = element[i]));
      console.log(ele);
      let parseddocs = [];
      if (ele.tc === "Submitted") {
        parseddocs.push({
          docname: "TC",
          docothername: "",
        });
      }
      if (ele.migration === "Submitted") {
        parseddocs.push({
          docname: "MIG",
          docothername: "",
        });
      }
      if (ele["10thcard"] === "Submitted") {
        parseddocs.push({
          docname: "10th",
          docothername: "",
        });
      }
      if (ele["12thcard"] === "Submitted") {
        parseddocs.push({
          docname: "12th",
          docothername: "",
        });
      }
      if (ele.othersdocs) {
        ele.othersdocs.split(",").map((item) => {
          parseddocs.push({
            docname: "Others",
            docothername: item,
          });
        });
      }
      tempdata = {
        ...tempdata,
        name: ele.studentname,
        branch: ele.branch,
        caste: ele.caste,
        phonenumber: ele.studentmobile,
        dob: ele.dob,
        emailid: ele.email,
        gender: ele.sex,
        nationality: ele.nationality,
        religion: ele.religion,
        mothertongue: ele.mothertongue,
        remarks: ele.remarks,
        stream: ele.stream,
        internal: {
          ...tempdata.internal,
          dateofadmission: ele.dateofadmission,
          bsno: ele.bs,
          enqno: ele.enqno,
        },
        grade: {
          ...tempdata.grade,
          board12: ele["12thcollegeboard"],
          collName12: ele["12thcollegename"],
          state12: ele["12thcollegestate"],
          modeofcal: ele.methodofcalculation,
          pcmagg: "",
          pcmpercent: "",
          overallpercent: ele.overallorcgpa,
          yearofpassing12: ele.yrofpassing,
          regno: ele.regno,
          qualipassed: ele.qlyexampassed,
          marks: {
            ...tempdata.grade.marks,
            bio: ele.mobio,
            chemistry: ele.mochem,
            computer: ele.mocomp,
            electronics: ele.moelec,
            maths: ele.momath,
            physics: ele.mophysics,
          },
        },
        address: {
          ...tempdata.address,
          city: ele.addresscity,
          communicationAddress: ele.addresscommunication,
          permanentAddress: ele.addresspermanent,
          pincode: ele.addresspincode,
          state: ele.addressstate,
        },
        docsdue: ele["docsduedate"],
        docs: parseddocs,
        income: ele.totalincome,
        relations: [
          {
            relationType: "Mother",
            name: ele.mothersname,
            landline: ele.motherslandline,
            occupation: "",
            phonenumber: ele.mothersmobile,
          },
          {
            relationType: "Father",
            name: ele.fathersname,
            landline: ele.fatherslandline,
            occupation: ele.fathersoccupation,
            phonenumber: ele.fathersmobile,
          },
          {
            relationType: "Guardian",
            name: ele.nameofthelocalgaurdian,
            landline: ele.gaurdianlandline,
            occupation: "",
            phonenumber: ele.gaurdianmobile,
          },
        ],
      };
      console.log(tempdata);
      fin.push(tempdata);
      // console.log("this is my first console log in vim");
    }
    axios.post("http://localhost:5000/store", { data: fin }).then((res) => {
      console.log(res.data);
    });
  }

  $: {
    if (files && files.length > 0) {
      processCSV();
    }
  }
  $: {
    disable = Object.values(errors).every((value) => value === true);
    if (parsedData.columns.length === 0) disable = true;
  }
</script>

<section>
  <Navbar />
  <div class="flex flex-col p-5 mt-10 max-w-7xl mx-auto">
    <div class="text-3xl font-bold">Data Loading</div>
    <div>Load Student data on SDM</div>
  </div>
  <div class="flex flex-col p-5 max-w-7xl mx-auto">
    <ul class="steps">
      {#each step as s, index}
        <li class={`step  ${index <= currentStep ? "step-primary" : ""}`}>
          {s}
        </li>
      {/each}
    </ul>
  </div>
  <div class="flex flex-col p-6 mt-10 mx-auto border max-w-7xl rounded-2xl  ">
    {#if currentStep === 0}
      <!-- upload CSV form -->
      <form
        on:submit|preventDefault={(e) => {
          currentStep += 1;
        }}
        class="flex flex-col gap-3 "
      >
        <div>
          <div class="text-3xl font-bold">Upload student data file</div>
          <div>Please note that only CSV files are supported</div>
        </div>

        {#if loading.parsingCSV}
          <div class="flex items-center ">
            <svg
              role="status"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <div class="animate-pulse">Parsing...</div>
          </div>
        {:else if errors.formaterr}
          <div>
            ❌ The format of the data file is incorrect. Please comply with the
            following format to load data: <br /><a
              class="italic text-purple-500 hover:text-purple-600"
              href="https://docs.google.com/spreadsheets/d/1YsZMdeV6XSkHc-uC0nP1zDvTrgWF0MG7Vcwich9nTvA/edit?usp=sharing"
              >Click here to open supported format</a
            >
            <div
              on:click={() => {
                files = undefined;
                errors.formaterr = false;
              }}
              class="bg-purple-100 text-purple-500 font-bold hover:bg-purple-200 cursor-pointer px-3 py-2 w-fit rounded-full mt-5 "
            >
              Retry
            </div>
          </div>
        {:else if parsedData.columns.length > 0}
          <div>✅ Data Parsed, Press Submit to continue</div>
        {:else}
          <input
            type="file"
            name="file"
            bind:files
            class="file:bg-purple-100 mt-5 file:text-purple-600 file:border-none file:px-4 file:py-3  file:rounded-full file:mr-5 hover:file:bg-purple-200 file:transition-all file:font-semibold"
            id=""
          />
        {/if}

        <button
          type="submit"
          disabled={disable}
          class="btn rounded-3xl bg-purple-700 mt-4">Submit</button
        >
      </form>
    {/if}
    {#if currentStep === 1}
      <!-- Preview Table -->
      <div class="flex items-center justify-between py-6">
        <div class="">Please check if the data is loading correctly.</div>
        <div>
          <div
            on:click={() => {
              currentStep += 1;
            }}
            class="btn bg-purple-700"
          >
            Yes, the data is flawless
          </div>
          <div
            on:click={() => {
              currentStep -= 1;
              files = undefined;
              parsedData = {
                columns: [],
                data: [],
              };
            }}
            class="btn bg-red-500 border-none"
          >
            No, Go back
          </div>
        </div>
      </div>
      <div class="text-xl font-bold opacity-50 py-3">Data Preview:</div>
      <div class="max-w-full block overflow-auto">
        <table class="table w-full ">
          <tr class="bg-purple-500 text-white font-bold">
            {#each parsedData.columns as cols}
              <th class="border"> {cols}</th>
            {/each}
          </tr>
          {#each parsedData.data as row, index}
            {#if index < 6}
              <tr>
                {#each row as r}
                  <td class="border">{r ? r : "-"}</td>
                {/each}
              </tr>
            {/if}
          {/each}
        </table>
      </div>
    {/if}
    {#if currentStep === 2}
      <!-- Confirmation -->
      <div class="flex items-center justify-between">
        <div class="text-3xl">Confirm Data Load</div>
        <div>
          <div
            on:click={() => {
              // format and server call
              formatandupload();
            }}
            class="btn bg-purple-500 border-none"
          >
            Yes, Proceed
          </div>
          <div
            on:click={() => {
              currentStep -= 1;
            }}
            class="btn bg-red-500 border-none"
          >
            No, Go back
          </div>
        </div>
      </div>
      <div class="max-w-4xl">
        Quality of data on the system depends on the data that loads on the
        system. Doing this operation will load the current data onto the system.
        Please confirm this action.
        <br />
        <span class="text-red-500">
          Loading wrong data will lead to manual deletion of all the loaded
          records
        </span>
      </div>
    {/if}
  </div>
</section>
