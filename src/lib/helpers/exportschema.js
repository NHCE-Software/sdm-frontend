const schema = [
  { column: "BS#", value: (ele) => ele.internal.bsno },
  { column: "Enq. No", value: (ele) => ele.internal.enqno },
  {
    column: "Date of admission",

    value: (ele) => ele.internal.dateofadmission,
  },
  {
    column: "Student Name",

    value: (ele) => ele.name || "",
  },
  { column: "Gender", value: (ele) => ele.gender || "" },
  { column: "Stream", value: (ele) => ele.stream || "" },
  { column: "Branch", value: (ele) => ele.branch || "" },
  { column: "DOB", value: (ele) => ele.dob || "" },
  { column: "Caste", value: (ele) => ele.caste || "" },
  { column: "Religion", value: (ele) => ele.religion || "" },
  {
    column: "Nationality",

    value: (ele) => ele.nationality || "",
  },
  {
    column: "Mother Tongue",

    value: (ele) => ele.mothertongue || "",
  },
  {
    column: "Student Mobile",

    value: (ele) => ele.phonenumber || "",
  },
  { column: "Email", value: (ele) => ele.emailid || "" },
  {
    column: "Fathers Name",
    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Father")
        ? ele.relations.find((e) => e.relationType === "Father")["name"]
        : "",
  },

  {
    column: "Fathers Mobile",
    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Father")
        ? ele.relations.find((e) => e.relationType === "Father")["phonenumber"]
        : "",
  },
  {
    column: "Fathers Occupation",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Father")
        ? ele.relations.find((e) => e.relationType === "Father")["occupation"]
        : "",
  },
  {
    column: "Fathers Landline",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Father")
        ? ele.relations.find((e) => e.relationType === "Father")["landline"]
        : "",
  },
  {
    column: "Mothers Name",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Mother")
        ? ele.relations.find((e) => e.relationType === "Mother")["name"]
        : "",
  },
  {
    column: "Mothers mobile",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Mother")
        ? ele.relations.find((e) => e.relationType === "Mother")["phonenumber"]
        : "",
  },
  {
    column: "Mothers landline",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Mother")
        ? ele.relations.find((e) => e.relationType === "Mother")["landline"]
        : "",
  },
  { column: "Total Income", value: (ele) => ele.income },
  {
    column: "Name of the Local Guardian",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Guardian")
        ? ele.relations.find((e) => e.relationType === "Guardian")["name"]
        : "",
  },
  {
    column: "Guardian Mobile",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Guardian")
        ? ele.relations.find((e) => e.relationType === "Guardian")[
            "phonenumber"
          ]
        : "",
  },
  {
    column: "Guardian Landline",

    value: (ele) =>
      ele.relations.find((e) => e.relationType === "Guardian")
        ? ele.relations.find((e) => e.relationType === "Guardian")["landline"]
        : "",
  },
  {
    column: "12th College Name",

    value: (ele) => ele.grade.collName12 || "",
  },
  {
    column: "12th College State",

    value: (ele) => ele.grade.state12 || "",
  },
  {
    column: "12th College Board",

    value: (ele) => ele.grade.board12 || "",
  },
  {
    column: "Reg. No.",

    value: (ele) => ele.grade.regno || "",
  },
  {
    column: "Yr. of passing",

    value: (ele) => ele.grade.yearofpassing12 || "",
  },
  {
    column: "Qly Exam Passed",

    value: (ele) => ele.grade.qualipassed || "",
  },
  {
    column: "TC",
    value: (ele) =>
      ele.docs.find((e) => e.docname === "TC") ? "Submitted" : "Not Submitted",
  },
  {
    column: "Migration",

    value: (ele) =>
      ele.docs.find((e) => e.docname === "MIG") ? "Submitted" : "Not Submitted",
  },
  {
    column: "10th Card",

    value: (ele) =>
      ele.docs.find((e) => e.docname === "10th")
        ? "Submitted"
        : "Not Submitted",
  },
  {
    column: "12th Card",

    value: (ele) =>
      ele.docs.find((e) => e.docname === "12th")
        ? "Submitted"
        : "Not Submitted",
  },
  { column: "Docs Due Date", value: (ele) => ele.docsdue },
  {
    column: "Others Docs",

    value: (ele) =>
      ele.docs.find((e) => e.docname === "Others")
        ? ele.docs.find((e) => e.docname === "Others")["docothername"]
        : "",
  },
  {
    column: "MO-Physics",

    value: (ele) => ele.grade.marks.physics || "",
  },
  {
    column: "MO-Math",

    value: (ele) => ele.grade.marks.maths || "",
  },
  {
    column: "MO-Chem",

    value: (ele) => ele.grade.marks.chemistry || "",
  },
  {
    column: "MO-Bio",

    value: (ele) => ele.grade.marks.bio || "",
  },
  {
    column: "MO-Elec",

    value: (ele) => ele.grade.marks.electronics || "",
  },
  {
    column: "MO-Comp",

    value: (ele) => ele.grade.marks.computer || "",
  },
  {
    column: "MO-Others",

    value: (ele) => ele.grade.marks.others || "",
  },
  {
    column: "Method of Calculation",

    value: (ele) => ele.grade.modeofcal || "",
  },
  {
    column: "Overall  % or CGPA",

    value: (ele) => ele.grade.overallpercentorcgpa || "",
  },
  {
    column: "Score",

    value: (ele) => ele.grade.pcmscore || "",
  },
  {
    column: "Address-City",

    value: (ele) => ele.address.city || "",
  },
  {
    column: "Address-State",

    value: (ele) => ele.address.state || "",
  },
  {
    column: "Address-Permanent",

    value: (ele) => ele.address.permanentAddress || "",
  },
  {
    column: "Address-Pin code",

    value: (ele) => ele.address.pincode || "",
  },
  {
    column: "Address-Communication",

    value: (ele) => ele.address.communicationAddress || "",
  },
  { column: "Remark", value: (ele) => ele.remark || "" },
  { column: "Notes", value: (ele) => ele.notes || "" },
];
export default schema;
