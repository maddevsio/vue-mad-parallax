<template>
  <div class="custom-parallax-cards">
    <div
      v-for="data in cardsData"
      :key="data.title"
      class="custom-parallax-cards__item"
      v-mad-parallax="data.animationSettings"
    >
      <h4 class="custom-parallax-cards__title">{{ data.title }}</h4>
      <p class="custom-parallax-cards__description">{{ data.description }}</p>
    </div>
  </div>
</template>
<script>
import MadParallax from '@/directives/mad-parallax';

export default {
  name: 'CustomizedParallaxCards',
  directives: { MadParallax },
  data() {
    return {
      cardsData: [
        {
          title: 'Lorem ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, perspiciatis.',
          animationSettings: {
            disabled: true,
          },
        },
        {
          title: 'Lorem ipsum 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, perspiciatis.',
          animationSettings: {
            reverse: true,
            maxMove: 20,
            customMove: true,
            speed: 0.3,
            startPoint: 3,
            setIndentTop: true,
          },
        },
        {
          title: 'Lorem ipsum 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, perspiciatis.',
          animationSettings: {
            reverse: true,
            maxMove: 40,
            customMove: true,
            speed: 0.3,
            startPoint: 3,
            setIndentTop: true,
          },
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.custom-parallax-cards {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  &__item {
    width: 33.3333%;
    padding: 24px;
    background-color: #eee;
    border-radius: 8px;
  }
}
</style>
