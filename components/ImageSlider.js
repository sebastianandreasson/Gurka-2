import { useState, useEffect } from 'react'
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

let imageCache = {}
const ImageSlider = () => {
  const images = useRecoilValue(imagesAtom)
  const [index, setIndex] = useState(images.length ? images.length - 1 : 0)

  useEffect(() => {
    if (!images.length) return
    const from = Math.max(0, index - 10)
    const to = Math.min(images.length, index + 10)

    for (let i = from; i < to; i++) {
      if (!imageCache[i]) {
        const preloadImage = new window.Image()
        preloadImage.src = `/_next/image?url=${encodeURIComponent(
          images[i].url
        )}&w=828&q=75`
        imageCache[i] = preloadImage
      }
    }
  }, [images, index])

  if (!images.length) return null

  const image = images[index]
  return (
    <Container>
      <ImageContainer>
        <Image src={image.url} width={400} height={712} priority />
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
