<template>
  <div id="app">
    <div class="container">
      <h1 class="title">For view parallax effect scroll down</h1>
      <h3 class="section-title">Two columns parallax effect</h3>
      <ParallaxCards class="two-columns" />
      <h3 class="section-title">Custom Parallax Effect with options</h3>
      <CustomazedParallaxCards />
    </div>
  </div>
</template>

<script>
import ParallaxCards from '@/components/ParallaxCards/index.vue';
import CustomazedParallaxCards from '@/components/CustomazedParallaxCards/index.vue';

export default {
  name: 'App',
  components: {
    ParallaxCards,
    CustomazedParallaxCards,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 250px;
  padding-bottom: 500px;
}

*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 1240px;
  padding: 0 40px;
  margin: 0 auto;
}

.title {
  font-size: 100px;
  margin-bottom: 300px;
  text-align: center;
}

.section-title {
  font-size: 24px;
  margin-bottom: 50px;
}

.two-columns {
  margin-bottom: 60px;
}
</style>
