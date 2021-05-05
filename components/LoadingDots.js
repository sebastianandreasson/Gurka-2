import styled from 'styled-components'

const Container = styled.div`
  margin-left: 12px;
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #33261d;
  color: #33261d;
  animation: dotElastic 1s infinite linear;

  ::before,
  ::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0;
  }
  ::before {
    left: -15px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: #33261d;
    color: #33261d;
    animation: dotElasticBefore 1s infinite linear;
  }
  ::after {
    left: 15px;
    width: 8px;
    height: 8px;
    border-radius: 5px;
    background-color: #33261d;
    color: #33261d;
    animation: dotElasticAfter 1s infinite linear;
  }

  @keyframes dotElasticBefore {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1.5);
    }
    50% {
      transform: scale(1, 0.67);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes dotElastic {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 1.5);
    }
    75% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  @keyframes dotElasticAfter {
    0% {
      transform: scale(1, 1);
    }
    25% {
      transform: scale(1, 1);
    }
    50% {
      transform: scale(1, 0.67);
    }
    75% {
      transform: scale(1, 1.5);
    }
    100% {
      transform: scale(1, 1);
    }
  }
`

const LoadingDots = () => {
  return <Container></Container>
}

export default LoadingDots
