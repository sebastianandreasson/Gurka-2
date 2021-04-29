import { useGurkor, useImages, useProfilePictures } from '../state/hooks'
import styled from 'styled-components'
import ImageSlider from '../components/ImageSlider'
import Header from '../components/Header'
import Gurka from '../components/Gurka'
import { laptop, mobile, smallLaptop, tablet } from '../utils/layout'

const Container = styled.div`
  background-color: #d9f9a5;
  padding-bottom: 100px;
`

const Content = styled.div`
  margin: 32px auto;
  width: 80%;

  display: flex;

  ${laptop()} {
    width: 95%;
  }

  ${tablet()} {
    flex-direction: column;
    align-items: center;
  }
`

const List = styled.div`
  flex: 1;
  margin: 0 64px;
  display: flex;
  flex-direction: column;

  > h1 {
    font-weight: 800;
    font-size: 48px;
    color: #33261d;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 32px;

  ${smallLaptop()} {
    grid-template-columns: 1fr;
  }
`

export default function Home() {
  useImages()
  useProfilePictures()
  const gurkor = useGurkor()

  return (
    <Container>
      <Header />
      <Content>
        <ImageSlider />
        <List>
          <Grid>
            {gurkor.map((g) => (
              <Gurka {...g} />
            ))}
          </Grid>
        </List>
      </Content>
    </Container>
  )
}
