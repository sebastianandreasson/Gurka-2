import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { imagesAtom } from '../state'
import Image from 'next/image'
import { Slider } from 'antd'

const Container = styled.div``

const ImageSlider = () => {
  const images = useRecoilValue(imagesAtom)
  const [index, setIndex] = useState(0)

  if (!images.length) return null

  const image = images[index]
  return (
    <Container>
      <Image src={image.url} width={250} height={500} />
      {image.taken}
      <Slider
        value={index}
        max={images.length - 1}
        onChange={(v) => setIndex(v)}
      />
    </Container>
  )
}

export default ImageSlider
