<template>
  <div class="parallax-cards">
    <div
      v-mad-parallax
      class="parallax-cards__item"
    >
      <ParallaxCard
        v-for="data in cardsData.slice(0, 2)"
        v-bind="data"
        :key="data.title"
      />
    </div>
    <div class="parallax-cards__item">
      <ParallaxCard
        v-for="data in cardsData.slice(2)"
        v-bind="data"
        :key="data.title"
      />
    </div>
  </div>
</template>
<script>
import ParallaxCard from '@/components/ParallaxCards/ParallaxCard.vue';
import MadParallax from '@/directives/mad-parallax';

export default {
  name: 'ParallaxCards',
  components: { ParallaxCard },
  directives: { MadParallax },
  data() {
    return {
      cardsData: [
        {
          title: 'lorem ipsum',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, rem?',
        },
        {
          title: 'Lorem ipsum 2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, rem?',
        },
        {
          title: 'Lorem ipsum 3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto aut cupiditate, deserunt eius eligendi, eum excepturi facilis hic illum, iste nihil quaerat reprehenderit ullam veniam.',
        },
        {
          title: 'Lorem ipsum 4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cupiditate deleniti dolores dolorum fuga laudantium praesentium repudiandae. Aliquam asperiores assumenda consequuntur dignissimos doloribus error facilis, iusto laudantium non, quasi sunt.',
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.parallax-cards {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  &__item {
    width: 50%;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
  }
}
</style>
