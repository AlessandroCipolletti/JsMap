import './map.css'
import debounce from 'debounce'
import multiTouchMultiDeviceEventsHandlers from 'js-math-and-ui-utils/uiUtils/multiTouchMultiDeviceEventsHandlers'
import getEventCoordX from 'js-math-and-ui-utils/domUtils/getEventCoordX'
import getEventCoordY from 'js-math-and-ui-utils/domUtils/getEventCoordY'
import roundNumber from 'js-math-and-ui-utils/mathUtils/roundNumber'
import getNumberInBetween from 'js-math-and-ui-utils/mathUtils/getNumberInBetween'
import { getOriginalCoordsFromScaleRotation, mergeConfigObject } from './utils'

const centerPoint = document.createElement('div')
centerPoint.classList.add('map-center-point')

const originPoint = document.createElement('div')
originPoint.classList.add('map-origin-point')

const initialZoomState = {
  initialScale: 1,
  originCoordX: 0,
  originCoordY: 0,
  centerCoordX: 0,
  centerCoordY: 0,
  translateX: 0,
  translateY: 0,
  dragStartX: 0,
  dragStartY: 0,
  translateStartX: 0,
  translateStartY: 0,
  transformOriginX: 0,
  transformOriginY: 0,
  scale: 1,
  rotation: 0,
}

