import styled from 'styled-components';

const IdCard = ({ onClick }) => {
  return (
    <Wrapper>
      <h2>id 카드와 qr 코드를 보여주는 페이지 </h2>
      <p>qr 코드를 사용하면 이미지 다운로드 가능 </p>
      <p>나가기 버튼 : 모든 페이지 및 데이터 초기화 & 최상단으로 다시 이동 </p>
      <button onClick={onClick}>RESET</button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px 0 10px red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  button {
    width: 100px;
  }
`;

export default IdCard;
