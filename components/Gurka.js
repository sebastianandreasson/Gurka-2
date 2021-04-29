import { Button } from 'antd'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { profilePictureSelector } from '../state'
import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
  height: 150px;
  border-radius: 16px;

  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
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

  border: 1px solid black;
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
    default:
      return { x: 0, y: 0 }
  }
}

const Gurka = ({ name, species, position }) => {
  console.log({ name, species, position })
  const profilePicture = useRecoilValue(profilePictureSelector)

  return (
    <Container>
      <Content>
        <Texts>
          <h2>
            {name} - {position}
          </h2>
          <span>{species}</span>
        </Texts>
        <Button>Chat</Button>
      </Content>
      <ProfilePicture {...offsetForPosition(position)}>
        <img src={profilePicture.url}></img>
      </ProfilePicture>
    </Container>
  )
}

export default Gurka
