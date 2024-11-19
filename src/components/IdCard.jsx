import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CardFront from '../assets/cardFront2.jpeg';
import './ShowCard.css';
import background from '../assets/cardpage.png';
import CardBack from '../assets/cardBack.png';

function IdCard({ userInfo, userImage, onLoad, setNewCardURL, newCardURL }) {
  const canvasRef = useRef(document.createElement('canvas')); // canvas 요소를 직접 생성
  const containerRef = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false); // 카드 플립 상태 관리

  useEffect(() => {
    if (newCardURL) {
      atvImg(); // newCardURL이 변경될 때마다 실행
    }
  }, [newCardURL]);

  const atvImg = () => {
    const d = document;
    const imgs = containerRef.current.querySelectorAll('.atvImg');
    const totalImgs = imgs.length;
    const supportsTouch =
      'ontouchstart' in window || navigator.msMaxTouchPoints;

    if (totalImgs <= 0) {
      return;
    }

    for (let l = 0; l < totalImgs; l++) {
      const thisImg = imgs[l];
      const layerElems = thisImg.querySelectorAll('.atvImg-layer');
      const totalLayerElems = layerElems.length;

      if (totalLayerElems <= 0) {
        continue;
      }

      while (thisImg.firstChild) {
        thisImg.removeChild(thisImg.firstChild);
      }

      const containerHTML = d.createElement('div');
      const shineHTML = d.createElement('div');
      const shadowHTML = d.createElement('div');
      const layersHTML = d.createElement('div');
      const layers = [];

      thisImg.id = 'atvImg__' + l;
      containerHTML.className = 'atvImg-container';
      shineHTML.className = 'atvImg-shine';
      shadowHTML.className = 'atvImg-shadow';
      layersHTML.className = 'atvImg-layers';

      for (let i = 0; i < totalLayerElems; i++) {
        const layer = d.createElement('div'),
          imgSrc = layerElems[i].getAttribute('data-img');

        layer.className = 'atvImg-rendered-layer';
        layer.setAttribute('data-layer', i);
        layer.style.backgroundImage = layer.style.backgroundImage =
          'url(' + imgSrc + ')';
        layersHTML.appendChild(layer);
        layers.push(layer);
      }

      containerHTML.appendChild(shadowHTML);
      containerHTML.appendChild(layersHTML);
      containerHTML.appendChild(shineHTML);
      thisImg.appendChild(containerHTML);

      const w =
        thisImg.clientWidth || thisImg.offsetWidth || thisImg.scrollWidth;
      thisImg.style.transform = 'perspective(' + w * 3 + 'px)';

      if (supportsTouch) {
        window.preventScroll = false;

        (function (_thisImg, _layers, _totalLayers, _shine) {
          thisImg.addEventListener('touchmove', function (e) {
            if (window.preventScroll) {
              e.preventDefault();
            }
            processMovement(e, true, _thisImg, _layers, _totalLayers, _shine);
          });
          thisImg.addEventListener('touchstart', function (e) {
            window.preventScroll = true;
            processEnter(e, _thisImg);
          });
          thisImg.addEventListener('touchend', function (e) {
            window.preventScroll = false;
            processExit(e, _thisImg, _layers, _totalLayers, _shine);
          });
        })(thisImg, layers, totalLayerElems, shineHTML);
      } else {
        (function (_thisImg, _layers, _totalLayers, _shine) {
          thisImg.addEventListener('mousemove', function (e) {
            processMovement(e, false, _thisImg, _layers, _totalLayers, _shine);
          });
          thisImg.addEventListener('mouseenter', function (e) {
            processEnter(e, _thisImg);
          });
          thisImg.addEventListener('mouseleave', function (e) {
            processExit(e, _thisImg, _layers, _totalLayers, _shine);
          });
        })(thisImg, layers, totalLayerElems, shineHTML);
      }
    }

    function processMovement(
      e,
      touchEnabled,
      elem,
      layers,
      totalLayers,
      shine
    ) {
      const bd = document.body;
      const htm = document.documentElement;
      const bdst = bd.scrollTop || htm.scrollTop;
      const bdsl = bd.scrollLeft;
      const pageX = touchEnabled ? e.touches[0].pageX : e.pageX;
      const pageY = touchEnabled ? e.touches[0].pageY : e.pageY;
      const offsets = elem.getBoundingClientRect();
      const w = elem.clientWidth || elem.offsetWidth || elem.scrollWidth;
      const h = elem.clientHeight || elem.offsetHeight || elem.scrollHeight;
      const wMultiple = 320 / w;
      const offsetX = 0.52 - (pageX - offsets.left - bdsl) / w;
      const offsetY = 0.52 - (pageY - offsets.top - bdst) / h;
      const dy = pageY - offsets.top - bdst - h / 2;
      const dx = pageX - offsets.left - bdsl - w / 2;
      const yRotate = (offsetX - dx) * (0.07 * wMultiple);
      const xRotate = (dy - offsetY) * (0.1 * wMultiple);
      let imgCSS = 'rotateX(' + xRotate + 'deg) rotateY(' + yRotate + 'deg)';
      const arad = Math.atan2(dy, dx);
      let angle = (arad * 180) / Math.PI - 90;

      if (angle < 0) {
        angle = angle + 360;
      }

      if (elem.firstChild.className.indexOf(' over') !== -1) {
        imgCSS += ' scale3d(1.07,1.07,1.07)';
      }
      elem.firstChild.style.transform = imgCSS;

      shine.style.background =
        'linear-gradient(' +
        angle +
        'deg, rgba(255,255,255,' +
        ((pageY - offsets.top - bdst) / h) * 0.4 +
        ') 0%,rgba(255,255,255,0) 80%)';
      shine.style.transform =
        'translateX(' +
        offsetX * totalLayers -
        0.1 +
        'px) translateY(' +
        offsetY * totalLayers -
        0.1 +
        'px)';

      let revNum = totalLayers;
      for (let ly = 0; ly < totalLayers; ly++) {
        layers[ly].style.transform =
          'translateX(' +
          offsetX * revNum * ((ly * 2.5) / wMultiple) +
          'px) translateY(' +
          offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
          'px)';
        revNum--;
      }
    }

    function processEnter(e, elem) {
      elem.firstChild.className += ' over';
    }

    function processExit(e, elem, layers, totalLayers, shine) {
      const container = elem.firstChild;
      container.className = container.className.replace(' over', '');
      container.style.transform = '';
      shine.style.cssText = '';

      for (let ly = 0; ly < totalLayers; ly++) {
        layers[ly].style.transform = '';
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // 카드 이미지 로드
    const cardImage = new Image();
    cardImage.src = CardFront;
    cardImage.onload = () => {
      const maxWidth = 700;
      const scaleFactor = maxWidth / cardImage.width;
      const newWidth = cardImage.width * scaleFactor;
      const newHeight = cardImage.height * scaleFactor;

      canvas.width = newWidth;
      canvas.height = newHeight;
      context.drawImage(cardImage, 0, 0, newWidth, newHeight);

      if (userImage) {
        const userImg = new Image();
        userImg.src = userImage;
        userImg.onload = () => {
          const targetWidth = 167;
          const targetHeight = 225;
          const targetAspectRatio = targetWidth / targetHeight;
          const imgAspectRatio = userImg.width / userImg.height;

          let sourceX = 0;
          let sourceY = 0;
          let sourceWidth = userImg.width;
          let sourceHeight = userImg.height;

          if (imgAspectRatio > targetAspectRatio) {
            sourceWidth = userImg.height * targetAspectRatio;
            sourceX = (userImg.width - sourceWidth) / 2;
          } else {
            sourceHeight = userImg.width / targetAspectRatio;
            sourceY = (userImg.height - sourceHeight) / 2;
          }

          context.drawImage(
            userImg,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            50,
            98,
            targetWidth,
            targetHeight
          );

          addUserInfoToCanvas(context);
          setNewCardURL(canvas.toDataURL('image/png'));
          onLoad();
        };
      } else {
        addUserInfoToCanvas(context);
        setNewCardURL(canvas.toDataURL('image/png'));
        onLoad();
      }
    };

    function addUserInfoToCanvas(ctx) {
      ctx.font = '20px Helvatica';
      ctx.fillStyle = '#000';
      ctx.fillText(`${userInfo.name}`, 340, 160);
      ctx.fillText(`${userInfo.birthday}`, 360, 195);
      ctx.fillText(`${userInfo.hometown}`, 360, 235);
      ctx.fillText(`${userInfo.igid}`, 360, 270);
      ctx.fillText(`${userInfo.etc}`, 350, 310);
    }
  }, [userInfo, userImage, onLoad, setNewCardURL]);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped); // 클릭 시 플립 상태를 토글
  };

  return (
    <Wrapper>
      {newCardURL ? (
        <div
          className={`container `}
          ref={containerRef}
          onClick={handleCardClick}
        >
          <div className='cover atvImg back'>
            <div className='atvImg-layer' data-img={newCardURL}></div>
            {/* <div className='atvImg-layer' data-img={CardBack}></div> */}
          </div>
        </div>
      ) : (
        <p>loading</p>
      )}
      {/* 생성된 이미지 표시 */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* 반복 방지 */
`;

export default IdCard;
