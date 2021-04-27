import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { imagesAtom } from '../state'
import Image from 'next/image'
import { Slider } from 'antd'
import moment from 'moment'

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
`

const ImageContainer = styled.div`
  height: 712px;
  position: relative;

  border-radius: 16px;
  overflow: hidden;

  > span {
    position: absolute;
    bottom: 8px;
    left: 8px;
    padding: 8px 16px;

    color: white;
    background-color: black;
    border-radius: 16px;
    font-size: 14px;
    font-weight: bold;
  }
`

const ImageSlider = () => {
  const images = useRecoilValue(imagesAtom)
  const [index, setIndex] = useState(0)

  if (!images.length) return null

  const image = images[index]
  return (
    <Container>
      <ImageContainer>
        <Image src={image.url} width={300} height={534} />
        <span>{moment(image.taken).format('YYYY-MM-DD HH:mm')}</span>
      </ImageContainer>
      <Slider
        value={index}
        max={images.length - 1}
        onChange={(v) => setIndex(v)}
      />
    </Container>
  )
}

export default ImageSlider
