<template>
  <div id="app">
    <a-header/>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <a-footer />
  </div>
</template>

<script>
import AHeader from '@/components/Header.vue';
import AFooter from '@/components/Footer.vue';
/* var parts = "foo/bar/test.html".split("/");
var result = parts[parts.length - 1];  */
export default {
  name: 'App',
  components: {
    AHeader,
    AFooter,
  },
};
</script>

<style>
#app {
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>
