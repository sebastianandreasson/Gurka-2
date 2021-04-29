import { Button } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { profilePictureSelector } from '../state'
import styled from 'styled-components'
import { tablet } from '../utils/layout'

const Container = styled.div`
  background-color: #fafafa;
  max-width: 500px;
  height: 150px;
  border-radius: 16px;

  display: flex;
  justify-content: space-between;
  padding: 16px 32px;

  ${tablet()} {
    min-width: 400px;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`

const Texts = styled.div`
  display: flex;
  flex-direction: column;

  > h2 {
    margin: 0;
    line-height: 25px;
    font-weight: 600;
  }
  > span {
    font-weight: 200;
    font-style: italic;
  }
`

const topLeft = {
  x: 145,
  y: 100,
}

const ProfilePicture = styled.div`
  position: relative;
  width: 118px;
  height: 118px;
  border-radius: 50%;

  border: 2px solid #33261d;
  overflow: hidden;

  > img {
    width: 400px;
    height: auto;
    left: -${({ x }) => topLeft.x + x}px;
    top: -${({ y }) => topLeft.y + y}px;
    position: absolute;
  }
`

const offsetForPosition = (pos) => {
  switch (pos) {
    case 0:
      return { x: 0, y: 0 }
    case 1:
      return { x: 85, y: 0 }
    case 2:
      return { x: 0, y: 110 }
    case 3:
      return { x: 85, y: 102 }
    case 4:
      return { x: 0, y: 220 }
    case 5:
      return { x: 95, y: 215 }
    case 6:
      return { x: 0, y: 330 }
    case 7:
      return { x: 90, y: 325 }
    case 8:
      return { x: 10, y: 425 }
    case 9:
      return { x: 90, y: 425 }
    default:
      return { x: 0, y: 0 }
  }
}

const Gurka = ({ name, species, position }) => {
  const profilePicture = useRecoilValue(profilePictureSelector)

  return (
    <Container>
      <Content>
        <Texts>
          <h2>{name}</h2>
          <span>{species}</span>
        </Texts>
        <Button onClick={() => alert('coming soon...?')}>Chat 🥒 </Button>
      </Content>
      <ProfilePicture {...offsetForPosition(position)}>
        <img src={profilePicture ? profilePicture.url : ''}></img>
      </ProfilePicture>
    </Container>
  )
}

export default Gurka
