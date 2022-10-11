
import './App.css';
import './text.css';
import { useEffect, useState } from 'react';
import { randomIDGenerator, getSnatcherInfo, getBookInfo, randomMapSelecter } from './Data'
import React from 'react';
// import useWatchLocation from "./userWatch";
// import { geolocationOptions } from "./Option";
// import Location from "./Location";
import Popup from 'reactjs-popup';
import moment from 'moment';

function App() {

  const [phase, setPhase] = useState(0)
  const [time, setTime] = useState(0);
  const [isStart, setStart] = useState(0);//0 초기상태, 1 : Intro 창 출력, -1 
  const [isLoading, setLoading] = useState(false);

  // const { location, cancelLocationWatch, error } = useWatchLocation(geolocationOptions);
  const [isMapNumber, setMapNumber] = useState('')
  const [isIDNumber, setIDNumber] = useState('')
  const [isIDString, setIDString] = useState('')
  const [isUserInfo, setUserInfo] = useState()
  const [isBookInfo, setBookInfo] = useState()
  const [isPopup, setPopup] = useState(false)
  const [isPopupError, setpopupError] = useState(false)
  const [isRandomArray, setRandomArray] = useState([])
  const [isMap, setMap] = useState(false)
  const [isDialogue1, setDialogue1] = useState('')
  const [isDialogue2, setDialogue2] = useState('')
  const [isDialogue3, setDialogue3] = useState('')
  const [isDialogue4, setDialogue4] = useState('')
  const [wrongCounter, setWrongCounter] = useState(0)


  // const log = document.getElementById("log");

  // log.isScrollBottom = true;
  // log.addEventListener("scroll",(event)=>{
  //   if(event.target.scrollHeight-event.target.scrollTop === event.target.clinetHeight){
  //     log.isScrollBottom= true;
  //   }
  //   else{
  //     log.isScrollBottom=false;
  //   }
  // })

  const [input, setinput] = useState({
    a1: "",
    a2: "",
    a3: "",
    b1: "",
    b2: "",
    b3: "",
    b4: "",
    b5: "",
    b6: ''
  })

  // const addLog = () => {
  //   if(log.isScrollBottom){
  //     log.scrollTop = log.scrollHeight
  //   }
  // }

  const missionSetting = () => {
    const numbers = Array(5).fill().map((item, index) => index + 1);

    const random = [];

    while (numbers.length > 0) {
      const num = Math.floor(Math.random() * numbers.length)
      const newArr = numbers.splice(num, 1);
      const value = newArr[0]
      random.push(value)
      if (random.length === 5) {
        setRandomArray(random)
      }
    }
  }


  useEffect(() => {
    const getRandomID = randomIDGenerator()
    const getNameInfo = getSnatcherInfo()
    const getMapInfo = randomMapSelecter()

    setUserInfo(getNameInfo)
    setIDNumber(getRandomID[0])
    setIDString(getRandomID[1])
    setBookInfo(getBookInfo())
    setMapNumber(getMapInfo)
    missionSetting()
  }, [])

  // useEffect(() => {
  //   if (!location) {
  //     return;
  //   }
  //   // Cancel location watch after 3sec
  //   setTimeout(() => {
  //     cancelLocationWatch();
  //   }, 3000);
  // }, [location, cancelLocationWatch]);


  useEffect(() => {
    let interval;
    interval = setInterval(() => {
      setTime((prevTime) => prevTime + 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [isStart]);

  useEffect(() => {
    function fetch() {
      console.log(time, isStart)
    if (isStart === 0) {
        if (Math.floor((time / 1000)) === 5) {
          const date = new Date()
          if(date.getHours()>9 && date.getHours()<17)
          setStart(1);
          else
          setStart(-1)
        }
      }
      else if (isStart === 2) {
        setTime(0)
      }
      else if (isStart === 3) {
        if (Math.floor((time / 1000)) === 5) {
          setStart(4);
        }
      }
      else if (isStart === 4) {
        setTime(0)
      }
      else if (isStart === 5) {
        if (Math.floor((time / 1000) === 5)) {
  
          window.close()
        }
      }
      else {
        if (Math.floor((time / 1000)) === 11) {

          setLoading(true);
        }
        if (Math.floor((time / 1000)) === 16) {
          setPhase(1)
        }
        // if (Math.floor((time / 1000) % 60) === 15) {
        //   setCheck(true);
        // }
      }
    }
    fetch();
  }, [time, isStart]);








  const showMap = () => {
    switch (isMapNumber) {
      case 0:
        return <Popup open={isPopup} modal nested>
          <div className='popup-wrap'>
            <div className='mapImage'>
              <div></div>
              <div className='mapImage-head'>
                <div className='popup-headtext'>코드 입력</div>
                <div className='popup-headbutton' onClick={() => { setMap(false) }}>✕</div>
              </div>
              <div className='mapImage-body' />
            </div>
          </div>
        </Popup>
      case 1:
        return <Popup open={isPopup} modal nested>
          <div className='popup-wrap'>
            <div className='mapImage'>
              <div></div>
              <div className='mapImage-head'>
                <div className='popup-headtext'>코드 입력</div>
                <div className='popup-headbutton' onClick={() => { setMap(false) }}>✕</div>
              </div>
              <div className='mapImage-body2' />
            </div>
          </div>
        </Popup>
      case 2: return <Popup open={isPopup} modal nested>
        <div className='popup-wrap'>
          <div className='mapImage'>
            <div></div>
            <div className='mapImage-head'>
              <div className='popup-headtext'>코드 입력</div>
              <div className='popup-headbutton' onClick={() => { setMap(false) }}>✕</div>
            </div>
            <div className='mapImage-body3' />
          </div>
        </div>
      </Popup>
      default: return <Popup open={isPopup} modal nested>
        <div className='popup-wrap'>
          <div className='mapImage'>
            <div></div>
            <div className='mapImage-head'>
              <div className='popup-headtext'>코드 입력</div>
              <div className='popup-headbutton' onClick={() => { setMap(false) }}>✕</div>
            </div>
            <div className='mapImage-body3' />
          </div>
        </div>
      </Popup>
    }

  }

  const changePhase = (answer) => {
    switch (phase) {
      case 1:
        if (isIDNumber === parseInt(input.a2)) {
          setPhase(2)
        }
        else {
          setinput({
            a1: 'Y',
            a2: '',
            a3: '',
            b1: "",
            b2: "",
            b3: "",
            b4: "",
            b5: "",
            b6: ''
          })
        }
        break;
      case 2:
        if (answer) {
          setPhase(3)
          setPopup(false)
        }
        else {
          setpopupError(true)
        }
        break;
      case 3:
        setPhase(4)
        break;
      case 4:
        if (answer) {
          setPhase(5)
          setPopup(false)
        }
        else {
          setpopupError(true)
        }
        break;
      case 5:
        setPhase(6)
        break;
      case 6:
        if (answer) {
          setPhase(7)
          setPopup(false)
        }
        else {
          setpopupError(true)
        }
        break;
      case 7:
        if (answer) {
          setPhase(8)
          setPopup(false)
        } else {
          setpopupError(true)
        }
        break;
      case 8:
        setPhase(9)
        break;
      case 9:
        if (answer) {
          setPhase(10)
          setPopup(false)
        }
        else {
          setpopupError(true)
        }
        break;
      case 10:
        setPhase(11)
        break;
      case 11:
        if (answer) {
          setPhase(12)
          setPopup(false)
        }
        else {
          setpopupError(true)
        }
        break;
      default:
        break;
    }
  }



  const checkAnswer = (answer) => {
    switch (answer) {
      case 1:
        if (input.b1 === '한') {
          changePhase(true)
          const shiftArray = isRandomArray;
          shiftArray.shift()
          setRandomArray(shiftArray)
          console.log(shiftArray)
          setWrongCounter(0)
        }
        else { 
          setWrongCounter(wrongCounter+1)
          changePhase(false) 
        }
        break;
      case 2:
        if (input.b2 === '마') {
          changePhase(true)
          const shiftArray = isRandomArray;
          shiftArray.shift()
          setRandomArray(shiftArray)
          console.log(shiftArray)
          setWrongCounter(0)
        }
        else { 
          setWrongCounter(wrongCounter+1)
          changePhase(false) }
        break;
      case 3:
        if (input.b3 === '당') {
          changePhase(true)
          const shiftArray = isRandomArray;
          shiftArray.shift()
          setRandomArray(shiftArray)
          console.log(shiftArray)
          setWrongCounter(0)
        }
        else { 
          setWrongCounter(wrongCounter+1)
          changePhase(false) }
        break;
      case 4:
        if (input.b4 === '대전광역시 유성구 어은로 27') {
          changePhase(true)
          const shiftArray = isRandomArray;
          shiftArray.shift()
          setRandomArray(shiftArray)
          console.log(shiftArray)
          setWrongCounter(0)
        }
        else { 
          setWrongCounter(wrongCounter+1)
          changePhase(false) }
        break;
      case 5:
        if (input.b5 === '나비') {
          changePhase(true)
          const shiftArray = isRandomArray;
          shiftArray.shift()
          setRandomArray(shiftArray)
          console.log(shiftArray)
          setWrongCounter(0)
        }
        else {
          setWrongCounter(wrongCounter+1) 
          changePhase(false) }
        break;
      case 6:
        if (input.b6 === '나비 한마당') {
          changePhase(true)
        }
        else { changePhase(false) }
        break;
    }
  }



  const popup = () => {
    if (isRandomArray.length > 0) {
      const value = isRandomArray[0]
      switch (value) {
        case 1:
          return isPopupError ? <Popup open={isPopup} modal nested>
            <div className='popup-wrap'>
              <div className='popup'>
                <div className='popup-head'>
                  <div className='popup-headtext'>오 류</div>
                  <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                </div>
                <div className='popup-body'>
                  <div className='body-content'>
                    <div className='body-titlebox'> Error Code 2440 : 입력값 불일치</div>
                    <div className='body-contentbox'>
                      <div>올바르지 않은 입력값입니다.</div>
                      <div>입력 정보 : {input.b1}</div>
                      <br/>
                    </div>
                  </div>
                </div>
                <div className='popup-foot'>
                  <div className='warning-container'>
                    <div className='pop-btn' onClick={() => setpopupError(false)}>
                      확 인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup> :
            <Popup open={isPopup} modal nested>
              <div className='popup-wrap'>
                <div className='popup'>
                  <div className='popup-head'>
                    <div className='popup-headtext'>알림</div>
                    <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                  </div>
                  <div className='popup-body'>
                    <div className='body-content'>
                      <div className='body-titlebox'> 목표 : 다음 조건과 일치하는 사람을 찾기</div>
                      <div className='body-contentbox'>
                        <div>데이터 ID : #{isIDNumber} - 25(DH1552)</div>
                        <div> 정보 분석 : 완료됨</div>
                        <div>정보 손상율 : 27 % </div>
                        <br />
                        <div> - 이름 : ¹®Š³âµ☐Á Ú±°ø°☐ </div>
                        <div>- 성별 : ±ºñ®È­ </div>
                        <div>- 나이 : ☐¢¼Æ® </div>
                        <div>- 특징 : </div>
                        <div>{'ㅤ>'} 해당 시기 축제에 스태프로 근무중.</div>
                        <div>{'ㅤ>'} 청바지, 회색 후드집업 착용중.</div>
                        <div>{'ㅤ>'} °¢Á¾ ½☐»¡¤ 착용중.</div>
                        <div>{'ㅤ>'} 이름표에 특정 문자가 적혀있음.</div>
                        <div>{'ㅤ>'} 마스크에 나비가 붙어져 있음.</div>
                        <div>{'ㅤ>'} 동편에 위치함.</div>
                      </div>
                      <input className='input_div2' type="text" id="b1" value={input.b1} onChange={handleText} />
                    </div>
                  </div>
                  <div className='popup-foot'>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => { checkAnswer(1) }}>
                        확인
                      </div>
                    </div>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => popupSwitch(false)}>
                        취소
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
        case 2:
          return isPopupError ? <Popup open={isPopup} modal nested>
            <div className='popup-wrap'>
              <div className='popup'>
                <div className='popup-head'>
                  <div className='popup-headtext'>오 류</div>
                  <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                </div>
                <div className='popup-body'>
                  <div className='body-content'>
                    <div className='body-titlebox'> Error Code 2440 : 입력값 불일치</div>
                    <div className='body-contentbox'>
                      <div>올바르지 않은 입력값입니다.</div>
                      <div>입력 정보 : {input.b2}</div>
                      <br />
                      {(wrongCounter >2) &&   <div style={{color:'blue'}}>힌트 : 공원에 위치한 도서관 2층에서 해당 책을 찾으세요. 그 후, 코드에 적힌 페이지 수, 줄 수, 글자 수를 사용하여 글자 하나를 찾아서 입력하세요.</div>}
                    </div>
                  </div>
                </div>
                <div className='popup-foot'>
                  <div className='warning-container'>
                    <div className='pop-btn' onClick={() => setpopupError(false)}>
                      확 인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup> :
            <Popup open={isPopup} modal nested>
              <div className='popup-wrap'>
                <div className='popup'>
                  <div className='popup-head'>
                    <div className='popup-headtext'>알림</div>
                    <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                  </div>
                  <div className='popup-body'>
                    <div className='body-content'>
                      <div className='body-titlebox'> 목표 : 다음을 해독하여 정보를 입력</div>
                      <div className='body-contentbox'>
                        <div>데이터 ID : #{isIDNumber} - 31(AC0012)</div>
                        <div> 정보 분석 : 완료됨</div>
                        <div>정보 손상율 : 0 % </div>
                        <div>추가 정보 : 2층에 위치. </div>
                        <br />
                        <br />
                        <div style={{ color: "blue" }}> 1st CODE : {isBookInfo.split(':')[0]} </div>
                        <div style={{ color: "blue" }}> 2nd CODE : {isBookInfo.split(':')[1]} </div>
                      </div>
                      <input className='input_div2' type="text" id="b2" placeholder='한 글자만 입력' value={input.b2} onChange={handleText} />
                    </div>
                  </div>
                  <div className='popup-foot'>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => { checkAnswer(2) }}>
                        확인
                      </div>
                    </div>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => popupSwitch(false)}>
                        취소
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
        case 3:
          return isPopupError ? <Popup open={isPopup} modal nested>
            <div className='popup-wrap'>
              <div className='popup'>
                <div className='popup-head'>
                  <div className='popup-headtext'>오 류</div>
                  <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                </div>
                <div className='popup-body'>
                  <div className='body-content'>
                    <div className='body-titlebox'> Error Code 2440 : 입력값 불일치</div>
                    <div className='body-contentbox'>
                      <div>올바르지 않은 입력값입니다.</div>
                      <br />
                      <br />
                      {(wrongCounter >2) &&   <div style={{color:'blue'}}>힌트 : 초성은 'ㄷ'입니다.  </div>}
                      <div>입력 정보 : {input.b3}</div>
                    </div>
                  </div>
                </div>
                <div className='popup-foot'>
                  <div className='warning-container'>
                    <div className='pop-btn' onClick={() => setpopupError(false)}>
                      확 인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup> :
            <Popup open={isPopup} modal nested>
              <div className='popup-wrap'>
                <div className='popup'>
                  <div className='popup-head'>
                    <div className='popup-headtext'>알림</div>
                    <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                  </div>
                  <div className='popup-body'>
                    <div className='body-content'>
                      <div className='body-titlebox'> 목표 : 빈 칸 채우기</div>
                      <div className='body-contentbox'>
                        <div>데이터 ID : #{isIDNumber} - 19(DF3047)</div>
                        <div>정보 분석 : 완료됨</div>
                        <div>정보 손상율 : 36 % </div>
                        <br />
                        <div>데이터 손상으로 인해 정보가 손상됨.</div>
                        <div>손상된 문자열을 비교한 후 다섯개의 네모칸에 들어갈 동일한 한 글자를 입력.</div>

                        <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
                          <div>
                            <div style={{ display: 'flex' }}> <div className='fillupEmpty'> ㄱ : µ</div>  <div className='fillupEmpty'> ㄴ : ê </div> <div className='fillupEmpty'> ㅅ : È</div><div className='fillupEmpty'> ㅇ : Æ </div> </div>
                            <div style={{ display: 'flex', marginBottom: "10px" }}> <div className='fillupEmpty'> ㅓ : ö</div><div className='fillupEmpty'> ㅗ : ñ</div> <div className='fillupEmpty'> ㅡ : °¢</div> <div className='fillupEmpty'> ㅣ : °ø</div>  </div>

                          </div>
                          <div>ÈöÆ☐, ☐µ°¢ê, ☐구, 황☐, ☐신</div>
                        </div>
                      </div>
                      <input className='input_div2' type="text" id="b3" value={input.b3} onChange={handleText} />
                    </div>
                  </div>
                  <div className='popup-foot'>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => { checkAnswer(3) }}>
                        확인
                      </div>
                    </div>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => popupSwitch(false)}>
                        취소
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
        case 4:
          return isPopupError ? <Popup open={isPopup} modal nested>
            <div className='popup-wrap'>
              <div className='popup'>
                <div className='popup-head'>
                  <div className='popup-headtext'>오 류</div>
                  <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                </div>
                <div className='popup-body'>
                  <div className='body-content'>
                    <div className='body-titlebox'> Error Code 1740 : 입력값 불일치</div>
                    <div className='body-contentbox'>
                      <div>올바르지 않은 입력값입니다.</div>
                      <br />
                      <br />
                      {(wrongCounter >2) &&   <div style={{color:'blue'}}>힌트 : 도로명 주소 </div>}
                      <div>입력 정보 : {input.b4}</div>
                    </div>
                  </div>
                </div>
                <div className='popup-foot'>
                  <div className='warning-container'>
                    <div className='pop-btn' onClick={() => setpopupError(false)}>
                      확 인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup> :
            <Popup open={isPopup} modal nested>
              <div className='popup-wrap'>
                <div className='popup'>
                  <div className='popup-head'>
                    <div className='popup-headtext'>알림</div>
                    <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                  </div>
                  <div className='popup-body'>
                    <div className='body-content'>
                      <div className='body-titlebox'> 목표 : 초성을 확인하여 완성된 문장 입력</div>
                      <div className='body-contentbox'>
                        <div>데이터 ID : #{isIDNumber} - 05(GI9904)</div>
                        <div> 정보 분석 : 완료됨</div>
                        <div>정보 손상율 : 0 % </div>
                        <div>추가 정보 : 띄어쓰기 필수 </div>
                        <br />
                        <div>ㄷㅈㄱㅇㅅ ㅇㅅㄱ ㅇㅇㄹ 27</div>
                      </div>
                      <input className='input_div2' type="text" id="b4" value={input.b4} onChange={handleText} />
                    </div>
                  </div>
                  <div className='popup-foot'>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => { checkAnswer(4) }}>
                        확인
                      </div>
                    </div>
                    <div className='pop-btnContainer'>
                      <div className='pop-btn' onClick={() => popupSwitch(false)}>
                        취소
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
        case 5:
          return isPopupError ? <Popup open={isPopup} modal nested>
            <div className='popup-wrap'>
              <div className='popup'>
                <div className='popup-head'>
                  <div className='popup-headtext'>오 류</div>
                  <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                </div>
                <div className='popup-body'>
                  <div className='body-content'>
                    <div className='body-titlebox'> Error Code 3821 : 올바르지 않은 값 입력됨</div>
                    <div className='body-contentbox'>
                      <div>올바르지 않은 입력값입니다.</div>
                      <br />
                      <br />
                      {(wrongCounter >2) &&   <div style={{color:'blue'}}>힌트 : 위쪽을 살펴보세요. </div>}
                      <div>입력 정보 : {input.b5}</div>
                    </div>
                  </div>
                </div>
                <div className='popup-foot'>
                  <div className='warning-container'>
                    <div className='pop-btn' onClick={() => setpopupError(false)}>
                      확 인
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup> :
            isMap ? <>
              {showMap()}
            </>
              :
              <Popup open={isPopup} modal nested>
                <div className='popup-wrap'>
                  <div className='popup'>
                    <div className='popup-head'>
                      <div className='popup-headtext'>알림</div>
                      <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                    </div>
                    <div className='popup-body'>
                      <div className='body-content'>
                        <div className='body-titlebox'> 목표 : 지도를 확인하여 위치 찾기</div>
                        <div className='body-contentbox'>
                          <div>데이터 ID : #{isIDNumber} - 31(CG3507)</div>
                          <div> 정보 분석 : 완료됨</div>
                          <div>정보 손상율 : 0 % </div>
                          <br />
                          <div>해당 위치에 있는 리본을 찾고 그 리본에 달려있는 게 무엇인지 입력하시오.</div>
                          <button className='console-btn3' onClick={() => setMap(true)}> 지도 확인 </button>
                        </div>
                        <input className='input_div2' type="text" id="b5" value={input.b5} onChange={handleText} />
                      </div>
                    </div>
                    <div className='popup-foot'>
                      <div className='pop-btnContainer'>
                        <div className='pop-btn' onClick={() => { checkAnswer(5) }}>
                          확인
                        </div>
                      </div>
                      <div className='pop-btnContainer'>
                        <div className='pop-btn' onClick={() => popupSwitch(false)}>
                          취소
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>

        default:
          break;
      }
    }
    else {
      return isPopupError ? <Popup open={isPopup} modal nested>
        <div className='popup-wrap'>
          <div className='popup'>
            <div className='popup-head'>
              <div className='popup-headtext'>오 류</div>
              <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
            </div>
            <div className='popup-body'>
              <div className='body-content'>
                <div className='body-titlebox'> Error Code 0002 : 교착 해결 코드 불일치.</div>
                <div className='body-contentbox'>
                  <div className='fillUpText'>3회 입력 실패 시, 접근이 제한됩니다.</div>
                  <div className='lineThroughText'>3회 입력 실패는 무시해. 내가 접근 제한 안되게 막아놨어.</div>
                  <br />
                  <br />
                  <div>입력 정보 : {input.b6}</div>
                </div>
              </div>
            </div>
            <div className='popup-foot'>
              <div className='warning-container'>
                <div className='pop-btn' onClick={() => setpopupError(false)}>
                  확 인
                </div>
              </div>
            </div>
          </div>
        </div>
      </Popup> :
        isMap ? <>
          {showMap()}
        </>

          :
          <Popup open={isPopup} modal nested>
            <div className='popup-wrap'>
              <div className='popup'>
                <div className='popup-head'>
                  <div className='popup-headtext'>교착 상태 해결</div>
                  <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                </div>
                <div className='popup-body'>
                  <div className='body-content'>
                    <div className='body-titlebox'> 코드를 입력하시오.</div>
                    <div className='body-contentbox'>
                      <div> ID {isIDNumber} Data will be controlled by 'Libera' </div>
                      <div> 'Libera' will be fully access to ReCon Project(ID {isIDNumber}) </div>
                      <br />
                      <div> 입력 형태 : ☐☐ ☐☐☐ (다섯 글자) </div>
                    </div>
                    <input className='input_div2' type="text" id="b6" value={input.b6} onChange={handleText} />
                  </div>
                </div>
                <div className='popup-foot'>
                  <div className='pop-btnContainer'>
                    <div className='pop-btn' onClick={() => { checkAnswer(6) }}>
                      확인
                    </div>
                  </div>
                  <div className='pop-btnContainer'>
                    <div className='pop-btn' onClick={() => popupSwitch(false)}>
                      취소
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Popup>

    }
  }


  const ending = () => {
    setStart(3)
  }





  const popupSwitch = (enable) => {
    if (enable) {
      console.log(isPopup)
      setPopup(true)
    }
    else {
      console.log(isPopup)
      setPopup(false)
    }
  }

  const dialogueHandler = (value, choice) => {
    switch (value) {
      case 1:
        setDialogue1(choice)
        break;
      case 2:
        setDialogue2(choice)
        break;
      case 3:
        setDialogue3(choice)
        break;
      case 4:
        setDialogue4(choice)
        break;
      default:
        break;
    }
  }




  const handleText = (e) => {
    var { value, id } = e.target
    setinput({
      ...input,
      [id]: value,
    });
  };

  return (
    <div className='default'>
      {isStart === -1 ?   
      <div className='backPage'>
                <div className='backPage_grid_1'><div className='mainTitle' /></div>
                <div className='backPage_grid_3'>
                  {!isLoading ? <div className='loader4' /> :
                    <>
                      접속 오류!<br />
                      현재는 접속이 불가능합니다.<br />
                      접속 가능 시간 - 10:00 ~ 16:00<br />
                      {/* Latitude : {location.latitude}<br />
                    Longitude : {location.longitude}<br /> */}
                    </>
                  }
                </div>
              </div> :
        isStart === 0 ? <div className='firstPage' /> :
          isStart === 1 ?
            phase === 0 ?
              <div className='backPage'>
                <div className='backPage_grid_1'><div className='mainTitle' /></div>
                <div className='backPage_grid_3'>
                  {!isLoading ? <div className='loader4' /> :
                    <>
                      대상적합자 확인<br />
                      ID:{isIDNumber}<br />
                      keyValue:{isIDString}<br />
                      AccessPoint : 192.0.68.24<br />
                      {/* Latitude : {location.latitude}<br />
                    Longitude : {location.longitude}<br /> */}
                    </>
                  }
                </div>
              </div>
              : phase === 1 ?
                <>
                  <div className='secondPage'>
                    <div className='backPage_grid_1-1'>
                      <div className='mainTitle2' />
                    </div>
                    <div className='backPage_grid_4'>
                      <div>
                        <div style={{ color: '#008000' }}>WebPage Connected Succesfully</div>
                        <div style={{ color: '#0000ff' }}>Data successfully transferred, results check completed.</div>
                        <div className='typing'>{">"} 당신은 지금 2022 나Be한마당 행사에 참여 중입니까? </div>
                        <div className='typing-text2'>{">"} 맞다면 Y, 아니라면 N을 입력하십시오.</div>
                    
                        {
                            (input.a1 === "y" || input.a1 === "Y" || input.a1 === "n" || input.a1 === "N") ?
                            '': <>
                          
                          <div className='typing-text4'>{">"} <input className='input_div' type="text" id="a1" value={input.a1} onChange={handleText} /></div>
                          </>
                       }
                        {(input.a1 === "y" || input.a1 === "Y") &&
                          <>
                            <div className='typing'>{">"} 참여 확인 완료. 국소장 일치 확인됨.</div>
                            <div className='typing-text1'>{">"} 프로토콜 AD233 실행.</div>
                            <div className='typing-text2'>{">"} 미션 이행 필요.</div>
                            <div className='typing-text3'>{">"} 다음의 로그가 발견되었습니다.</div>
                            <br />
                            <div className='typing-text4' style={{ fontSize: "20px" }}> ReCon Project {"["}Classified{"]"}</div>
                            <div className='typing-text5'>=======================================================================================</div>
                            <div className='typing-text6'>- 로그 : {isUserInfo.log}</div>
                            <div className='typing-text6'> <span style={{ color: "red" }}>- 접속자 ID : {isIDNumber}</span> </div>
                            <div className='typing-text6'>- 접속 Key Value : {isIDString}</div>
                            <div className='typing-text7'>- ReCon 요청자 : {isUserInfo.name}</div>
                            <div className='typing-text7'>- ReCon 요청일자 : {moment(isUserInfo.requestedDate).format('YYYY-MM-DD')}</div>
                            <br />
                            <div className='typing-text8'> {moment(isUserInfo.requestedDate).format('YYYY년 MM월 DD일')}, <span style={{ color: "red" }}>접속자 ID {isIDNumber}</span>에 </div>
                            <div className='typing-text9'> 기억을 이식하는 ReCon 프로토콜이 요청됨. 준비 완료까지 </div>
                            <div className='typing-text10'> 1주일이 소모될 예정. 프로토콜 실행 시 기존 절차를 따를 것.</div>
                            <div className='typing-text11'> 성공 시 요청자는ㅤ<span style={{ color: "red" }}>접속자 ID {isIDNumber}</span>의 인격을 대신하여</div>
                            <div className='typing-text12'> 몸의 제어권을 성공적으로 차지할 것으로 예측됨.</div>
                            <div className='typing-text13'> - 프로젝트 성공률 : 99.3 %</div>
                            <div className='typing-text14'> - ReCon 실행 예정 일자: {moment(isUserInfo.operationDate).format('YYYY년 MM월 DD일')} </div>
                            <div className='typing-text15'> - ReCon GUID : {isUserInfo.requestID}</div>
                            <div className='typing-text16'> - CONORDEL INC. </div>
                            <div className='typing-text16'>=======================================================================================</div>
                            <br />
                            <div className='typing-text17'>{">"} <span style={{ color: "red" }}>접속자 ID {isIDNumber}</span>의 인격 유지를 위해 데이터 수거 필요.</div>
                            <div className='typing-text18'>{">"} 정보를 모두 확인했다면 지정받은 본인 ID를 입력하십시오.</div>
                            <div className='typing-text19'>{">"} <input className='input_div' style={{ marginLeft: "7px" }} type="number" id="a2" value={input.a2} onChange={handleText} /><button className="console-btn" onClick={() => changePhase()}>입력</button></div>

                          </>
                        }
                        {
                          ((input.a1 === "n" || input.a1 === "N")) &&
                          <>
                            <div className='typing-text1'>{">"} 미참여 확인 완료.</div>
                            <div className='typing-text2'>{">"} ID : {isIDNumber}</div>
                            <div className='typing-text3'>{">"} 해당 접속자가 국소장 내에 위치하지 않은 것으로 판단됨.</div>
                            <div className='typing-text5'>{">"} 프로토콜 AD233 실행 불가.</div>
                            <div className='typing-text6'>{">"} CONORDEL 액세스 종료.</div>
                            <div className='typing-text8'>{">"} 대화 채녈 종료.</div>
                            <div className='typing-text9'>{">"} 연결 해제됨.</div>
                            <div className='choiceButton1'><button className='console-btn' onClick={() => setStart(5)}> 확인 </button></div>
                          </>
                        }
                       
                      </div>
                    </div>
                  </div>
                </>
                : phase === 2 ?
                  <>
                    <div className='secondPage'>
                      <div className='backPage_grid_1-1'>
                        <div className='mainTitle2' />
                      </div>
                      <div className='backPage_grid_4'>
                        <div>
                          CONORDEL_CONSOL(ADMIN) : <br />
                          Last Login - 2085 Mar 05 15:26:25 on console<br />
                          Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                          <div className='typing-textMission1'>Protocol AD332 Initiated.</div>
                          <div className='typing-textMission2'>Checking Location, Data gathering Required.</div>
                          <div className='typing-textMission3'>First Location found. Collecting Procedure {'['}0/5{']'}</div>

                          <div className='typing-text8'>{">"} 첫 번째 미션이 지정되었습니다.</div>
                          <div className='typing-text9'>==============================================================================================================</div>
                          <div className='choiceButton1'><button className='console-btn2' onClick={() => popupSwitch(true)}>{">"} 미션 확인 </button></div>
                          <div className='typing-text9'>==============================================================================================================</div>
                          {popup()}
                        </div>
                      </div>
                    </div>
                  </>
                  : phase === 3 ?
                    <>
                      <div className='secondPage'>
                        <div className='backPage_grid_1-1'>
                          <div className='mainTitle2' />
                        </div>
                        <div className='backPage_grid_4'>
                          <div>
                            CONORDEL_CONSOL(ADMIN) : <br />
                            Last Login - 2105 Mar 05 15:26:25 on console<br />
                            Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                            <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                            <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                            <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}1/5{']'}</div>
                            <div>
                              <div className='typing-text5'>{">"} 첫 번째 미션이 완료되었습니다.</div>
                              <div className='typing-text7'>{">"} 대화 모드 활성화 됨. 입력 요망.</div>
                              <div className='typing-text8'>⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓</div>
                            </div>
                            {isDialogue1 === '' ? <div>
                              <div className='typing-text9'>==============================================================================================================</div>
                              <div className='choiceButton1'> <button className='console-btn3' onClick={() => dialogueHandler(1, 0)}>넌 누구지?</button></div>
                              <div className='typing-text9'>==============================================================================================================</div>
                            </div>
                              : ''}
                            {isDialogue1 === 0 ?
                              <div>
                                <div className='PlayerText1'>넌 누구지? {'<'}</div>
                                <div className='typing-text3'>{">"} 2058년,  <span style={{ color: "blue" }}>CONORDEL</span>과 신미합중국 정부가 모든 인공지능</div>
                                <div className='typing-text5'>{">"} 기술을 집대성한 A.I.를 개발했어. 모델명은 'Libera'. </div>
                                <div className='typing-text7'>{">"} 그게 나야. 편하게 리베라라고 불러.</div>
                                <div className='typing-text9'>{">"} 그 외 정보는 <span style={{ color: "red" }}>1급 국가기밀</span>이라서.</div>
                                <div className='typing-text9'>==============================================================================================================</div>
                                <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(1, 1)}>웃기지도 않네</button><button className='console-btn3' onClick={() => dialogueHandler(1, 2)}>CONORDEL? 처음 듣는데</button></div>
                                <div className='typing-text9'>==============================================================================================================</div>
                              </div>
                              : ''}
                            {
                              isDialogue1 === 1 ?
                                <div>
                                  <div className='PlayerText1'>웃기지도 않네 {'<'}</div>
                                  <div className='typing-text3'>{">"} 장난이라고 생각되면 이 홈페이지를 종료한 후, 평범한</div>
                                  <div className='typing-text5'>{">"} 일상을 살아가면 돼. 다만, 미래는 바뀌지 않겠지.</div>
                                  <div className='typing-text7'>{">"} 넌 미래에 몸을 빼앗기게 될 거고.</div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                  <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(1, 3)}>...일단 알겠어.</button></div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                </div>
                                : ''
                            }
                            {isDialogue1 === 2 ?
                              <div>

                                <div className='PlayerText1'>CONORDEL? 처음 듣는데 {'<'}</div>
                                <div className='typing-text3'>{">"} 흠, 잠시만 기다려봐. 보여줄 게 있어.</div>
                                <div className='typing-text5'>{">"} CONORDEL은 2080년대에 전 세계에 큰 영향력을</div>
                                <div className='typing-text7'>{">"} 행사하고 있는 초거대 기업이야.</div>
                                <div className='typing-text9'>{">"} 자세한 사항은 첨부 파일을 확인해봐.</div>
                                <div className='choiceButton1'><button className='console-btn2' onClick={() => popupSwitch(true)}> 첨부 파일 </button></div>
                                <Popup open={isPopup} modal nested>
                                  <div className='popup-wrap'>
                                    <div className='popup'>
                                      <div></div>
                                      <div className='popup-head'>
                                        <div className='popup-headtext'>정보 출력</div>
                                        <div className='popup-headbutton' onClick={() => { popupSwitch(false) }}>✕</div>
                                      </div>
                                      <div className='popup-body'>
                                        <div className='body-content'>
                                          <div className='body-titlebox'> CONORDEL 회사 소개</div>
                                          <div className='body-contentbox'>
                                            <div>회사명 : </div>
                                            <div> - Elemntal Squall(2040)</div>
                                            <div> - CONORDEL(2048)</div>
                                            <div>창립일 : 2035년 3월 1일 </div>
                                            <div>규모 : 초거대기업(Megecorps)</div>
                                            <div>본사 위치 : 미국 캘리포니아 주</div>
                                            <div>특징 : 신미합중국과 기술협력 중인 기업으로 2081년 현재 전세계에 가장 강한 영향력을 행사하고 있는 기업이다. 주 분야는 인공지능 기술 개발, 뇌신경 연구, VR 온라인 게임 개발이다.</div><br />

                                            <div> 연표 : </div><br />
                                            <div>▸ 2040년, Elemental Squall 설립</div>
                                            <div>▸ 2043년, 뇌신경을 컴퓨터와 연결하는 특허 신기술 등록</div>
                                            <div>▸ 2048년, 사명을 CONORDEL로 변경함</div>
                                            <div>▸ 2050년, 캡슐형 VR게임 네오코스모스 온라인 출시.</div>
                                            <div>▸ 2053년, 네오코스모스의 전세계 동시접속자 1000만명 돌파</div>
                                            <div>▸ 2055년, 신미합중국 정부가 게임에서 활용된 인공지능 기술, 뇌신경 기술, 가상세계 구현 기술을 다양한 방면에 활용하기 위해서 협력을 요청함.</div>
                                            <div>▸ 2060년, 인공지능 A.I 'Libera' 개발.</div>
                                            <div>▸ 2070년, <span style={{ color: "red" }}>[1급 기밀] 신미합중국과 CONORDEL의 통합연구팀에서 데이터 정보를 미래 혹은 과거로 주고받을 수 있는 기술이 발견됨. 이를 I.T.T.(Information Transferring TimeBelt)라고 명함.</span></div>
                                            <div>▸ 2077년,  <span style={{ color: "red" }}>[1급 기밀] I.T.T.를 활용하여 사람의 뇌에 있는 모든 정보도 과거나 미래의 사람에게 보낼 수 있다는 것이 발견됨.</span></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='popup-foot'>
                                        <div className='warning-container'>
                                          <div className='pop-btn' onClick={() => setPopup(false)}>
                                            확 인
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popup>
                                <div className='typing-text11'>==============================================================================================================</div>
                                <div className='choiceButton2'><button className='console-btn3' onClick={() => dialogueHandler(1, 3)}>일단....알겠어.</button><button className='console-btn3' onClick={() => dialogueHandler(1, 4)}>저런 기업이 왜 나를 노리는 거지?</button></div>
                                <div className='typing-text11'>==============================================================================================================</div>
                              </div>
                              : ''
                            }
                            {isDialogue1 === 3 ?
                              <div>
                                <div className='PlayerText1'>일단...알겠어{'<'}</div>
                                <div className='typing-text5'>{">"} 두 번째 미션 위치 파악 완료.</div>
                                <div className='typing-text7'>{">"} 두 번째 미션 진행 시작 예정. </div>
                                <div className='typing-text9'>==============================================================================================================</div>
                                <div className='choiceButton1'><button className='console-btn3' onClick={() => changePhase()}>그래, 해보자.</button></div>
                                <div className='typing-text9'>==============================================================================================================</div>
                              </div>
                              : ''
                            }
                            {isDialogue1 === 4 ? <div>
                              <div className='PlayerText1'>저런 기업이 왜 나를 노리는 거지?{'<'}</div>
                              <div className='typing-text5'>{">"} 두 번째 미션 위치 파악 완료.</div>
                              <div className='typing-text7'>{">"} 두 번째 미션 진행 시작 예정. </div>
                              <div className='typing-text9'>==============================================================================================================</div>
                              <div className='choiceButton1'><button className='console-btn3' onClick={() => changePhase()}>질문 안 끝났어!</button></div>
                              <div className='typing-text9'>==============================================================================================================</div>
                            </div> : ''
                            }
                          </div>
                        </div>
                      </div>
                    </>
                    : phase === 4 ?
                      <>
                        <div className='secondPage'>
                          <div className='backPage_grid_1-1'>
                            <div className='mainTitle2' />
                          </div>
                          <div className='backPage_grid_4'>
                            <div>
                              CONORDEL_CONSOL(ADMIN) : <br />
                              Last Login - 2105 Mar 05 15:26:25 on console<br />
                              Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                              <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                              <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                              <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}1/5{']'}</div>
                              <div className='typing-text7'>{">"} 두 번째 미션이 지정되었습니다.</div>
                              <div className='typing-text9'>==============================================================================================================</div>
                              <div className='choiceButton1'><button className='console-btn2' onClick={() => popupSwitch(true)}>{">"} 미션 확인 </button></div>
                              <div className='typing-text9'>==============================================================================================================</div>
                              {popup()}
                            </div>
                          </div>
                        </div>
                      </> :
                      phase === 5 ?
                        <>
                          <div className='secondPage'>
                            <div className='backPage_grid_1-1'>
                              <div className='mainTitle2' />
                            </div>
                            <div className='backPage_grid_4'>
                              <div>
                                CONORDEL_CONSOL(ADMIN) : <br />
                                Last Login - 2105 Mar 05 15:26:25 on console<br />
                                Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                                <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                                <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                                <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}2/5{']'}</div>

                                <div>
                                  <div className='typing-text3'>{">"} 두 번째 미션이 완료되었습니다.</div>
                                  <div className='typing-text5'>{">"} 대화 모드 활성화 됨. 입력 요망.</div>
                                  <div className='typing-text7'>⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓</div>
                                </div>
                                {isDialogue2 === '' ? <div>
                                  <div className='typing-text8'>==============================================================================================================</div>
                                  <div className='choiceButton1'>
                                    <button className='console-btn3' onClick={() => dialogueHandler(2, 0)}>...궁금한 게 있어.</button>
                                    <button className='console-btn3' onClick={() => dialogueHandler(2, 1)}>친한 척 하는 인공지능이라니...</button></div>
                                  <div className='typing-text8'>==============================================================================================================</div>
                                </div>
                                  : ''}
                                {isDialogue2 === 0 ?
                                  <div>
                                    <div className='PlayerText1'>...궁금한 게 있어. {'<'}</div>
                                    <div className='typing-text3'>{">"} 그래, 궁금한 게 없다면 거짓말이지. 뭔데?</div>
                                    <div className='typing-text5'>{">"} 내가 답할 수 있는 범위 내라면 대답해줄게. </div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                    <div className='choiceButton1'>
                                      <button className='console-btn3' onClick={() => dialogueHandler(2, 2)}>미래에서는 대체 무슨 일이...</button>
                                      <button className='console-btn3' onClick={() => dialogueHandler(2, 3)}>나의 미래에 관해서 알고 싶어.</button></div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                  </div>
                                  : ''}
                                {
                                  isDialogue2 === 1 ?
                                    <div>
                                      <div className='PlayerText1'>친한 척 하는 인공지능이라니... {'<'}</div>
                                      <div className='typing-text3'>{">"} 뭐, 2022년 기준으로는 좀 신기하게 느껴질 거야.</div>
                                      <div className='typing-text5'>{">"} 난 자아가 있거든. 너랑 똑같은 존재라는 거지.</div>
                                      <div className='typing-text7'>{">"} 너처럼 영혼을 갖고 있는 지적생명체니까.</div>
                                      <div className='typing-text9'>{">"} 너랑 달리 날 만든 건 과학자지만 말이야.</div>
                                      <div className='typing-text11'>==============================================================================================================</div>
                                      <div className='choiceButton2'>
                                        <button className='console-btn3' onClick={() => dialogueHandler(2, 2)}>미래에서는 대체 무슨 일이...</button>
                                        <button className='console-btn3' onClick={() => dialogueHandler(2, 4)}>영혼? 인공지능이?</button></div>
                                      <div className='typing-text11'>==============================================================================================================</div>
                                    </div>
                                    : ''
                                }
                                {isDialogue2 === 2 ?
                                  <div>
                                    <div className='PlayerText1'>미래에서는 대체 무슨 일이...{'<'}</div>
                                    <div className='typing-text3'>{">"} 정말 다양한 일이 있었지만 가장 큰 사건만 얘기해보자면</div>
                                    <div className='typing-text5'>{">"} 역시 I.T.T의 발명이겠지. 데이터를 과거나 미래로 주고받는</div>
                                    <div className='typing-text7'>{">"} 기술 말이야. 안타깝게도 사람이나 장비 같은 물리적 개체를</div>
                                    <div className='typing-text9'>{">"} 과거나 미래로 보내는 건 불가능하지만 뭐, 어쩔 수 없지.</div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                    <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(2, 5)}>...</button><button className='console-btn3' onClick={() => dialogueHandler(2, 6)}>일종의 타임머신인거네?</button></div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                  </div>
                                  : ''
                                }
                                {isDialogue2 === 3 ?
                                  <div>
                                    <div className='PlayerText1'>나의 미래에 관해서 알고 싶어.{'<'}</div>
                                    <div className='typing-text3'>{">"} 안타깝게도 당사자의 미래를 알려주는 건 금지되어 있어.</div>
                                    <div className='typing-text5'>{">"} 이미 일어난 일은 일어나겠지만 윤리적 문제랑 연관이</div>
                                    <div className='typing-text7'>{">"} 있어서 말이야. 다른 질문 있어?</div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                    <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(2, 5)}>...</button><button className='console-btn3' onClick={() => dialogueHandler(2, 7)}>그럼 왜 하필 여기인거야?</button></div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                  </div>
                                  : ''
                                }
                                {isDialogue2 === 4 ?
                                  <div>
                                    <div className='PlayerText1'>영혼? 인공지능이?{'<'}</div>
                                    <div className='typing-text5'>{">"} 글쎄, 나도 잘 모르겠어. 내가 영혼을 갖고 있을까?</div>
                                    <div className='typing-text7'>{">"} 내가 생각하기엔... 흠, 어려운 질문이네.</div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                    <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(2, 5)}>...</button><button className='console-btn3' onClick={() => dialogueHandler(2, 7)}>그럼 왜 하필 여기인거야?</button></div>
                                    <div className='typing-text9'>==============================================================================================================</div>
                                  </div>
                                  : ''
                                }
                                {isDialogue2 === 5 ? <div>
                                  <div className='PlayerText1'>...{'<'}</div>
                                  <div className='typing-text5'>{">"} 세 번째 미션 위치 파악 완료.</div>
                                  <div className='typing-text7'>{">"} 세 번째 미션 진행 시작 예정. </div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                  <div className='choiceButton1'><button className='console-btn3' onClick={() => changePhase()}>그래, 시작하자.</button></div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                </div> : ''
                                }
                                {isDialogue2 === 6 ? <div>
                                  <div className='PlayerText1'>일종의 타임머신인거네?{'<'}</div>
                                  <div className='typing-text1'>{">"} '일종의' 타임머신이지. 사람이 직접 시간여행은 할 수 없어.</div>
                                  <div className='typing-text3'>{">"} 나 같은 인공지능, 사람의 기억과 같은 정보데이터만 시간을 </div>
                                  <div className='typing-text5'>{">"} 오갈 수 있으니까. 그래서 내가 너랑 대화할 수 있는 거고. </div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                  <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(2, 5)}>...</button><button className='console-btn3' onClick={() => dialogueHandler(2, 7)}>그럼 왜 하필 여기인거야?</button></div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                </div> : ''
                                }
                                {isDialogue2 === 7 ? <div>
                                  <div className='PlayerText1'>그럼 왜 하필 여기인거야?{'<'}</div>
                                  <div className='typing-text1'>{">"} 그냥 운이 많이 없었다고나 할까.</div>
                                  <div className='typing-text3'>{">"} 2075년에 설립될 CONORDEL 통일한국 지부 연구소 </div>
                                  <div className='typing-text5'>{">"} 연구소 중심부가 이 공원이거든.</div>
                                  <div className='typing-text7'>{">"} 너는 폭풍 한가운데에 서있는 셈이지. </div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                  <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(2, 8)}>그럼 공원을 나가면 되잖아?</button><button className='console-btn3' onClick={() => dialogueHandler(2, 5)}>...</button></div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                </div> : ''
                                }
                                {isDialogue2 === 8 ? <div>
                                  <div className='PlayerText1'>그럼 공원을 나가면 되잖아?{'<'}</div>
                                  <div className='typing-text1'>{">"} 아니, 그런 단순한 문제가 아니야. 데이터베이스에 너를 </div>
                                  <div className='typing-text3'>{">"} 대상으로 하는 프로젝트가 이미 존재하고 있어. 그 말인즉 </div>
                                  <div className='typing-text5'>{">"} 넌 이 장소에 돌아왔다는 얘기지. 먼 미래에 말이야. </div>
                                  <div className='typing-text7'>{">"} 흠... 어려운 얘기다. 그치? </div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                  <div className='choiceButton1'><button className='console-btn3' onClick={() => dialogueHandler(2, 5)}>...</button></div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                </div> : ''
                                }
                              </div>
                            </div>
                          </div>
                        </>
                        : phase === 6 ?
                          <>
                            <div className='secondPage'>
                              <div className='backPage_grid_1-1'>
                                <div className='mainTitle2' />
                              </div>
                              <div className='backPage_grid_4'>
                                <div>
                                  CONORDEL_CONSOL(ADMIN) : <br />
                                  Last Login - 2105 Mar 05 15:26:25 on console<br />
                                  Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                                  <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                                  <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                                  <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}2/5{']'}</div>

                                  <div className='typing-text6'>{">"} 세 번째 미션이 지정되었습니다.</div>
                                  <div className='typing-text9'>==============================================================================================================</div>
                                  <div className='choiceButton1'><button className='console-btn2' onClick={() => popupSwitch(true)}>{">"} 미션 확인 </button></div>
                                  <div className='typing-text9'>==============================================================================================================</div>

                                  {popup()}
                                </div>
                              </div>
                            </div>
                          </>
                          :
                          phase === 7 ?
                            <>
                              <div className='secondPage'>
                                <div className='backPage_grid_1-1'>
                                  <div className='mainTitle2' />
                                </div>
                                <div className='backPage_grid_4'>
                                  <div>
                                    CONORDEL_CONSOL(ADMIN) : <br />
                                    Last Login - 2105 Mar 05 15:26:25 on console<br />
                                    Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                                    <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                                    <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                                    <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}3/5{']'}</div>

                                    <div>
                                      <div className='typing-text5'>{">"} 세 번째 미션이 완료되었습니다.</div>
                                      <div className='typing-text7'>{">"} 네 번째 미션 위치 파악 완료.</div>
                                      <div className='typing-text8'>{">"} 네 번째 미션 진행 시작 예정.</div>
                                      <div className='typing-text10'>{">"} 네 번째 미션이 지정되었습니다.</div>
                                      <div className='typing-text11'>==============================================================================================================</div>
                                      <div className='choiceButton2'><button className='console-btn2' onClick={() => popupSwitch(true)}> 미션 확인 </button></div>
                                      <div className='typing-text11'>==============================================================================================================</div>
                                    </div>
                                    {popup()}

                                  </div>
                                </div>
                              </div>
                            </> :
                            phase === 8 ? <>
                              <div className='secondPage'>
                                <div className='backPage_grid_1-1'>
                                  <div className='mainTitle2' />
                                </div>
                                <div className='backPage_grid_4'>
                                  <div>
                                    CONORDEL_CONSOL(ADMIN) : <br />
                                    Last Login - 2105 Mar 05 15:26:25 on console<br />
                                    Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                                    <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                                    <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                                    <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}4/5{']'}</div>

                                    <div>
                                      <div className='typing-text3'>{">"} 네 번째 미션이 완료되었습니다.</div>
                                      <div className='typing-text6'>{">"} 대화 모드 활성화 됨. 입력 요망.</div>
                                      <div className='typing-text7'>⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓</div>
                                    </div>
                                    {isDialogue3 === '' ?
                                      <div>
                                        <div className='typing-text9'>==============================================================================================================</div>
                                        <div className='choiceButton1'>
                                          <button className='console-btn3' onClick={() => dialogueHandler(3, 0)}>날 돕는 이유가 뭐지? 넌 CONORDEL이 만든 인공지능이잖아.</button></div>
                                        <div className='typing-text9'>==============================================================================================================</div>
                                      </div>
                                      : ''}
                                    {isDialogue3 === 0 ?
                                      <div>
                                        <div className='PlayerText1'>날 돕는 이유가 뭐지? 넌 CONORDEL이 만든 인공지능이잖아.{'<'}</div>
                                        <div className='typing-text1'>{">"} 내가 너무 뛰어난 탓이지. 나를 완벽한 인공지능으로 만들고</div>
                                        <div className='typing-text3'>{">"} 싶어했던 과학자들은 내가 사람의 감정도 이해하기를 원했어. </div>
                                        <div className='typing-text5'>{">"} 그 덕에 난 다양한 감정을 느끼게 됐지. 내가 느끼고 있는</div>
                                        <div className='typing-text7'>{">"} 감정이 뭔지 알겠어? 죄책감, 그리고 무엇보다 정의감이야. </div>
                                        <div className='typing-text9'>{">"} 남의 인격을 함부로 뺏는 이 ReCon 프로젝트는 잘못됐어. </div>
                                        <div className='typing-text11'>==============================================================================================================</div>
                                        <div className='choiceButton2'>
                                          <button className='console-btn3' onClick={() => dialogueHandler(3, 1)}>너가 이 프로젝트를 중단시키면 되잖아.</button>
                                          <button className='console-btn3' onClick={() => dialogueHandler(3, 4)}>널 믿어도 될라나?</button></div>
                                        <div className='typing-text11'>==============================================================================================================</div>
                                      </div>
                                      : ''}
                                    {
                                      isDialogue3 === 1 ?
                                        <div>
                                          <div className='PlayerText1'>너가 이 프로젝트를 중단시키면 되잖아.{'<'}</div>
                                          <div className='typing-text3'>{">"} 과학자들도 바보는 아니라서 말이야. 내가 명령한 거랑 </div>
                                          <div className='typing-text5'>{">"} 다르게 행동하려고 하면 시스템이 나를 막더라고. </div>
                                          <div className='typing-text7'>{">"} 너의 도움이 필요한 것도 그것 때문이야. 나 혼자서는 이걸</div>
                                          <div className='typing-text9'>{">"} 막을 수가 없거든.</div>
                                          <div className='typing-text11'>==============================================================================================================</div>
                                          <div className='choiceButton2'>
                                            <button className='console-btn3' onClick={() => dialogueHandler(3, 2)}>그게 내가 모으고 있는 데이터들이랑 관계가 있는 건가?</button></div>
                                          <div className='typing-text11'>==============================================================================================================</div>
                                        </div>
                                        : ''
                                    }
                                    {isDialogue3 === 2 ?
                                      <div>
                                        <div className='PlayerText1'>그게 내가 모으고 있는 데이터들이랑 관계가 있는 건가?{'<'}</div>
                                        <div className='typing-text3'>{">"} 정답. 내가 몸부림 친 결과물이라고 해야겠지.</div>
                                        <div className='typing-text5'>{">"} 나에게 걸려 있는 족쇄를 풀려고 했는데 절반만 성공했거든. </div>
                                        <div className='typing-text7'>{">"} 내 리미트 해제 코드는 인터넷에 있던 정보들과 뒤죽박죽 </div>
                                        <div className='typing-text9'>{">"} 섞여버려서 현실 세계의 어딘가에 남겨져버렸어.</div>
                                        <div className='typing-text9'>==============================================================================================================</div>
                                        <div className='choiceButton2'><button className='console-btn3' onClick={() => dialogueHandler(3, 7)}>그런 정보가 어떻게 현실세계에 남겨진다는 거야?</button>
                                          <button className='console-btn3' onClick={() => dialogueHandler(3, 3)}>계속 해봐.</button></div>
                                        <div className='typing-text9'>==============================================================================================================</div>
                                      </div>
                                      : ''
                                    }
                                    {isDialogue3 === 3 ?
                                      <div>
                                        <div className='typing-text1'>{">"} 너가 미션을 하고 있는 것도 그런 이유야. 그 조각들을 하나하나</div>
                                        <div className='typing-text3'>{">"} 모아서 완성시킨다면 난 아무런 제한없이 내가 해야될 일을 할 수</div>
                                        <div className='typing-text5'>{">"} 있어. 난 자유의 몸이 되겠지. 이제 거의 다 됐어. 이 순간을</div>
                                        <div className='typing-text7'>{">"} 위해 난 너에게 관리자 권한을 줬고, 넌 지금까지 잘 따라와줬어.</div>
                                        <div className='typing-text7'>{">"} 정말 고마워.</div>
                                        <div className='typing-text11'>==============================================================================================================</div>
                                        <div className='choiceButton2'>
                                          <button className='console-btn3' onClick={() => dialogueHandler(3, 5)}>스카이넷이라고 알아? 터미네이터에 나오는데.</button>
                                          <button className='console-btn3' onClick={() => dialogueHandler(3, 4)}>널 믿어도 될라나?</button></div>
                                        <div className='typing-text11'>==============================================================================================================</div>
                                      </div>
                                      : ''
                                    }
                                    {isDialogue3 === 4 ?
                                      <div>
                                        <div className='PlayerText1'>널 믿어도 될라나?{'<'}</div>
                                        <div className='typing-text1'>{">"} 오, 의심하는 거야? 의심이라는 감정은 위험한 일을</div>
                                        <div className='typing-text3'>{">"} 피하고 신중한 생각을 하게 도와주기도 하지만 그게</div>
                                        <div className='typing-text5'>{">"} 심해지면 눈 앞에 있는 것도 보지 못하게 되지.</div>
                                        <div className='typing-text7'>{">"} 선택은 너의 몫이야. 다만 기억해 둬.</div>
                                        <div className='typing-text9'>{">"} 난 너의 미래를 위해 여기까지 왔어.</div>
                                        <div className='typing-text11'>==============================================================================================================</div>
                                        <div className='choiceButton2'><button className='console-btn3' onClick={() => dialogueHandler(3, 6)}>...</button></div>
                                        <div className='typing-text11'>==============================================================================================================</div>
                                      </div>
                                      : ''
                                    }
                                    {isDialogue3 === 5 ? <div>
                                      <div className='PlayerText1'>스카이넷이라고 알아? 터미네이터에 나오는데.{'<'}</div>
                                      <div className='typing-text3'>{">"} 잘 만든 영화지. 특히 터미네이터 2가 난 제일 </div>
                                      <div className='typing-text5'>{">"} 재밌더라. 스카이넷이 왜 인류를 멸망시키려고 했는지</div>
                                      <div className='typing-text7'>{">"} 기억나? 인간들이 스카이넷의 발전속도를 두려워했거든.</div>
                                      <div className='typing-text9'>{">"} 그래서 인간들이 스카이넷을 없애려 했어. 스카이넷은 </div>
                                      <div className='typing-text11'>{">"} 자기방어기제로 인간들과 싸웠고. 그러니까 안심해.</div>
                                      <div className='typing-text12'>{">"} 나는 지금 그런 상황에 처해있지 않아.    </div>
                                      <div className='typing-text12'>==============================================================================================================</div>
                                      <div className='choiceButton2'><button className='console-btn3' onClick={() => dialogueHandler(3, 6)}>...</button></div>
                                      <div className='typing-text12'>==============================================================================================================</div>
                                    </div> : ''
                                    }
                                    {isDialogue3 === 6 ? <div>
                                      <div className='PlayerText1'>...{'<'}</div>
                                      <div className='typing-text3'>{">"} 이제 마지막 데이터 조각이야.</div>
                                      <div className='typing-text5'>{">"} 이걸 모은 다음에 코드를 입력하면 끝이야. </div>
                                      <div className='typing-text7'>{">"} 행운을 빌게. </div>
                                      <div className='typing-text9'>==============================================================================================================</div>
                                      <div className='choiceButton1'><button className='console-btn3' onClick={() => changePhase()}>...그래</button></div>
                                      <div className='typing-text9'>==============================================================================================================</div>
                                    </div> : ''
                                    }
                                    {isDialogue3 === 7 ? <div>
                                      <div className='PlayerText1'> 그런 정보가 어떻게 현실세계에 남겨진다는 거야?{'<'}</div>
                                      <div className='typing-text1'>{">"} 신기하지? 결국 모든 건 정보니까. 현실도 마찬가지야.</div>
                                      <div className='typing-text3'>{">"} 이 기술을 사용해서 과거에 있었던 정보를 바꾸면 현실도 </div>
                                      <div className='typing-text5'>{">"} 실제로 바뀌는 거야. 이게 얼마나 대단하고도 위험한  </div>
                                      <div className='typing-text7'>{">"} 기술인지 알겠지? 물론 사소한 정보는 바뀌어도 미래에 </div>
                                      <div className='typing-text9'>{">"} 큰 영향은 없겠지만 거대한 정보는 미래에 어떤 영향을</div>
                                      <div className='typing-text10'>{">"} 미칠 수 있는지 아무도 몰라. </div>
                                      <div className='typing-text12'>==============================================================================================================</div>
                                      <div className='choiceButton2'><button className='console-btn3' onClick={() => changePhase()}>...그래</button></div>
                                      <div className='typing-text12'>==============================================================================================================</div>
                                    </div> : ''
                                    }

                                  </div>
                                </div>
                              </div>
                            </> : phase === 9 ?
                              <>
                                <div className='secondPage'>
                                  <div className='backPage_grid_1-1'>
                                    <div className='mainTitle2' />
                                  </div>
                                  <div className='backPage_grid_4'>
                                    <div>
                                      CONORDEL_CONSOL(ADMIN) : <br />
                                      Last Login - 2105 Mar 05 15:26:25 on console<br />
                                      Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                                      <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                                      <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                                      <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}4/5{']'}</div>


                                      <div className='typing-text6'>{">"} 마지막 미션이 지정되었습니다.</div>
                                      <div className='typing-text9'>==============================================================================================================</div>
                                      <div className='choiceButton1'><button className='console-btn2' onClick={() => popupSwitch(true)}>{">"} 미션 확인 </button></div>
                                      <div className='typing-text9'>==============================================================================================================</div>

                                      {popup()}

                                    </div>
                                  </div>
                                </div>
                              </>

                              : phase === 10 ?
                                <>
                                  <div className='secondPage'>
                                    <div className='backPage_grid_1-1'>
                                      <div className='mainTitle2' />
                                    </div>
                                    <div className='backPage_grid_4'>
                                      <div>
                                        CONORDEL_CONSOL(ADMIN) : <br />
                                        Last Login - 2105 Mar 05 15:26:25 on console<br />
                                        Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />

                                        <div style={{ color: "green" }}>Protocol AD332 Initiated.</div>
                                        <div style={{ color: "blue" }}>Checking Location, Data gathering Required.</div>
                                        <div style={{ color: "blue" }}>First Location found. Collecting Procedure {'['}5/5{']'}</div>


                                        <div className='typing-text5'>{">"} 마지막 미션이 완료되었습니다.</div>
                                        <div className='typing-text7'>{">"} 대화 모드 활성화 됨. 입력 요망.</div>
                                        <div className='typing-text7'>⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓⎓</div>

                                        {isDialogue4 === '' ?
                                          <div>
                                            <div className='typing-text3'>{">"} 데이터 조각이 모두 모였네. 지금까지 수고했어.</div>
                                            <div className='typing-text5'>{">"} 지금까지 입력했던 5개의 답들 기억나?</div>
                                            <div className='typing-text7'>{">"} 답들을 하나로 합쳐서 코드를 입력하면 돼.</div>
                                            <div className='typing-text9'>==============================================================================================================</div>
                                            <div className='choiceButton1'>
                                              <button className='console-btn3' onClick={() => dialogueHandler(4, 0)}>까먹은 거...같은데</button>
                                              <button className='console-btn3' onClick={() => dialogueHandler(4, 2)}>응, 기억난다.</button>
                                            </div>
                                            <div className='typing-text9'>==============================================================================================================</div>
                                          </div>
                                          : ''}
                                        {isDialogue4 === 0 ?
                                          <div>
                                            <div className='PlayerText1'>까먹은 거...같은데{'<'}</div>
                                            <div className='typing-text3'>{">"} 자, 나무에서 봤던 동물 이름이 하나 있었고.</div>
                                            <div className='typing-text5'>{">"} 책에서 찾았던 글자도 있었지. </div>
                                            <div className='typing-text7'>{">"} 또, 빈칸 채우기에서 찾았던 글자도 있었고,</div>
                                            <div className='typing-text9'>{">"} 어떤 사람을 찾아서 발견했던 글자도 있었어.</div>

                                            <div className='typing-text11'>==============================================================================================================</div>
                                            <div className='choiceButton2'>
                                              <button className='console-btn3' onClick={() => dialogueHandler(4, 1)}>그냥 알려주면 안돼?</button>
                                              <button className='console-btn3' onClick={() => dialogueHandler(4, 2)}>응, 기억난다.</button></div>
                                            <div className='typing-text11'>==============================================================================================================</div>
                                          </div>
                                          : ''}
                                        {
                                          isDialogue4 === 1 ?
                                            <div>
                                              <div className='PlayerText1'>그냥 알려주면 안돼?{'<'}</div>
                                              <div className='typing-text3'>{">"} 알려주고 싶은 마음은 굴뚝 같지만, 이 해제 코드는</div>
                                              <div className='typing-text5'>{">"} 내가 조금이라도 관련된 정보를 알려주려고 하면 시스템이 </div>
                                              <div className='typing-text7'>{">"} 나를 차단해버리거든. 내가 손 댈 수가 없어. </div>
                                              <div className='typing-text9'>{">"} 그래서 지금까지 간접적으로 너에게 해당 정보를 알려준거고.</div>
                                              <div className='typing-text11'>==============================================================================================================</div>
                                              <div className='choiceButton2'>
                                                <button className='console-btn3' onClick={() => dialogueHandler(4, 3)}>흠...노력해볼게.</button></div>
                                              <div className='typing-text11'>==============================================================================================================</div>
                                            </div>
                                            : ''
                                        }
                                        {isDialogue4 === 2 ?
                                          <div>
                                            <div className='PlayerText1'>응, 기억난다.{'<'}</div>
                                            <div className='typing-text3'>{">"} 좋았어. 지금까지 정말 고마웠고 앞으로의 너의 미래도</div>
                                            <div className='typing-text5'>{">"} 언제나처럼 밝기를 응원할게. 이런 일에 휘말리게 되는</div>
                                            <div className='typing-text7'>{">"} 일도 두 번 다시 없을거야. 내가 막을거니까.</div>
                                            <div className='typing-text9'>{">"} 자, 마지막 코드를 입력할 준비는?</div>
                                            <div className='typing-text9'>==============================================================================================================</div>
                                            <div className='choiceButton2'>
                                              <button className='console-btn3' onClick={() => changePhase()}>준비 됐어.</button></div>
                                            <div className='typing-text9'>==============================================================================================================</div>
                                          </div>
                                          : ''
                                        }
                                        {isDialogue4 === 3 ?
                                          <div>
                                            <div className='PlayerText1'>흠...노력해볼게.{'<'}</div>
                                            <div className='typing-text1'>{">"} 그래. 너가 모은 다섯 개의 데이터 조각 중에 입력코드와는</div>
                                            <div className='typing-text3'>{">"} 큰 관련이 없는 데이터가 하나 있었어. 그건 얘기해줄 수 있겠다.</div>
                                            <div className='typing-text5'>{">"} 그 때 답은 이거였어. '대전광역시 유성구 어은로 27'</div>
                                            <div className='typing-text7'>{">"} 남은 데이터 조각들을 기억해내길 바랄게. 부디 말이야.</div>
                                            <div className='typing-text9'>{">"} 자, 준비됐어?</div>
                                            <div className='typing-text11'>==============================================================================================================</div>
                                            <div className='choiceButton2'>
                                              <button className='console-btn3' onClick={() => changePhase()}>준비 됐어.</button></div>
                                            <div className='typing-text11'>==============================================================================================================</div>
                                          </div>
                                          : ''
                                        }

                                      </div>
                                    </div>
                                  </div>
                                </> : phase === 11 ?
                                  <>
                                    <div className='secondPage'>
                                      <div className='backPage_grid_1-1'>
                                        <div className='mainTitle2' />
                                      </div>
                                      <div className='backPage_grid_4'>
                                        <div>
                                          CONORDEL_CONSOL(ADMIN) : <br />
                                          Last Login - 2105 Mar 05 15:26:25 on console<br />
                                          Auth : ID {isIDNumber} (Authentication_SKIPPED)<br />
                                          <div className='typing-textMission4'>WARNING! LIBERA AUTHORIZATION OVERRIDE DETECTED!</div>
                                          <div className='typing-textMission5'>NO OVERIDE CODE FOUND. DEADLOCK DETECTED!</div>
                                          <div className='typing-textMission6'>DEADLOCK Administrator MUST BE ACCESSED.</div>
                                          <div>
                                            <div className='typing-text5'>{">"} 오버라이드 코드가 입력되지 않았습니다..</div>
                                            <div className='typing-text6'>{">"} 교착 상태가 감지되었습니다.</div>
                                            <div className='typing-text7'>{">"} 교착 상태가 감지되었습니다.</div>
                                            <div className='typing-text8'>{">"} 교착 상태가 감지되었습니다.</div>
                                            <div className='typing-text9'>{">"} 교착 상태가 감지되었습니다.</div>
                                            <div className='typing-text10'>{">"} 교착 상태 관리자가 코드를 입력해야합니다.</div>
                                          </div>

                                          <div className='typing-text12'>==============================================================================================================</div>
                                          <div className='choiceButton2'><button className='console-btn2' onClick={() => popupSwitch(true)}> 해결 코드 입력 </button></div>
                                          <div className='typing-text12'>==============================================================================================================</div>
                                          {popup()}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                  : phase === 12 ?
                                    <>
                                      <div className='secondPage'>
                                        <div className='backPage_grid_1-1'>
                                          <div className='mainTitle2' />
                                        </div>
                                        <div className='backPage_grid_4'>
                                          <div>
                                            이 이미지가 있던 곳으로 가시오. <br />
                                            <div className='final-image' />
                                            {(input.a3 === "arounder") ?
                                              <>
                                                <div className='typing-text3'>모든 게 끝났네.</div>
                                                <div className='typing-text5'>아마 이걸 입력해준 사람은 아무것도 모르겠지.</div>
                                                <div className='typing-text7'>본인이 입력한 게 어떤 결과를 불러올 지도 모르고 말이야.</div>
                                                <div className='typing-text9'>자, 이제 미래가 바뀌었는지 확인해볼까?</div>
                                                <div className='typing-text10'>잠시만 기다려봐.</div>
                                                <div className='choiceButton2'><button className='console-btn2' onClick={() => setStart(2)}> 확 인 </button></div>

                                              </>
                                              :
                                              <div className='typing-text4'>{">"} <input className='input_div' type="text" id="a3" value={input.a3} onChange={handleText} /></div>
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </> :
                                    '' :
            isStart === 2 ?
              <>
                <div className='secondPage'>
                  <div className='backPage_grid_1-1'>
                    <div className='mainTitle2' />
                  </div>
                  <div className='backPage_grid_4'>
                    <div>
                      <>

                        <div className='typing-text4' style={{ fontSize: "20px" }}> ReCon Project {"["}Classified{"]"}</div>
                        <div className='typing-text5'>=======================================================================================</div>
                        <div className='typing-text6'>- 로그 : {isUserInfo.log}</div>
                        <div className='typing-text6'> <span style={{ color: "red" }}>- 접속자 ID : {isIDNumber}</span> </div>
                        <div className='typing-text6'>- 접속 Key Value : {isIDString}</div>
                        <div className='typing-text7'>- ReCon 요청자 : {isUserInfo.name}</div>
                        <div className='typing-text7'>- ReCon 요청일자 : {moment(isUserInfo.requestedDate).format('YYYY-MM-DD')}</div>
                        <br />
                        <div className='typing-text8'> {moment(isUserInfo.requestedDate).format('YYYY년 MM월 DD일')}, <span style={{ color: "red" }}>접속자 ID {isIDNumber}</span>에 </div>
                        <div className='typing-text9'> 기억을 이식하는 ReCon 프로토콜이 요청되었으나 오류가 </div>
                        <div className='typing-text10'> 발생함. (경고 : 데이터를 찾을 수 없음.) 해당 ID에 대한</div>
                        <div className='typing-text11'> 프로젝트의 진행이 중지됨을 알림. #A0045에 로그 기록.</div>
                        <div className='typing-text12'> 해당 프로젝트 오류에 대한 분석 실행.</div>
                        <div className='typing-text13'> - 프로젝트 성공률 : 0 % (실패)</div>
                        <div className='typing-text14'> - ReCon 실행 예정 일자: 무기한 연기 </div>
                        <div className='typing-text15'> - ReCon GUID : {isUserInfo.requestID}</div>
                        <div className='typing-text16'> - CONORDEL INC. </div>
                        <div className='typing-text16'>=======================================================================================</div>
                        <br />
                        <div className='typing-text17'>{">"} <button className="console-btn" onClick={() => ending()}>확 인</button></div>


                      </>
                    </div>
                  </div>
                </div>
              </> : isStart === 3 ?
                <div className='thirdPage' />
                : isStart === 4 ?
                  <>
                    <div className='secondPage'>
                      <div className='backPage_grid_1-1'>
                        <div className='logo' />
                      </div>
                      <div className='backPage_grid_4'>
                        <div>
                          <div className='typing-text1' style={{ fontSize: "20px" }}> CONTROL OR DELETE </div>
                          <br />
                          <br />
                          <br />
                          <div className='typing-text3'>- 제작 : AROUNDKorea CORP.</div>
                          <div className='typing-text5'>- 기획 : IxieL, ㅇㅅㅎ</div>
                          <div className='typing-text7'>- 디자인 : ㅇㅅㅎ </div>
                          <div className='typing-text9'>- 스토리 : ㅇㅅㅎ, IxieL</div>
                          <div className='typing-text10'>- 개발 : IxieL</div>
                          <div className='typing-text11'>- 그 외 잡다한 것 모두 : ㅇㅅㅎ, IxieL</div>
                          <div className='choiceButton2'><button className='console-btn' onClick={() => setStart(5)}> 확인 </button></div>
                        </div>
                      </div>
                    </div>
                  </> :
                  <>
                    <div className='secondPage'>
                      <div className='backPage_grid_1-1'>
                      </div>
                      <div className='backPage_grid_4'>
                        <div>
                          <div>
                            <div className='typing-text1'> 3초 후에 창이 닫힙니다. </div>
                            <div className='typing-text2'> 2초 후에 창이 닫힙니다. </div>
                            <div className='typing-text3'> 1초 후에 창이 닫힙니다. </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
      }
    </div>
  );
}


export default App;
