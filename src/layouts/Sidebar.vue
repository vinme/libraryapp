<template>
<div>
      <sidebar-menu 
    :menu="menu"
    theme="white-theme"
    width="240px"
    :hideToggle="true"
    :showOneChild="true"
     />
</div>
</template>

<script>
export default {
    data() {
            return {
                permissions: [],
                menu: [
                    {
                        header: false,
                        title: '',
                        hiddenOnCollapse: true,
                    },
                    {
                        href: '/premises',
                        title: 'Premises',
                        icon: 'fa fa-user',
                        hidden: this.showMai('premise'),
                    },
                    {
                        href: '/district-report',
                        title: 'District Report',
                        icon: 'fa fa-solid fa-chart-bar',
                        hidden: this.showMai('admins'),
                    },
                    {
                        href: '/events-map',
                        title: 'Events Map',
                        icon: 'fa fa-regular fa-map',
                        hidden: this.showMai('event_maps'),
                    },
                    {
                        href: '',
                        title: 'Events',
                        icon: 'fa fa-solid fa-list-ul',
                        hidden: this.showMai('event_list'),
                        child:[
                            {
                                href: '/events-list',
                                title: 'Events List',
                                icon: 'fa fa-solid fa-chart-bar',
                            },
                            {
                                href: '/events-list-special',
                                title: 'Special Permits',
                                icon: 'fa fa-solid fa-chart-bar',
                            },
                        ]
                    },
                    {
                        href: '',
                        title: 'Reports',
                        icon: 'fa fa-solid fa-chart-bar',
                        child: [
                            {
                                href: '/reports',
                                title: 'General',
                                icon: 'fa fa-solid fa-chart-bar',
                                hidden: this.showMai('admins'),
                            },
                            {
                                href: '/report-by-date',
                                title: 'Report By Date',
                                icon: 'fa fa-solid fa-chart-bar',
                                hidden: this.showMai('branch_report'),
                            },
                            {
                                href: '/receipt-summary',
                                title: 'Receipt Summary',
                                icon: 'fa fa-solid fa-chart-bar',
                                hidden: this.showMai('admins'),
                            },
                            {
                                href: '/bma-report',
                                title: 'BMA Report',
                                icon: 'fa fa-solid fa-chart-bar',
                                hidden: this.showMai('bma_report'),
                            },
                            {
                                href: '/atk-report-publish',
                                title: 'ATK Report',
                                icon: 'fa fa-solid fa-chart-bar',
                                hidden: this.showMai('admins'),
                            }
                        ]
                    },
                    {
                        href: '',
                        title: 'Users',
                        icon: 'fa fa-users',
                        hidden: this.showMai('admins'),
                        child: [
                            {
                                href: '/admins',
                                title: 'Admins',
                                icon: 'fa fa-user',
                            },
                            {
                                href: '/roles',
                                title: 'Roles',
                                icon: 'fa fa-solid fa-key',
                            }
                        ]
                    }
                ],
            }
        },


    methods: {

        showMai(item) {
            let permissions = this.$auth.user().permissions;
            if (permissions.includes(item)) {
                return false;
            }else{
                return true;
            }
        },
        
    },
    mounted(){  
    },
}
</script>

<style lang="scss" scoped>
.sidebar {
  width: 250px;
  position: fixed;
  top: 0;
  background: white;
  z-index: 1020;
  bottom: 0;
  left: 0;
  .header {
    display: flex;
    height: 75px;
    text-align: center;
    border-bottom: 1px solid #eceef2;
    align-items: center;
    justify-content: center;
  }
  .list {
    padding: 15px;
    .item {
      .item-icon {
        margin-right: 15px;
      }
      display: block;
      padding: 12px 30px;
      margin : 3px 0;
      text-decoration: none;
      color : rgba(17, 26, 65, 0.8);
      font-size : 16px;
      border-radius: 10px;
    }
    .item.active {
      color: var(--primary);
      font-weight: 500;
      background-color: rgba(17, 26, 65, 0.03);
    }
    .item:hover {
      background-color: rgba(17, 26, 65, 0.03);
    }
  }
}
@media(max-width : 568px) {
  .sidebar {
    display : none;
  }
}
.v-sidebar-menu{
    top: 75px !important;
}
.v-sidebar-menu .vsm--link {
    font-size: 12px !important;
}

</style>
