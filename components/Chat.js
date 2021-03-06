import { Button, Input } from 'antd'
import React, { useState, useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  activeChatSelector,
  activeGurkaSelector,
  ageOfGurkSelector,
  chatsAtom,
  currentlyChattingAtom,
} from '../state'
import styled from 'styled-components'
import { tablet } from '../utils/layout'
import { sendChatMessage } from '../state/api'
import { CloseOutlined } from '@ant-design/icons'
import LoadingDots from './LoadingDots'

const Container = styled.div`
  transition: all ease-in-out 250ms;
  position: fixed;
  bottom: 0;
  right: 100px;

  background-color: #fafafa;
  width: 350px;
  height: 450px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 16px 16px 0 0;

  overflow: hidden;

  display: flex;
  flex-direction: column;

  ${tablet()} {
    width: 100%;
    right: 0;
  }
`

const TopBar = styled.div`
  width: 100%;
  height: 40px;
  background-color: #33261d;
  color: white;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > span {
    font-weight: bold;
    font-size: 16px;
  }
`

const BottomBar = styled.div`
  width: 332px;
  margin: 8px;
  position: fixed;
  bottom: 0;

  > form {
    display: flex;
    > button {
      margin-left: 16px;
    }
  }

  ${tablet()} {
    width: 90%;
  }
`

const Messages = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
  padding: 0 16px;
  margin-bottom: 64px;
`

const MessageText = styled.span`
  margin-top: 8px;
  padding: 8px;
  background-color: #d9f9a5;
  border-radius: 4px;
  max-width: 250px;

  ${({ fromUser }) =>
    fromUser &&
    `
    align-self: flex-end;
    background-color: #473335;
    color: white;
  `}

  ${({ loading }) =>
    loading &&
    `
    width: 60px;
    padding: 12px;
  `}
`

const AlwaysScrollToBottom = () => {
  const elementRef = useRef()
  useEffect(() => elementRef.current.scrollIntoView())
  return <div ref={elementRef} />
}

const Chat = () => {
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [, setActiveChat] = useRecoilState(currentlyChattingAtom)
  const gurka = useRecoilValue(activeGurkaSelector)
  const age = useRecoilValue(ageOfGurkSelector)
  const [, setChats] = useRecoilState(chatsAtom)
  const chat = useRecoilValue(activeChatSelector)

  const onClick = async () => {
    const request = {
      name: gurka.name,
      personality: gurka.personality,
      age,
      message,
      chatHistory: chat,
    }
    setChats((chats) => ({
      ...chats,
      [gurka.name]: [...chat, { from: 'Human', text: message }],
    }))
    setMessage('')
    setLoading(true)
    const response = await sendChatMessage(request)
    setChats((chats) => ({
      ...chats,
      [gurka.name]: [
        ...chats[gurka.name],
        { from: gurka.name, text: response.text },
      ],
    }))
    setLoading(false)
  }

  return (
    <Container>
      <TopBar>
        <span>{gurka.name}</span>
        <CloseOutlined onClick={() => setActiveChat(null)} />
      </TopBar>
      <Messages>
        {chat.map((msg) => (
          <MessageText fromUser={msg.from === 'Human'}>{msg.text}</MessageText>
        ))}
        {loading && (
          <MessageText loading>
            <LoadingDots />
          </MessageText>
        )}
        <AlwaysScrollToBottom />
      </Messages>
      <BottomBar>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onClick()
          }}
        >
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></Input>
          <Button onClick={() => onClick()}>Send</Button>
        </form>
      </BottomBar>
    </Container>
  )
}

export default Chat
