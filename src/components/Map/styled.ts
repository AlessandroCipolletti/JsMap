import styled from 'styled-components'
import emptyBg from './assets/empty.webp'

export const Wrapper = styled.div<{
  $bgUrl?: string
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $bgUrl }) => $bgUrl && `
    background-image: url(${$bgUrl});
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
  user-select: none;
  max-height: 100%;
`

export const MapWrapper = styled.div`
  position: relative;
  z-index: 10;
  user-select: none;
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

const disabledOpacity = 0.4
export const Pin = styled.div<{
  index: number
  x: number
  y: number
  size: number
  color: string
  disabled?: boolean
  onClick?: () => void
}>`
  position: absolute;
  user-select: none;
  top: ${({ y }) => `${y}%`};
  left: ${({ x }) => `${x}%`};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: 50%;
  background-color: ${({ color }) => color};
  cursor: ${({ onClick, disabled }) => onClick && !disabled ? 'pointer' : 'default'};
  opacity: ${({ disabled }) => disabled ? disabledOpacity : 0.8};
  border: solid 2px white;
  z-index: ${({index}) => index * 10};
  transform: translate3d(-50%, -50%, 0px);
  color: white;
  line-height: ${({ size }) => `${size}px`};
  text-align: center;

  &:hover {
    opacity: ${({ disabled }) => disabled ? disabledOpacity : 1};
    z-index: 10000;
  }
`