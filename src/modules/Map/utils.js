import translateCoords from 'js-math-and-ui-utils/mathUtils/translateCoords'
import rotateCoords from 'js-math-and-ui-utils/mathUtils/rotateCoords'
import convertAngleDegreesToRadians from 'js-math-and-ui-utils/mathUtils/convertAngleDegreesToRadians'
import roundNumber from 'js-math-and-ui-utils/mathUtils/roundNumber'

export const getOriginalCoordsFromScaleRotation = (x, y, originX, originY, scale, rotation) => {
  [x, y] = translateCoords(x, y, -originX, -originY);
  [x, y] = rotateCoords(x, y, convertAngleDegreesToRadians(rotation))
  return [roundNumber(x / scale, 1), roundNumber(y / scale, 1)]
}

export const mergeConfigObject = (state, props) => {
  for (const key in props) {
    if (typeof state[key] !== 'undefined') {
      state[key] = props[key]
    }
  }
}
