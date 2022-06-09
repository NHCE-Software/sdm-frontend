<script>
    import Grid from "gridjs-svelte";
    import Navbar from "./components/Navbar.svelte";
    import { RowSelection } from "gridjs/plugins/selection";
    import { onMount } from "svelte";

    let data = [
        {
            name: "John",
            branch: "CSE",
            gender: "M",
            stream: "Prof",
            dob: "1/2/2",
            agg: "10",
            submitted10th: true,
            submitted12th: false,
            submittedTC: false,
            submittedMigration: false,
            others: "",
            sid: "11",
        },
        {
            name: "Aohn",
            branch: "CSE",
            gender: "M",
            stream: "Global",
            dob: "1/2/2",
            agg: "10",
            submitted10th: true,
            submitted12th: false,
            submittedTC: false,
            submittedMigration: false,
            others: "",
            sid: "1",
        },
    ];
    let cols = [
        {
            name: "si",
            hidden: true,
            data: (row) => {
                return row.sid;
            },
        },
        { name: "name" },
        { name: "branch" },
        { name: "gender" },
        { name: "stream" },
        { name: "dob" },
        { name: "agg" },
        {
            name: "10th",
            data: (row) => {
                return row.submitted10th ? "✅" : "❌";
            },
        },
        {
            name: "12th",
            data: (row) => {
                return row.submitted12th ? "✅" : "❌";
            },
        },
        {
            name: "TC",
            data: (row) => {
                return row.submittedTC ? "✅" : "❌";
            },
        },
        {
            name: "MIG",
            data: (row) => {
                return row.submittedMigration ? "✅" : "❌";
            },
        },
        { name: "others" },
        {
            name: "action",
            id: "action",
            sort: 0,
            plugin: {
                // install the RowSelection plugin
                component: RowSelection,
                // RowSelection config
                props: {
                    // use the "email" column as the row identifier
                    id: (row) => {
                        console.log(row.cell(0).data);
                        return row.cell(0).data;
                    },
                },
            },
        },
    ];
    let grid;
    onMount(() => {
        console.log(grid);
    });
</script>

<section>
    <Navbar />
    <div class="p-3">
        <Grid
            bind:this={grid}
            {data}
            columns={cols}
            sort={true}
            resizable={true}
            search={true}
        />
    </div>
</section>
