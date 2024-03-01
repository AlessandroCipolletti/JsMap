import React, { FC } from 'react'

export interface PinProps {
  id: string
  x: number
  y: number
  size: number
  color: string
  disabled?: boolean
  onClick?: () => void
}


const Pin: FC<PinProps> = () => {
  return (
    <div>Pin</div>
  )
}

export default Pin