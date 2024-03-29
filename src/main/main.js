import './main.css'
import mapBg from '../assets/map.png'
import generatePinsData from '../utils/generatePinsData'
import renderPin from '../utils/renderPin'
import getPointerEventForThisDevice from '../utils/getPointerEventForThisDevice'
import Map from '../modules/Map/Map'

const init = () => {
  const pins = generatePinsData(30)
  const { eventStart } = getPointerEventForThisDevice()

  document.body.innerHTML = `
    <main>
      <section id="main-wrapper">
        <div id="map-wrapper" style="background-image: url('${mapBg}')">
          <div id="backdrop-filter"></div>
          <div id="map">
            <img id="map-img" src="${mapBg}" />
            ${(pins.map((pin, index) => renderPin(pin, index)).join(''))}
          </div>
        </div>
      </section>
    </main>
  `

  pins.forEach(pin => {
    if (pin.onClick) {
      document.getElementById(pin.id).addEventListener(eventStart, pin.onClick)
    }
  })

  new Map(document.getElementById('map'))
}

document.onreadystatechange = async() => {
  if (document.readyState === 'complete') {
    await init()
  }
}
