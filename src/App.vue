<template>
  <div id="app">
    <home></home>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Home from '@/components/Home.vue'

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue {
}
</script>

<style lang="sass">
@import './components/Dropdown'
</style>
<style lang="scss" src="./App.scss"/>
