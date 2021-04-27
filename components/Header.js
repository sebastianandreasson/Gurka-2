import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const Container = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #33261d;

  > img {
    height: 100%;
  }
`

const Header = () => {
  return (
    <Container>
      <img src="/img/logo.png" />
    </Container>
  )
}

export default Header
