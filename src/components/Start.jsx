import styled from 'styled-components';
import background from '../assets/startImage.png';

const Start = () => {
  return (
    <Wrapper>
      <div>
        <h1>Room 20</h1>
      </div>
      <p>이곳은 시작페이지 예시 화면</p>
      <p>시작페이지 디자인 만들어서 보내주면 수정가능</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px 0 10px black;

  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  /* background-position: center; 이미지 위치 조정 */
  background-repeat: no-repeat; /* 반복 방지 */
`;

export default Start;
