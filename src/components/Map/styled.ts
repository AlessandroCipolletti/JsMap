import styled from 'styled-components'
import emptyBg from './assets/empty.webp'

export const Wrapper = styled.div<{
  bgUrl?: string
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ bgUrl }) => bgUrl && `
    background-image: url(${bgUrl});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `}
`

export const EmptyBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background-image: url(${emptyBg});
  background-repeat: repeat;
  background-size: 80px;
`

export const MapImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`

export const MapWrapper = styled.div`
  z-index: 10;
`

export const BackdropFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  backdrop-filter: blur(30px);
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 1;
`
