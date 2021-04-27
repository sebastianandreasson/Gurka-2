import { useImages } from '../state/hooks'
import styled from 'styled-components'
import ImageSlider from '../components/ImageSlider'
import Header from '../components/Header'

const Container = styled.div`
  background-color: #d9f9a5;
`

const Content = styled.div`
  margin: 32px auto;
  width: 80%;
`

export default function Home() {
  useImages()

  return (
    <Container>
      <Header />
      <Content>
        <ImageSlider />
      </Content>
    </Container>
  )
}
