/* eslint-disable */
export const setCustomProperties = (elem, options, elemInToView, parentHeight) => {
  if (options.prlx3d) {
    const { top, bottom } = elem.getBoundingClientRect()
    if (top < window.scrollY && bottom > 0) {
      elem.style.transform = `translate3d(0, ${elemInToView}px, 0)`
    }
  } else {
    let maxMove = options.maxMove || elem.getBoundingClientRect().height
    let scrollAnimation = elemInToView
    if (options.reverse) {
      scrollAnimation = -elemInToView
      if (Math.sign(maxMove) !== -1) {
        maxMove = -maxMove
      }
    }
    if (elemInToView < 0) {
      elem.style.transform = `translate${options.direction.toUpperCase()}(0px)`
    } else if (elemInToView + Math.abs(maxMove) + parentHeight < window.scrollY) {
      elem.style.transform = `translate${options.direction.toUpperCase()}(${maxMove}px)`
    }
    if (elemInToView >= 0 && elemInToView <= Math.abs(maxMove)) {
      elem.style.transform = `translate${options.direction.toUpperCase()}(${scrollAnimation}px)`
    }
  }
}

export const parallaxScrollHandler = (elem, options) => {
  if (elem.target !== document) {
    const elemInToView = window.innerHeight - (
      elem.getBoundingClientRect().top + (elem.getBoundingClientRect().height / options.startPoint)
    )
    const parentHeight = elem.parentElement.getBoundingClientRect().height
    elem.style.transition = `transform ${options.speed}s ease-out`
    // DEFAULT WORK WITH CARDS IN TWO COLUMNS
    if (!options.customMove) {
      const pxToMove = parentHeight - elem.getBoundingClientRect().height
      if (elemInToView < 0) {
        elem.style.transform = 'translateY(0px)'
      }

      if (elemInToView >= 0 && elemInToView <= pxToMove) {
        elem.style.transform = `translateY(${elemInToView}px)`
      } else if(elemInToView > pxToMove) {
        elem.style.transform = `translateY(${pxToMove}px)`
      }

    } else {
      // CUSTOM PARALLAXES DEPENDING ON THE PASSED OPTIONS
      setCustomProperties(elem, options, elemInToView, parentHeight)
    }
  }
}
// CHECK FOR RESIZE
export const checkIsMobileSize = (elem, options) => {
  if (window.innerWidth <= options.mobileSize) {
    elem.style.transform = `translate${options.direction.toUpperCase()}(0px)`
    // eslint-disable-next-line no-use-before-define
    window.removeEventListener('scroll', onScroll)
  } else {
    // eslint-disable-next-line no-use-before-define
    window.addEventListener('scroll', onScroll)
  }
}

let elems = []
let options = {}

// WRAPPER FUNCTIONS FOR REMOVING EVENT LISTENERS
export const onScroll = (event, elemsProp = elems) => {
  for (const elem of elemsProp) {
    parallaxScrollHandler(elem.el, elem.options)
  }
}

export const onResize = () => {
  for (const elem of elems) {
    checkIsMobileSize(elem.el, elem.options)
  }
}

const MadParallax = {
  bind(el, binding) {
    options = {
      speed: binding.value?.speed || 0.1, // Speed for animation
      direction: binding.value?.direction || 'y', // Direction for transform
      mobileSize: binding.value?.mobileSize || 976, // Disable parallax when window size < mobileSize
      maxMove: binding.value?.maxMove || 0, // For custom move in px
      reverse: binding.value?.reverse || false, // For negative move
      customMove: binding.value?.customMove || false, // For enable custom move
      startPoint: binding.value?.startPoint || 1.5, // From which part of the block to start the animation when scrolling
      disabled: binding.value?.disabled || false, // For disable parallax
      prlx3d: binding.value?.prlx3d || false, // For big image with 3d transform parallax
    }
    if (!options.disabled) {
      if (options.reverse) {
        options.maxMove = -options.maxMove
      }
      if (binding.value?.setIndentTop) {
        el.style.position = 'relative'
        el.style.top = `${Math.abs(options.maxMove)}px`
      }
      if (elems.length === 0) {
        window.addEventListener('scroll', onScroll)
        window.addEventListener('resize', onResize)
      }
      elems.push({
        el,
        options,
      })
      onResize()
    }
  },
  unbind(el) {
    elems = elems.filter(element => element.el !== el)
    if (elems.length === 0) {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  },
}

export default MadParallax
