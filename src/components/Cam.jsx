import { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const CountdownOverlay = ({ seconds }) => <Overlay>{seconds}</Overlay>;

const CaptureButton = ({ onClick }) => (
  <StyledButton onClick={onClick}>Capture</StyledButton>
);

const RecaptureButton = ({ onClick }) => (
  <StyledButton onClick={onClick} bgColor={'orange'} left={'40%'}>
    Recapture
  </StyledButton>
);

const NextPage = ({ onClick }) => (
  <StyledButton left={'60%'} bgColor={'hotpink'} onClick={onClick}>
    다음
  </StyledButton>
);

const WebcamDisplay = ({ setUserImage }) => {
  const webcamRef = useRef(null);
  const [countdown, setCountdown] = useState(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const capture = () => {
    let count = 3;
    setCountdown(count);
    const countdownInterval = setInterval(() => {
      count -= 1;
      setCountdown(count);
      if (count === 0) {
        clearInterval(countdownInterval);

        // 1. getScreenshot으로 이미지 가져오기
        const imageSrc = webcamRef.current.getScreenshot();

        // 2. 좌우 반전 처리
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const context = canvas.getContext('2d');

          // 좌우 반전 설정
          context.translate(canvas.width, 0);
          context.scale(-1, 1);

          // 캔버스에 이미지를 그리기
          context.drawImage(img, 0, 0, canvas.width, canvas.height);

          // 반전된 이미지 추출
          const flippedImageSrc = canvas.toDataURL('image/jpeg');
          setUserImage(flippedImageSrc);
          setIsCaptured(true); // 캡처 완료 후 비디오를 숨기고 이미지 표시
          setCountdown(null);
        };
      }
    }, 1000);
  };

  return (
    <>
      <Container>
        {countdown !== null && <CountdownOverlay seconds={countdown} />}
        {!isCaptured && (
          <StyledWebcam ref={webcamRef} screenshotFormat='image/jpeg' />
        )}
        {isCaptured && (
          <img
            src={webcamRef.current.getScreenshot()}
            alt='Captured'
            style={{ width: '100%', height: 'auto' }}
          />
        )}
        <CaptureButton onClick={capture} />
      </Container>
    </>
  );
};

const ImageDisplay = ({ imageSrc, onRecapture, handleNext }) => (
  <Container>
    <img src={imageSrc} alt='Captured' />
    <RecaptureButton onClick={onRecapture} />
    <NextPage onClick={handleNext} />
  </Container>
);

//컴포넌트
export default function Cam({ handleNext, userImage, setUserImage }) {
  return (
    <MainContainer>
      <h1 style={{ margin: '50px 0' }}> 사진 촬영 해주세요</h1>
      {userImage ? (
        <ImageDisplay
          imageSrc={userImage}
          handleNext={handleNext}
          onRecapture={() => setUserImage(null)}
        />
      ) : (
        <WebcamDisplay setUserImage={setUserImage} />
      )}
    </MainContainer>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 6rem;
  z-index: 1000;
`;

const StyledButton = styled.button`
  position: absolute; /* 버튼을 Webcam 위에 위치시킵니다 */
  bottom: 20px; /* 카메라 하단에 배치 */
  left: ${(props) => props.left || '50%'};
  transform: translateX(-50%); /* 가운데 정렬 */
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.bgColor || '#3b82f6'};
  color: white;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2563eb; /* 호버 시 색상 */
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const StyledWebcam = styled(Webcam)`
  width: 100%;
  height: auto;
  transform: scaleX(-1);
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  box-shadow: inset 0px 0 20px red;
`;
