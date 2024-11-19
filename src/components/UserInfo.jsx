import { useState } from 'react';
import styled from 'styled-components';
import background from '../assets/infopage4.png';

const UserInfo = ({ onClick, setUserInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    birthday: '',
    hometown: '',
    igid: '',
    etc: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 브라우저의 기본 새로고침 방지
    console.log('Submitted form data:', formData);
    // userInfo 상태 업데이트
    setUserInfo({ user: formData });

    // props로 전달된 onClick 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type='text'
          name='name'
          placeholder='name'
          value={formData.name}
          onChange={handleChange}
        />
        <StyledInput
          type='text'
          name='birthday'
          placeholder='Date of birth'
          value={formData.birthday}
          onChange={handleChange}
        />
        <StyledInput
          type='text'
          name='hometown'
          placeholder='Place of issue'
          value={formData.hometown}
          onChange={handleChange}
        />
        <StyledInput
          type='text'
          name='igid'
          placeholder='IG account'
          value={formData.igid}
          onChange={handleChange}
        />
        <StyledInput
          type='text'
          name='etc'
          placeholder='etc'
          value={formData.etc}
          onChange={handleChange}
          maxLength={18}
        />
        <button type='submit'>Next.</button>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 10vh;
  }

  button {
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    font-family: 'Press Start 2P', sans-serif;
    color: #fa3088;
    background-color: white;
    width: 100px;
    height: 40px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s;
    &:hover {
      background-color: #fa3088;
      color: white;
    }
  }

  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

// const StlyedButton = styled.button`

// `;

const StyledInput = styled.input`
  width: 256px;
  height: 50px;
  border-radius: 20px;
  border: #fa3088 solid 2px;
  outline: none;
  ::placeholder {
    font: helvetica;
  }
`;

export default UserInfo;
