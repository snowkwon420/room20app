import { useState } from 'react';
import styled from 'styled-components';
import background from '../assets/bkimg2.png';

const UserInfo = ({ onClick, setUserInfo }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
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
      <h1>정보 입력</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='이름'
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type='text'
          name='number'
          placeholder='전화번호'
          value={formData.number}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='이메일'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='text'
          name='etc'
          placeholder='기타 정보'
          value={formData.etc}
          onChange={handleChange}
        />
        <button type='submit'>다음</button>
      </form>
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
  gap: 20px;

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  input {
    width: 300px;
    height: 40px;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  button {
    width: 150px;
    height: 40px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #2563eb;
    }
  }

  background-image: url(${background});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export default UserInfo;
