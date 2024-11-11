import styled from 'styled-components';
import background from '../assets/bkimg2.png';

const UserInfo = ({ onClick }) => {
  return (
    <Wrapper>
      <h1>정보 입력</h1>
      <input type='text' placeholder='이름' />
      <input type='number' placeholder='전화번호' />
      <input type='email' placeholder='이메일' />
      ...등등 추가가능 / input 창 디자인 수정가능
      <button onClick={onClick}>다음</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px 0 10px blue;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;

  input {
    width: 300px;
    height: 40px;
  }

  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default UserInfo;
