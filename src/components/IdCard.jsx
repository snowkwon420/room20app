import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import CardFront from '../assets/cardFront.png';

function IdCard({ userInfo, userImage, onLoad, onClick }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 이미지 로드
    const cardImage = new Image();
    cardImage.src = CardFront; // 업로드된 이미지 경로 설정

    cardImage.onload = () => {
      // 캔버스 초기화
      const maxWidth = 700; // 원하는 너비
      const scaleFactor = maxWidth / cardImage.width; // 원본 비율에 맞춰 축소
      const newWidth = cardImage.width * scaleFactor;
      const newHeight = cardImage.height * scaleFactor;

      // 캔버스 크기 설정
      canvas.width = newWidth;
      canvas.height = newHeight;
      // 명함 이미지 배경 그리기
      context.drawImage(cardImage, 0, 0, newWidth, newHeight);

      // 유저 이미지 추가
      if (userImage) {
        const userImg = new Image();
        userImg.src = userImage;
        userImg.onload = () => {
          // 이미지 비율을 유지하며 166x220 크기로 맞추기 위한 계산
          const targetWidth = 167; // 원하는 너비
          const targetHeight = 221; // 원하는 높이
          const targetAspectRatio = targetWidth / targetHeight;

          const imgAspectRatio = userImg.width / userImg.height;

          let sourceX = 0;
          let sourceY = 0;
          let sourceWidth = userImg.width;
          let sourceHeight = userImg.height;

          if (imgAspectRatio > targetAspectRatio) {
            // 이미지가 가로로 더 길 경우: 높이에 맞춰 자르기
            sourceWidth = userImg.height * targetAspectRatio;
            sourceX = (userImg.width - sourceWidth) / 2;
          } else {
            // 이미지가 세로로 더 길 경우: 너비에 맞춰 자르기
            sourceHeight = userImg.width / targetAspectRatio;
            sourceY = (userImg.height - sourceHeight) / 2;
          }

          // 잘라낸 이미지를 캔버스에 비율을 유지한 채 그리기
          context.drawImage(
            userImg,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            40, // 명함 내 이미지의 x 좌표 (적절히 조정)
            99, // 명함 내 이미지의 y 좌표 (적절히 조정)
            targetWidth,
            targetHeight
          );

          addUserInfoToCanvas(context);
          onLoad();
        };
      } else {
        addUserInfoToCanvas(context);
        onLoad();
      }
    };

    function addUserInfoToCanvas(ctx) {
      ctx.font = '16px Arial';
      ctx.fillStyle = '#000';
      ctx.fillText(`${userInfo.name}`, 500, 150);
      ctx.fillText(`Number: ${userInfo.number}`, 500, 190);
      ctx.fillText(`Email: ${userInfo.email}`, 500, 230);
      ctx.fillText(`Etc: ${userInfo.etc}`, 500, 270);
    }
  }, [userInfo, userImage, onLoad]);

  return (
    <Wrapper>
      <Card>
        <canvas ref={canvasRef} style={{ opacity: '0.5' }}></canvas>
      </Card>
      <button onClick={onClick}>Reset</button>
    </Wrapper>
  );
}

const Card = styled.div`
  box-shadow: 0 0 40px;
  height: 430px;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-shadow: inset 0px 0 10px red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
  button {
    width: 100px;
  }
`;

export default IdCard;
