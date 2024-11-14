import { useRef, useState, useEffect } from 'react';
import UserInfo from './components/UserInfo';
import Cam from './components/Cam';
import IdCard from './components/IdCard';
import Start from './components/Start';

function App() {
  const [newCardURL, setNewCardURL] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'; // 브라우저의 기본 스크롤 복원 끄기
    }
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const [userInfo, setUserInfo] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [isCardReady, setIsCardReady] = useState(false);

  const startRef = useRef(null);
  const formRef = useRef(null);
  const cameraRef = useRef(null);
  const cardRef = useRef(null);

  const handleStart = () => {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleUserInfoSubmit = () => {
    // 유저 정보 입력 후 스크롤
    cameraRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNext = () => {
    // 사진 촬영 후 스크롤
    cardRef.current.scrollIntoView({ behavior: 'smooth' });
    console.log(userImage);
  };

  const handleReset = () => {
    setUserInfo(null);
    setUserImage(null);
    startRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardLoad = () => {
    setIsCardReady(true);
  };

  const downloadImage = () => {
    const canvas = document.querySelector('canvas'); // Canvas 요소를 선택
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'business-card.png'; // 다운로드할 파일 이름
      link.href = canvas.toDataURL('image/png'); // Canvas 내용을 Base64 데이터 URL로 가져오기
      link.click(); // 다운로드 링크 클릭
    }
  };

  return (
    <div>
      {/* 시작 섹션 */}
      <section ref={startRef} onClick={handleStart}>
        <Start />
      </section>

      {/* 유저 정보 입력 섹션 */}
      <section ref={formRef}>
        <UserInfo onClick={handleUserInfoSubmit} setUserInfo={setUserInfo} />
      </section>

      {/* 사진 촬영 섹션 */}
      <section ref={cameraRef}>
        <Cam
          handleNext={handleNext}
          userImage={userImage}
          setUserImage={setUserImage}
        />
      </section>

      {/* 명함 생성 섹션 */}
      <section ref={cardRef}>
        {userImage && userInfo && (
          <IdCard
            userInfo={userInfo.user}
            userImage={userImage}
            onLoad={handleCardLoad}
            onClick={handleReset}
            setNewCardURL={setNewCardURL}
            newCardURL={newCardURL}
          />
        )}
        {isCardReady && (
          <button onClick={downloadImage}>Download Business Card</button>
        )}
      </section>
    </div>
  );
}

export default App;
