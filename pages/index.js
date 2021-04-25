import { useImages } from '../state/hooks'
import styled from 'styled-components'
import ImageSlider from '../components/ImageSlider'

const Container = styled.div`
  margin: 0 auto;
  width: 80%;
`

export default function Home() {
  useImages()

  return (
    <Container>
      <ImageSlider />
    </Container>
  )
}
