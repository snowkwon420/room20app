import styled from 'styled-components';
import background from '../assets/startpage.png';
import startIcon from '../assets/room203d.gif';

const Start = () => {
  return (
    <Wrapper>
      <img src={startIcon} alt='Animated GIF' style={{ width: '1000px' }} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px 0 10px black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    font-size: 100px;
    color: white;
    margin-top: 10vh;
  }

  p {
    font-size: 30px;
    font-weight: bold;
  }

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* 반복 방지 */
`;

export default Start;
