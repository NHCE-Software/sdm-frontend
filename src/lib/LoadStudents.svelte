<script>
  import Navbar from "./components/Navbar.svelte";
  import axios from "axios";
  import { onMount } from "svelte";
  let files;
  let currentStep = 0;
  let step = ["Upload CSV", "Preview", "Finish"];
  let parsedData = {
    columns: [],
    data: [],
  };
  let error = {
    fa: false,
    swa: false,
    ssce: false, // serverconnection error
  };
  let loading = {
    ssc: false,
  };
  onMount(async () => {
    try {
      const { data } = await axios.get("http://127.0.0.1:5001/");
      loading.ssc = true;
      if (data.message === "Sanitization Server for SDM : Sever Online")
        loading.ssc = false;
    } catch (e) {
      console.log(e, "bro etf");
      error.ssce = true;
      console.log(error, loading);
    }
  });

  async function processCSV() {
    // off-loading to python sanitization server
    let fd = new FormData();
    fd.append("file", files[0]);
    const { data } = await axios.post("http://localhost:5001/processCSV", fd);
    if (data.statusCode === "SWA") {
      error.swa = true;
    } else if (data.statusCode === "FA") {
      error.fa = true;
    } else {
      parsedData.columns = Object.keys(data.payload[0]);
      parsedData.data = data.payload.map((item) => {
        return Object.values(item);
      });
      //console.log(data);
      console.log(parsedData);
    }
  }
  async function formatandupload() {
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
        pcmpercent: "",
        pcmagg: "",
        modeofcal: "",
        overallpercent: "",
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
    for (let index = 0; index < parsedData.data.length; index++) {
      const element = parsedData.data[index];
      let tempdata = { ...dataFormat };
      let ele = {};
      parsedData.columns.forEach((key, i) => (ele[key] = element[i]));
      console.log(ele);
      tempdata = {
        ...tempdata,
        name: ele.studentname,
        branch: ele.branch,
        caste: ele.caste,
        dob: ele.dob,
        emailid: ele.emailid,
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
          board12: ele.board,
          modeofcal: ele.methodofcalculation,
          pcmagg: ele.pcmagg,
          pcmpercent: ele.pcm,
          overallpercent: ele.overall,
          collName12: ele.thcollegename,
          yearofpassing12: ele.yrofpassing,
          regno: ele.regno,
          state12: ele.state,
          qualipassed: ele.qlyexampassed,
          marks: {
            ...tempdata.grade.marks,
            bio: ele["marksobtained/bio"],
            chemistry: ele["marksobtained/chm"],
            computer: ele["marksobtained/comp"],
            electronics: ele["marksobtained/elc"],
            maths: ele["marksobtained/mth"],
            physics: ele["marksobtained/phy"],
          },
        },
        address: {
          ...tempdata.address,
          city: ele["address/city"],
          communicationAddress: ele["address/communication"],
          permanentAddress: ele["address/permanent"],
          pincode: ele["address/pincode"],
          state: ele["address/state"],
        },
        docsdue: ele["docdue"],
        relations: [
          {
            relationType: "Mother",
            name: ele["mothersname"],
            landline: ele["contactnos/land/parents"],
            emailid: "",
            occupation: "",
            income: "",
            phonenumber: ele["contactnos/mobile/parents"],
          },
          {
            relationType: "Father",
            name: ele["fathersname"],
            landline: ele["contactnos/land/parents"],
            emailid: "",
            occupation: ele["fathersoccupation"],
            income: ele["income"],
            phonenumber: ele["contactnos/mobile/parents"],
          },
          {
            relationType: "Guardian",
            name: ele["nameofthelocalgurdian"],
            landline: ele["contactnos/land/gg"],
            emailid: "",
            occupation: "",
            income: "",
            phonenumber: ele["contactnos/mobile/gg"],
          },
        ],
      };
      console.log(tempdata);
    }
  }
  $: {
    if (files && files.length > 0) {
      processCSV();
    }
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
        <input
          type="file"
          name="file"
          bind:files
          class="file:bg-purple-100 mt-5 file:text-purple-600 file:border-none file:px-4 file:py-3  file:rounded-full file:mr-5 hover:file:bg-purple-200 file:transition-all file:font-semibold"
          id=""
        />
        <div class="text-sm">
          {#if error.ssce}
            Error connecting to Sanitization server
          {/if}
          {#if loading.ssc}
            Connecting to Sanitization server
          {/if}
          {#if !loading.ssc && !error.ssce}
            Connected
          {/if}
        </div>
        <button type="submit" class="btn rounded-3xl bg-purple-700 mt-4"
          >Submit</button
        >
      </form>
    {/if}
    {#if currentStep === 1}
      <!-- Preview Table -->
      <div class="flex items-center justify-between py-6">
        <div class="">
          Please check if the data is loading correctly. If not, there is a
          problem in your CSV most likely.
        </div>
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
          <tr>
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
