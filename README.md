# Mad Parallax Directive For Vue.JS 2

#### Demo

[CodeSandBox](https://codesandbox.io/s/small-glade-4h2mg0)

## How to use

Very simple use.
You need to create a folder ```src/directives``` and copy the file ```./src/directives/mad-parallax.js``` to your directory

The default directive, without options, works with two columns as in the screenshot

![Two colums](https://i.imgur.com/U1787mN.png)

The directive is given to the block, which is assumed to be smaller in height than the neighboring one.
For example, in this case, the markup should be as follows:

```vue
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
```

The directive must be included in the component script:

```vue
import MadParallax from '@/directives/mad-parallax';

export default {
  name: 'ParallaxCards',
  components: { ParallaxCard },
  directives: { MadParallax },
```

And use it on the card that should have a parallax effect, as in the example above.

```
v-mad-parallax
```

Data for the formation of cards can be any, the main thing is that it be an array with objects. These cards illustrate one use case, but the point is to have two columns with cards of different heights.
The array is split using slice into columns into as many cards as needed in each of the columns

```
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
```

Using FlexBox or Grid CSS, it doesn't matter that the column that parallax is set to must have the property ```align-self: flex-start```. To correctly calculate automatically the number of pixels by which to shift the column down, adjusting it to the next one.


##Custom Parallax Effect

The directive supports the options described below:

| Option       | Type      | Default   | Description                                                        |
|--------------|-----------|-----------|--------------------------------------------------------------------|
| `speed`      | `number`  | **0.1**   | Speed for animation                                                |
| `direction`  | `string`  | **y**     | Direction for `transform: translate`                               |
| `mobileSize` | `number`  | **976**   | Disable parallax when window size < mobileSize                     |
| `maxMove`    | `number`  | **0**     | For custom move in px                                              |
| `reverse`    | `boolean` | **false** | For negative move                                                  |
| `customMOve` | `boolean` | **false** | For enable custom move                                             |
| `startPoint` | `number`  | **1.5**   | From which part of the block to start the animation when scrolling |
| `disabled`   | `boolean` | **false** | For disable parallax                                               |
| `prlx3d`     | `boolean` | **false** | For really big image with 3d transform parallax                    |

One use case could be, for example, the following effect of sequentially popping up blocks from under the viewport:

![Custom prlx](https://i.imgur.com/iDzo8iw.png)
![Custom prlx 2](https://i.imgur.com/Kr0G2Mr.png)


In the case of options, the directive can be used on any number of elements and on any element in principle. All you need to do is set the element to ```v-mad-parallax``` and set the necessary options.

For example:

```vue
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
```

Here, three cards are rendered in the array, each of them is given options:

```
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
```

For the first card, we disabled the parallax animation. The second card was set to float at 20px, and the third at 40px. We also set startPoint: 3 so that the animation starts when the elements are barely visible in the viewport.

