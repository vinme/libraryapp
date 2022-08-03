<template>
  <div class="flexible-content">
    <!--Navbar-->
    <mdb-navbar class="flexible-navbar white" light position="top" scrolling>
      <mdb-navbar-brand href="https://mdbootstrap.com/docs/vue/" target="_blank"
        >ExLib Library Management</mdb-navbar-brand
      >
      <mdb-navbar-toggler>
        <!-- <mdb-navbar-nav left>
          <mdb-nav-item to="/" waves-fixed active class="active"
            >Home</mdb-nav-item
          >
        </mdb-navbar-nav> -->
        <mdb-navbar-nav right v-if="user">
          <mdb-nav-item href="#!" waves-fixed
            >Welcome {{user}}</mdb-nav-item>
          <mdb-nav-item href="#!" waves-fixed @click="logoutUser"
            >Logout</mdb-nav-item>
        </mdb-navbar-nav>
      </mdb-navbar-toggler>
    </mdb-navbar>
    <!--/.Navbar-->
    <!-- Sidebar -->
    <div class="sidebar-fixed position-fixed">
      <a class="logo-wrapper"
        ><img alt="" class="img-fluid" src="./assets/logo.png"
      /></a>
      <mdb-list-group class="list-group-flush">
        <router-link to="/books" @click.native="activeItem = 3">
          <mdb-list-group-item
            :action="true"
            :class="activeItem === 3 && 'active'"
            ><mdb-icon icon="table" class="mr-3" />List All Books</mdb-list-group-item
          >
        </router-link>
      </mdb-list-group>
    </div>
    <!-- /Sidebar  -->
    <main>
      <div class="mt-5 p-5">
        <router-view></router-view>
      </div>
      <ftr color="primary-color-dark" class="text-center font-small darken-2">
        <p class="footer-copyright mb-0 py-3 text-center">
          &copy; {{ new Date().getFullYear() }} Copyright
        </p>
      </ftr>
    </main>
      <el-row>
      <el-dialog title="Log in" :visible.sync="showCheckin">
        <el-row type="flex" class="row-bg" justify="center"> 
          <el-col :span="20" style="text-align:center;">
          <el-input placeholder="Your Name" v-model="user">
            <template slot="prepend">Your Name</template>
          </el-input>
             
          </el-col>

        </el-row>
        <el-row type="flex" class="row-bg" justify="center">

          <el-col :span="24" style="text-align:center;">          <br />          
          <el-button size="medium"  type="primary" @click="checkin">Log In</el-button>
            <br /><br />
          </el-col>
        </el-row>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
import {
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavItem,
  mdbNavbarNav,
  mdbNavbarToggler,
  mdbIcon,
  mdbListGroup,
  mdbListGroupItem,
  mdbFooter,
  waves
} from "mdbvue";

export default {
  name: "AdminTemplate",
  components: {
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavItem,
    mdbNavbarNav,
    mdbNavbarToggler,
    mdbListGroup,
    mdbListGroupItem,
    mdbIcon,
    ftr: mdbFooter
  },
  data() {
    return {
      activeItem: 1,
      showCheckin: false,
      user: '',
    };
  },
  methods:{
    checkin(){
        this.$cookies.set("theExLibUser",this.user,"1d");
        this.showCheckin = false;  
      },

      validateUser(){
          let ck = this.$cookies.get("theExLibUser");
          if(!ck){
            this.showCheckin = true;
            return false;
          }else{
            this.user = ck;
            return true;
          }
      },


      logoutUser(){
        this.$cookies.remove("theExLibUser");
        this.user = null;
      }
  },  
  beforeMount() {
    this.activeItem = this.$route.matched[0].props.default.page;
  },
  mounted(){
    this.validateUser();
  },
  mixins: [waves]
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap");
.navbar-light .navbar-brand {
  margin-left: 15px;
  color: #2196f3 !important;
  font-weight: bolder;
}
</style>

<style scoped>
main {
  background-color: #ededee;
}

.flexible-content {
  transition: padding-left 0.3s;
  padding-left: 270px;
}

.flexible-navbar {
  transition: padding-left 0.5s;
  padding-left: 270px;
}

.sidebar-fixed {
  left: 0;
  top: 0;
  height: 100vh;
  width: 270px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 1050;
  background-color: #fff;
  padding: 1.5rem;
  padding-top: 0;
}

.sidebar-fixed .logo-wrapper img {
  width: 100%;
  padding: 2.5rem;
}

.sidebar-fixed .list-group-item {
  display: block !important;
  transition: background-color 0.3s;
}

.sidebar-fixed .list-group .active {
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  border-radius: 5px;
}

@media (max-width: 1199.98px) {
  .sidebar-fixed {
    display: none;
  }
  .flexible-content {
    padding-left: 0;
  }
  .flexible-navbar {
    padding-left: 10px;
  }
}
</style>