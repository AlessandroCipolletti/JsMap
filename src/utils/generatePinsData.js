import { v4 as uuid } from 'uuid'
import getRandomNumber from 'js-math-and-ui-utils/mathUtils/getRandomNumber'

const colors = ['red', 'blue', 'green']

const generateOnePin = (id, index, label, disabled = false) => {
  return {
    id,
    label,
    x: getRandomNumber(0, 100, 0),
    y: getRandomNumber(0, 100, 0),
    size: 30,
    color: colors[index % colors.length],
    disabled,
    onClick: (e) => {
      e.stopPropagation()
      e.preventDefault()
      alert(`Pin ${label} clicked`)
    },
  }
}

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

const generatePinsData = (count) => {
  return Array.from({ length: count }, (_, index) => {
    return generateOnePin(uuid(), index, labels[index % labels.length], index < count / 4)
  })
}

export default generatePinsData
