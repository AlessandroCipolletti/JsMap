const getPinClass = (pin) => {
  const classes = ['pin']
  if (pin.disabled) {
    classes.push('disabled')
  }
  if (pin.selected) {
    classes.push('selected')
  }
  if (pin.onClick) {
    classes.push('clickable')
  }
  return classes.join(' ')
}

const getPinStyle = (pin, index) => {
  const styles = []
  if (pin.x >= 0) {
    styles.push(`left: ${pin.x}%`)
  }
  if (pin.y >= 0) {
    styles.push(`top: ${pin.y}%`)
  }
  if (pin.color) {
    styles.push(`background-color: ${pin.color}`)
  }
  if (pin.size) {
    styles.push(`width: ${pin.size}px`)
    styles.push(`height: ${pin.size}px`)
    styles.push(`line-height: ${pin.size}px`)
  }
  if (index >= 0) {
    styles.push(`z-index: ${index * 10}`)
  }
  return styles.join('; ')
}

const renderPin = (pin, index) => `
  <div class="${getPinClass(pin)}" style="${getPinStyle(pin, index)}">${pin.label}</div>
`

export default renderPin
