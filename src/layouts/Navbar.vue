<template>
  <nav>
    <div class="nav-container big-container">
      <div class="header">
        <router-link to="/">
          <img style="width: 80%" src="@/assets/logo.png"/>
        </router-link>
      </div>
      <div class="d-flex align-items-center mr-3">
        <div class="col-6">
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      name: "Go Thailand",
    };
  },
  computed: {
   
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
  height: 75px;
  z-index: 1020;
  border-bottom: 1px solid #eceef2;
}
.nav-container {

  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-start;
  padding-left: 20px 20px 0 20px;
}
.van-popover__action {
  width: 140px;
}
@media (max-width: 568px) {
  nav {
    left: 0;
    height: 50px;
    .nav-container {
      justify-content: space-between;
    }
  }
}
.avatar {
  background-color: var(--primary);
  color: white;
  width: 40px;
  height: 40px;
}
.email {
  font-size: 12px;
  color: #a3a6bb;
}
.name {
  font-size: 14px;
  font-weight: 500;
}
.drop-list {
  font-size: 14px !important;
}
</style>


