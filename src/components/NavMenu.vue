<template>
  <div class="nav-menu flex-c-b">
    <div class="nav-logo flex-c">
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
           width="24" height="24"
           viewBox="0 0 172 172"
           style=" fill:#000000;">
        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter"
           stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
           font-size="none" text-anchor="none" style="mix-blend-mode: normal">
          <path d="M0,172v-172h172v172z" fill="none"></path>
          <g fill="#ffffff">
            <path
                d="M20.47203,13.78016c-3.61754,0 -6.69187,2.96184 -6.69187,6.62469v86.27547c0,1.23199 0.32904,2.35276 0.86672,3.3325c-0.2246,0.3891 -0.42773,0.80686 -0.57781,1.28328c-0.00224,0.00224 -0.00448,0.00448 -0.00672,0.00672l-9.70859,30.94656c-0.54477,0.61542 -0.84584,1.40873 -0.84656,2.23063v10.32c0,3.64466 2.94287,6.81281 6.665,6.81281h151.64891c3.72197,0 6.67172,-3.16815 6.67172,-6.81281v-10.32c-0.00072,-0.8219 -0.30179,-1.6152 -0.84656,-2.23063l-9.7086,-30.94656c-0.15092,-0.48351 -0.35695,-0.90324 -0.58453,-1.29672c0.53589,-0.97856 0.86672,-2.09598 0.86672,-3.32578v-86.27547c0,-3.66284 -3.07433,-6.62469 -6.69188,-6.62469zM20.61984,20.61984h130.76031v86.06047c0,-0.33506 -0.27017,-0.02016 -0.02015,-0.02016h-16.85063c-0.11604,-0.01264 -0.23265,-0.01937 -0.34937,-0.02015h-96.32c-0.11448,0.00101 -0.22884,0.00774 -0.34265,0.02015h-16.85735c0.25015,0 -0.02016,-0.31504 -0.02016,0.02016zM19.85391,113.42594c0.0155,0.00167 0.0315,-0.00157 0.04703,0c0.00777,0.02647 0.03286,0.01482 0.06047,0.00672c0.22691,0.02108 0.44481,0.06719 0.67859,0.06719h12.79922l-2.37844,9.50703c-0.25642,1.02781 -0.02505,2.11645 0.62721,2.95114c0.65226,0.83469 1.65269,1.32235 2.71201,1.32199h103.2c1.05932,0.00037 2.05974,-0.4873 2.71201,-1.32199c0.65226,-0.83469 0.88364,-1.92333 0.62721,-2.95114l-2.37844,-9.50703h12.79922c0.22898,0 0.44276,-0.04024 0.66515,-0.06047c0.03617,0.01497 0.07147,0.01861 0.08063,-0.01344c0.01331,-0.00136 0.02703,0.00143 0.04031,0l8.68734,27.68125h-149.66687zM40.5275,113.52h90.945l1.72,6.88h-94.385zM72.24,130.72l-3.44,6.88h34.4l-3.44,-6.88zM10.25281,147.85281h151.49437v6.94719c0,0.15311 -0.00165,0.06719 0.07391,0.06719h-151.575c0.00346,-0.00846 0.00672,-0.0124 0.00672,-0.06719z"></path>
          </g>
        </g>
      </svg>
      <span class="nav-logo-text">{{ logoText }}</span>
    </div>
    <div class="nav-content flex-c">
      <div class="nav-content-item flex-c-c"
           :class="{ 'is-active': activate === item.key }"
           v-for="item in menus"
           :key="item.key"
           @click="onClick(item)"
      >
        {{ item.name }}
        <div class="nav-content-item-line" v-show="activate === item.key"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'NavMenu',
  data() {
    return {
      logoText: 'Laptops for all',
      menus: [{
        key: 'default',
        name: 'Lenovo Outlet',
      // }, {
      //   key: 'custom',
      //   name: 'Custom Style',
      }],
      activate: 'default'
    }
  },
  methods: {
    onClick(item) {
      this.activate = item.key
      this.$emit('nav', item.key)
    }
  }
}
</script>

<style lang="scss" scoped>

.nav-menu {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  color: #FFFFFF;
  transition: all 0.4s ease;
  user-select: none;
  background-color: #518beb;
}

.nav-logo-img {
  width: 24px;
  height: 24px;
}

.nav-logo-text {
  margin-left: 14px;
  font-size: 20px;
  color: #FFFFFF;
}

.nav-content-item {
  box-sizing: border-box;
  position: relative;
  height: 40px;
  margin: 0 12px;
  font-size: 14px;
  letter-spacing: 1px;
  color: #FFFFFF;
  cursor: pointer;
}

.nav-content-item:hover {
  color: #E0D5D5;
}

// .nav-content-item.is-active, .nav-content-item.is-active:hover{
//   color: #046FDB;
// }
.nav-content-item-line {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: #FFFFFF;
}

</style>