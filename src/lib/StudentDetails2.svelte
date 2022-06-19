<script>
  import Table from "./components/Table.svelte";

  import swal from "sweetalert";
  import Navbar from "./components/Navbar.svelte";
  import { editingModalOpen, nowEditing } from "./store/store";
  import EditModal from "./components/EditModal.svelte";
  import Input from "./components/Input.svelte";

  let data = [
    {
      sid: "1",
      name: "Sachin",
      stream: "Prof",
      branch: "Mech",
      gender: "sigmamail",
      dob: "01/01/2000",
      religion: "Hindu",
      nationality: "Indian",
      mothertongue: "Hindi",
      caste: "Caste",
      phonenumber: "9191919191",
      emailid: "sachin@gmail.com",
      internal: {
        branch: "",
        bsno: "69",
        enqno: "69",
        dateofadmission: "01/01/2000",
      },
      relations: [
        {
          relationType: "Father",
          name: "SachinFather",
          phonenumber: "9191919191",
          emailid: "sd@gmail.com",
          occupation: "Software Engineer",
          income: "1Lakh",
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
        pcmpercent: "80",
        pcmagg: "A",
        modeofcal: "Percentage",
        overallpercent: "80",
        regno: "12345",
        marks: {
          maths: "80",
          physics: "80",
          chemistry: "80",
          electronics: "80",
          computer: "80",
          bio: "80",
        },
      },
      docs: [
        {
          docname: "Admission Form",
          docstatus: "Pending",
          docduedate: "01/01/2000",
        },
        {
          docname: "TC",
          docstatus: "Pending",
          docduedate: "01/01/2000",
        },
      ],
    },
  ];
  let updateData = (sid) => {
    data = data.map((item) => {
      if (item.sid === sid) return $nowEditing;
      else return item;
    });
  };
</script>

<EditModal {updateData} />
<section>
  <Navbar />
  <div class="p-5 flex  gap-3 w-full items-center">
    <div class="text-2xl font-bold">Student Details</div>
    <div class="ml-auto">
      <div class="flex flex-col gap-1">
        <Input header="Search" value={"brp"} />
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
  </div>

  <div class="p-5">
    <Table {data} />
  </div>
</section>
