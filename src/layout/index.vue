<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <router-tab
          :keep-alive="true"
          :keep-last-tab="true"
          tab-transition="tab-scale"
          page-transition="page-fade"
        />
      </div>
      <!-- <app-main /> -->
    </div>
  </div>
</template>

<script>
import {
  Navbar,
  Sidebar
  // AppMain
} from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar
    // AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/mixin.scss';
@import '~@/assets/styles/variables.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
::v-deep {
  // 页面 fade 过渡
  .page-fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }

  // 页签 scale 过渡
  .tab-scale {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.5s, transform 0.5s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
      //   transform: scale(1.5);
    }
  }
}
</style>
<style lang="scss">
.app-wrapper {
  .router-tab__item.is-active,
  .router-tab__item:hover {
    color: #409eff;
  }
  .router-tab__contextmenu-item:hover {
    color: #409eff;
  }
}
</style>
