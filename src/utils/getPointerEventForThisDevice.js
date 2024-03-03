const getPointerEventForThisDevice = () => {
  if ('ontouchstart' in window) {
    return {
      eventStart: 'touchstart',
      eventMove: 'touchmove',
      eventEnd: 'touchend',
      eventCancel: 'touchcancel',
    }
  } else {
    return {
      eventStart: 'pointerdown',
      eventMove: 'pointermove',
      eventEnd: 'pointerup',
      eventCancel: 'pointercancel',
    }
  }
}

export default getPointerEventForThisDevice
