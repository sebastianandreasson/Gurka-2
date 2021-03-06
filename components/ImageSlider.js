import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { imagesAtom } from '../state'
import { Slider } from 'antd'
import moment from 'moment'
import { mobile } from '../utils/layout'

const Container = styled.div`
  min-width: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;

  ${mobile()} {
    min-width: 100%;
    width: 100%;
  }
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

  ${mobile()} {
    height: 570px;
  }
`

let imageCache = {}
const ImageSlider = () => {
  const images = useRecoilValue(imagesAtom)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length) setIndex(images.length - 1)
  }, [images, setIndex])

  useEffect(() => {
    if (!images.length) return
    const from = Math.max(0, index - 10)
    const to = Math.min(images.length, index + 10)

    for (let i = from; i < to; i++) {
      if (!imageCache[i]) {
        const preloadImage = new window.Image()
        preloadImage.src = images[i].url
        imageCache[i] = preloadImage
      }
    }
  }, [images, index])

  if (!images.length) return null

  const image = images[index]
  return (
    <Container>
      <ImageContainer>
        <img src={image.url} width={400} height={712} />
        <span>{moment(image.date).format('YYYY-MM-DD HH:mm')}</span>
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
