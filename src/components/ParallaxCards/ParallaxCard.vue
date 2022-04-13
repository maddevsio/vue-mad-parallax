<template>
  <div class="parallax-card">
    <h4 class="parallax-card__title">{{ title }}</h4>
    <p class="parallax-card__description">{{ description }}</p>
  </div>
</template>
<script>
export default {
  name: 'ParallaxCard',
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
};

</script>
<style lang="scss" scoped>
.parallax-card {
  padding: 30px;
  border-radius: 5px;
  background-color: #ccc;
  &__title {
    font-size: 18px;
    margin-bottom: 12px;
  }
  &__description {
    font-size: 14px;
  }
}
</style>
