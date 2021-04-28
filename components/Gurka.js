import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
  height: 150px;
  border-radius: 16px;

  display: flex;
  justify-content: space-between;
  padding: 16px 32px;

  > img {
    width: 118px;
    height: 118px;
    border-radius: 50%;

    border: 1px solid black;
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
  }
`

const Gurka = ({ name, species }) => {
  return (
    <Container>
      <Content>
        <Texts>
          <h2>{name}</h2>
          <span>{species}</span>
        </Texts>
        <Button>Chat</Button>
      </Content>
      <img></img>
    </Container>
  )
}

export default Gurka
