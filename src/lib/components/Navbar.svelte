<script>
  import swal from "sweetalert";
</script>

<div class="navbar border-b-2 p-5">
  <div class="navbar-start ">
    <div class="dropdown">
      <label
        tabindex="0"
        class="btn btn-ghost shadow-lg bg-purple-700 text-white btn-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          ><path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          /></svg
        >
      </label>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li><a href="/#/studentdetails2">Student Details</a></li>
        <li><a href="/#/loadstudents">Load Details</a></li>
        <li
          on:click={() => {
            swal("Under construction", "Working on this feature maam", "info");
          }}
        >
          <a>Logout</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="navbar-center">
    <a class="btn btn-ghost normal-case text-xl">Student Data Manager</a>
  </div>
  <div class="navbar-end">
    <button class="btn btn-ghost btn-circle">
      <div class="text-3xl">🥐</div>
    </button>
  </div>
</div>
