import React, { FC } from 'react'
import { Wrapper, MapImage, EmptyBg, BackdropFilter, MapWrapper } from './styled'


interface Props {
  mapBg?: string
}

const Map: FC<Props> = ({ mapBg }) => {

  if (!mapBg) {
    return (
      <Wrapper>
        <EmptyBg />
      </Wrapper>
    )
  }

  return (
    <Wrapper bgUrl={mapBg}>
      <BackdropFilter />

      <MapWrapper>
        <MapImage src={mapBg} />
      </MapWrapper>
    </Wrapper>
  )
}

export default Map

