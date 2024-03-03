import multiTouchMultiDeviceEventsHandlers from 'js-math-and-ui-utils/uiUtils/multiTouchMultiDeviceEventsHandlers'

class Map {
  #state = {

  }

  #onSingleTouchStart = (e, touch) => {
    console.log('onSingleTouchStart', e, touch)
  }

  #onSingleTouchMove = (e, touch) => {
    console.log('onSingleTouchMove', e, touch)
  }

  #onSingleTouchEnd = (e) => {
    console.log('onSingleTouchEnd', e)
  }

  #onOneFingerSingleTap = (e, touch) => {
    console.log('onOneFingerSingleTap', e, touch)
  }

  #onTwoFingersSingleTap = (e, touches) => {
    console.log('onTwoFingersSingleTap', e, touches)
  }

  #onThreeFingersSingleTap = (e, touches) => {
    console.log('onThreeFingersSingleTap', e, touches)
  }

  #onFourFingersSingleTap = (e, touches) => {
    console.log('onFourFingersSingleTap', e, touches)
  }

  #onOneFingerLongPress = (e, touch) => {
    console.log('onOneFingerLongPress', e, touch)
  }

  #onGestureStart = (x, y, scale, rotation) => {
    console.log('onGestureStart', x, y, scale, rotation)
  }

  #onGestureChange = (x, y, scale, rotation) => {
    console.log('onGestureChange', x, y, scale, rotation)
  }

  #onGestureEnd = (x, y, scale, rotation) => {
    console.log('onGestureEnd', x, y, scale, rotation)
  }

  #onWheel = (e) => {
    console.log('onWheel', e)
  }

  constructor(wrapper) {
    if (wrapper) {
      multiTouchMultiDeviceEventsHandlers(wrapper, {
        onSingleTouchStart: this.#onSingleTouchStart,
        onSingleTouchMove: this.#onSingleTouchMove,
        onSingleTouchEnd: this.#onSingleTouchEnd,
        onOneFingerSingleTap: this.#onOneFingerSingleTap,
        onTwoFingersSingleTap: this.#onTwoFingersSingleTap,
        onThreeFingersSingleTap: this.#onThreeFingersSingleTap,
        onFourFingersSingleTap: this.#onFourFingersSingleTap,
        onOneFingerLongPress: this.#onOneFingerLongPress,
        onGestureStart: this.#onGestureStart,
        onGestureChange: this.#onGestureChange,
        onGestureEnd: this.#onGestureEnd,
        onWheel: this.#onWheel,
      })
    }
  }

}

export default Map
