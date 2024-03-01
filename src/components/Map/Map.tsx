import React, { FC } from 'react'
import { Wrapper, MapImage, EmptyBg, BackdropFilter, MapWrapper } from './styled'
import Pin, { PinProps } from './Pin'

export type Pin = PinProps

interface Props {
  mapBg?: string
  pins?: PinProps[]
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
        {pins?.map(pin => <Pin key={pin.id} {...pin} />)}
      </MapWrapper>
    </Wrapper>
  )
}

export default Map
