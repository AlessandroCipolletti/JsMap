import React, { FC } from 'react'
import { Wrapper, MapImage, EmptyBg, BackdropFilter, MapWrapper, Pin } from './styled'

export type Pin = {
  id: string
  label: string
  x: number
  y: number
  size: number
  color: string
  disabled?: boolean
  onClick?: () => void
}

interface Props {
  mapBg?: string
  pins?: Pin[]
  dragPins?: boolean
}

const Map: FC<Props> = ({
  mapBg,
  pins,
  // dragPins = true,
}) => {

  if (!mapBg) {
    return (
      <Wrapper>
        <EmptyBg />
      </Wrapper>
    )
  }

  return (
    <Wrapper $bgUrl={mapBg}>
      <BackdropFilter />

      <MapWrapper>
        <MapImage src={mapBg} />
        {pins?.map((pin, index) => (
          <Pin
            key={pin.id}
            index={index}
            {...pin}
          >
            {pin.label}
          </Pin>
        ))}
      </MapWrapper>
    </Wrapper>
  )
}

export default Map
