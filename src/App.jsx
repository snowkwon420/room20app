import { useRef, useState, useEffect } from 'react';
import UserInfo from './components/UserInfo';
import Cam from './components/Cam';
import IdCard from './components/IdCard';
import Start from './components/Start';

function App() {
  const [newCardURL, setNewCardURL] = useState(null);
  const [isCardReady, setIsCardReady] = useState(null);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'; // 브라우저의 기본 스크롤 복원 끄기
    }
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  const [userInfo, setUserInfo] = useState(null);
  const [userImage, setUserImage] = useState(null);

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
  };

  const handleReset = () => {
    setUserInfo(null);
    setUserImage(null);
    startRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCardLoad = () => {
    setIsCardReady(true);
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
      </section>
    </div>
  );
}

export default App;
