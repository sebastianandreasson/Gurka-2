import { useGurkor, useImages } from '../state/hooks'
import styled from 'styled-components'
import ImageSlider from '../components/ImageSlider'
import Header from '../components/Header'
import Gurka from '../components/Gurka'

const Container = styled.div`
  background-color: #d9f9a5;
`

const Content = styled.div`
  margin: 32px auto;
  width: 80%;

  display: flex;
`

const List = styled.div`
  flex: 1;
  margin: 0 64px;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 48px;
    color: #33261d;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;
`

export default function Home() {
  useImages()
  const gurkor = useGurkor()

  return (
    <Container>
      <Header />
      <Content>
        <ImageSlider />
        <List>
          <h1>Gurkor</h1>
          <Grid>
            {[...gurkor, ...gurkor, ...gurkor].map((g) => (
              <Gurka {...g} />
            ))}
          </Grid>
        </List>
      </Content>
    </Container>
  )
}