class Map {
  #wrapper = null
  #center = null
  #origin = null
  #config = {
    maxScale: 5.0,
    minScale: 0.3,
  }
  #state = {
    wrapperOffset: {
      left: 0,
      top: 0,
    },
    currentTouch: {
      isZooming: false,
      zoomDragChanged: false,
    },
    zoom: structuredClone(initialZoomState),
  }

  constructor(wrapper, config = {}) {
    if (wrapper) {
      this.#wrapper = wrapper
      this.#center = centerPoint.cloneNode(true)
      this.#origin = originPoint.cloneNode(true)
      this.#wrapper.appendChild(this.#center)
      this.#wrapper.appendChild(this.#origin)
      this.#initCanvasCenter()
      this.#onResize()
      window.addEventListener('resize', debounce(this.#onResize, 150))
      mergeConfigObject(this.#config, config)
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
        // onWheel: this.#onWheel,
      })
    }
  }

  #onSingleTouchStart = (e, touchEvent) => {
    // console.log('onSingleTouchStart', e, touchEvent)
    this.#onGestureStart(
      getEventCoordX(touchEvent, this.#state.wrapperOffset.left, true),
      getEventCoordY(touchEvent, this.#state.wrapperOffset.top, true)
    )
  }

  #onSingleTouchMove = (e, touchEvent) => {
    // console.log('onSingleTouchMove', e, touchEvent)
    this.#onGestureChange(
      getEventCoordX(touchEvent, this.#state.wrapperOffset.left),
      getEventCoordY(touchEvent, this.#state.wrapperOffset.top),
      1,
      0
    )
  }

  #onSingleTouchEnd = (e) => {
    // console.log('onSingleTouchEnd', e)
    this.#onGestureEnd(0, 0, 1, 0)
  }

  #onOneFingerSingleTap = (e, touchEvent) => {
    console.log('onOneFingerSingleTap', e, touchEvent)
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
    // console.log('onGestureStart', x, y, scale, rotation)
    x = roundNumber(x - this.#state.wrapperOffset.left, 1)
    y = roundNumber(y - this.#state.wrapperOffset.top, 1)
    this.#state.currentTouch.isZooming = true
    const [X, Y] = getOriginalCoordsFromScaleRotation(x, y, this.#state.zoom.originCoordX, this.#state.zoom.originCoordY, this.#state.zoom.scale, this.#state.zoom.rotation)
    this.#wrapper.style.transition = 'none'
    this.#state.zoom.translateX = roundNumber((x - X), 1)
    this.#state.zoom.translateY = roundNumber((y - Y), 1)
    this.#state.zoom.translateStartX = this.#state.zoom.translateX
    this.#state.zoom.translateStartY = this.#state.zoom.translateY
    this.#state.zoom.dragStartX = x
    this.#state.zoom.dragStartY = y
  }

  #onGestureChange = (x, y, scale, rotation) => {
    // console.log('onGestureChange', x, y, scale, rotation)
    // this handles both two fingers gesture change and one finger zoom drag
    scale = getNumberInBetween(roundNumber(this.#state.zoom.scale * scale, 4), this.#config.maxScale, this.#config.minScale)
    rotation = roundNumber(this.#state.zoom.rotation + rotation, 4)
    x = roundNumber(x - this.#state.wrapperOffset.left, 1)
    y = roundNumber(y - this.#state.wrapperOffset.top, 1)
    this.#state.currentTouch.zoomDragChanged = true
    const dx = x - this.#state.zoom.dragStartX
    const dy = y - this.#state.zoom.dragStartY
    this.#state.zoom.translateX = roundNumber(this.#state.zoom.translateStartX + dx, 1)
    this.#state.zoom.translateY = roundNumber(this.#state.zoom.translateStartY + dy, 1)
    this.#state.zoom.transformOriginX = x
    this.#state.zoom.transformOriginY = y
    this.#updateZoomCss(scale, rotation)
  }

  #onGestureEnd = (x, y, scale, rotation) => {
    // console.log('onGestureEnd', x, y, scale, rotation)
    // this handles both two fingers gesture end and one finger zoom drag
    if (!this.#state.currentTouch.zoomDragChanged) {
      return
    }
    this.#state.currentTouch.zoomDragChanged = false
    scale = getNumberInBetween(roundNumber(this.#state.zoom.scale * scale, 4), this.#config.maxScale, this.#config.minScale)
    rotation = roundNumber((this.#state.zoom.rotation + rotation) % 360, 4)
    this.#state.currentTouch.isZooming = false

    const centerRect = this.#center.getBoundingClientRect()
    const centerShiftX = roundNumber(Math.abs(this.#state.zoom.centerCoordX - centerRect.left))
    const centerShiftY = roundNumber(Math.abs(this.#state.zoom.centerCoordY - centerRect.top))

    if (
      Math.abs(roundNumber(scale - this.#state.zoom.initialScale, 2)) < 0.1 &&
      (Math.abs(rotation) <= 5 || Math.abs(Math.abs(rotation) - 360) <= 5) &&
      centerShiftX < 150 &&
      centerShiftY < 150
    ) {
      // the current zoom/position at the end of the gesture is near the inizial zoom/position
      // so I can reset canvas zoom/position
      this.#wrapper.style.transition = 'transform 0.25s, transform-origin 0.25s'
      scale = this.#state.zoom.initialScale
      rotation = 0
      this.#state.zoom = {
        ...initialZoomState,
        scale,
        rotation,
        offset: this.#state.zoom.offset,
        width: this.#state.zoom.width,
        height: this.#state.zoom.height,
        centerCoordX: this.#state.zoom.centerCoordX,
        centerCoordY: this.#state.zoom.centerCoordY,
      }
    } else {
      const originRect = this.#origin.getBoundingClientRect()
      this.#state.zoom = {
        ...this.#state.zoom,
        scale,
        rotation,
        dragStartX: 0,
        dragStartY: 0,
        originCoordX: roundNumber(originRect.left - this.#state.wrapperOffset.left, 1),
        originCoordY: roundNumber(originRect.top - this.#state.wrapperOffset.top, 1),
      }
    }
    this.#updateZoomCss()
  }

  #onWheel = (e) => {
    console.log('onWheel', e)
  }

  #updateZoomCss = (scale = this.#state.scale, rotation = this.#state.rotation) => {
    this.#wrapper.style.transformOrigin = `${this.#state.transformOriginX}px ${this.#state.transformOriginY}px`
    this.#wrapper.style.transform = `
      scale3d(${scale}, ${scale}, 1)
      rotate3d(0, 0, 1, ${rotation}deg)
      translate3d(${this.#state.zoom.translateX}px, ${this.#state.zoom.translateY}px, 0px)
    `
  }

  #initCanvasCenter = () => {
    const centerRect = this.#center.getBoundingClientRect()
    this.#state.zoom.centerCoordX = roundNumber(centerRect.left)
    this.#state.zoom.centerCoordY = roundNumber(centerRect.top)
  }

  #onResize = () => {
    const wrapperRect = this.#wrapper.getBoundingClientRect()
    this.#state.wrapperOffset = {
      left: roundNumber(wrapperRect.left, 0),
      top: roundNumber(wrapperRect.top, 0),
    }
  }
}

export default Map
