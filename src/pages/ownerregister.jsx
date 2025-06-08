import "../ui/ownerregister.css";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useEffect, useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { firebase, db } from "../components/firebase";
import * as bootstrap from 'bootstrap';
import { Dropdown } from 'react-bootstrap';
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const MoneySetting = ({setMoney}) => {
    const handleChange = (key, value) => {
        setMoney(prev => ({ ...prev, [key]: Number(value) }));
    };

    return (
        <>
            <div className='form-floating mb-2'>
                <input type='text' className="form-control" id="floatinghour" placeholder="money" onChange={
                    (e) => {
                        handleChange('hour', e.target.value);
                    }
                } />
                <label htmlFor="floatinghour">時租 ex: 300</label>
            </div>
            <div className='form-floating mb-2'>
                <input type='text' className="form-control" id="floatingmonths" placeholder="money" onChange={
                    (e) => {
                        handleChange('months', e.target.value);
                    }
                } />
                <label htmlFor="floatingmonths">月租 ex: 300</label>
            </div>
            <div className='form-floating mb-2'>
                <input type='text' className="form-control" id="floatingseason" placeholder="money" onChange={
                    (e) => {
                        handleChange('season', e.target.value);
                    }
                } />
                <label htmlFor="floatingseason">季租 ex: 300</label>
            </div>
            <div className='form-floating mb-2'>
                <input type='text' className="form-control" id="floatingyear" placeholder="money" onChange={
                    (e) => {
                         handleChange('year', e.target.value);
                    }
                } />
                <label htmlFor="floatingyear">年租 ex: 300</label>
            </div>
        </>

    )
}
const CourtSetting = ({ courtCount, setCourtCount }) => {
    const courtOptions = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <Dropdown onSelect={(val) => setCourtCount(Number(val))}>
            <Dropdown.Toggle className="dropdown" variant="" id="dropdown-courts">
                {courtCount ? `${courtCount} 面` : "請選擇場地數量"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {courtOptions.map((num) => (
                    <Dropdown.Item key={num} eventKey={num}>{num} 面</Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};
const WeekOpentime = ({ weekOpenTimeList, setWeekOpenTimeList }) => {
    const weekDays = ['Mon.', 'Tue.', 'Wed.', 'Thr.', 'Fri.', 'Sat.', 'Sun.'];
    const changetime = (dayIndex, timeType, value) => {
        const update = [...weekOpenTimeList];
        update[dayIndex][timeType] = value;
        setWeekOpenTimeList(update);
    }

    return (
        <>
            <div>
                {weekOpenTimeList.map((item, index) => {
                    const opentime = Array.from({ length: 24 }, (_, i) => i + 1);
                    const endTimeOption = opentime.filter(hour => item.open === "" || hour > Number(item.open));
                    return (
                        <div key={index}  className="openslesct">
                            <div className="dayblock">{weekDays[index]}</div>
                            <div className="date">
                                <Dropdown onSelect={(hour) => {
                                    changetime(index, 'open', hour);
                                    changetime(index, 'close', '');
                                }}>
                                    <Dropdown.Toggle className="dropdown" variant="" id={`dropdown-start-${index}`}>
                                        {item.open ? `${item.open}:00` : '開始時間'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {opentime.map((hour, index) => {
                                            return (
                                                <Dropdown.Item key={index} eventKey={hour}>{hour}:00</Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="time">
                                <Dropdown onSelect={(hour) => {
                                    changetime(index, 'close', hour)
                                }}>
                                    <Dropdown.Toggle className="dropdown" variant="" id={`dropdown-end-${index}`}>
                                        {item.close ? `${item.close}:00` : '結束時間'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {endTimeOption.map((hour, index) => {
                                            return (
                                                <Dropdown.Item key={index} eventKey={hour}>{hour}:00</Dropdown.Item>
                                            )
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="spllit"></div>
        </>
    )
}
const AddrSet = ({county, setCounty, town, setTown,  countynamelist, countycodelist, setAddr}) => {
    const [townList, setTownList] = useState([]);
    const parser = new XMLParser();

    const handleCountyChange = async (selectedCountyName) => {
        setCounty(selectedCountyName);

        const selectedCounty = countycodelist.find(item => item.countyname === selectedCountyName);
        if (!selectedCounty) return;

        const countycode = selectedCounty.countycode;

        try {
            const response = await axios.get(`https://api.nlsc.gov.tw/other/ListTown/${countycode}`);
            const jsonData = parser.parse(response.data);
            const townCodeList = jsonData.townItems.townItem;
            const townNamelist = townCodeList.map(item => item.townname);
            setTownList(townNamelist);
            setTown('');
        } catch (error) {
            console.error("錯誤", error);
        }
    }

    return (
        <div className="opentimeset">
            <div className='opentimeTopic'>-球場地址-</div>
            <Dropdown onSelect={handleCountyChange}>
                <Dropdown.Toggle className="dropdown" variant="" id="dropdown-county">
                    {county || '請選擇縣市'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {countynamelist.map((item, index) => {
                        return (
                            <Dropdown.Item key={index} eventKey={item}>{item}</Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={(val) => setTown(val)}>
                <Dropdown.Toggle className="dropdown" variant="" id="dropdown-town">
                    {town || '請選擇鄉鎮市區'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {townList.map((item, index) => {
                        return (
                            <Dropdown.Item key={index} eventKey={item}>{item}</Dropdown.Item>
                        )
                    })}
                </Dropdown.Menu>
            </Dropdown>
            <div className='form-floating mb-2'>
                <input type='address' className="form-control" id="floatingaddr" placeholder="address" onChange={
                    (e) => {
                        setAddr(e.target.value);
                    }
                } />
                <label htmlFor="floatingmonths">鼎中路726號4樓</label>
            </div>
        </div>
    )

}

let myModal;
export default function Ownerregister() {
    const parser = new XMLParser();
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const [handler, setHandler] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalContent, setModalContent] = useState('');
    const [courtCount, setCourtCount] = useState(null);
    const [county, setCounty] = useState('');
    const [town , setTown] = useState('');
    const [addr, setAddr] = useState('');
    const [countynamelist , setCountynamelist] = useState([]);
    const [countycodelist , setCountycodelist] = useState([]);
    const [money, setMoney] = useState({
        hour: 0,
        months: 0,
        season: 0,
        year: 0
    });
    const [weekOpenTimeList, setWeekOpenTimeList] = useState([
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' }
    ]);


    useEffect(() => {
        myModal = new bootstrap.Modal(modalRef.current);
    }, [])

    useEffect(() => {
      (async () => {
        const response = await axios.get('https://api.nlsc.gov.tw/other/ListCounty/');
          const jasonData = parser.parse(response.data);
          const countyItems = jasonData.countyItems.countyItem;
          const countyItem = countyItems.map(({ countycode, countyname }) => ({
              countycode,
              countyname
          }));
          const countyname = countyItem.map(item => item.countyname);
          setCountycodelist(countyItem);
          setCountynamelist(countyname);
       })()
    },[])

    const onClickSignIn = () => {
        var signin = document.querySelector("#signin");
        var signup = document.querySelector("#signup");
        signin.style.backgroundColor = "#cbcdd0";
        signup.style.backgroundColor = "white";
        setHandler(1);
    }
    const onClickSignUp = () => {
        var signin = document.querySelector("#signin");
        var signup = document.querySelector("#signup");
        signin.style.backgroundColor = "white";
        signup.style.backgroundColor = "#cbcdd0";
        setHandler(0);
    }

    const showLoginError = (e) => {
        if (e.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS) {
            setModalContent("帳號密碼錯誤，請重新輸入");
            myModal.show();
        }
        else if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
            setModalContent("帳號已註冊，請重新輸入");
            myModal.show();
        }
        else {
            setModalContent("登入錯誤，請重新輸入");
            myModal.show();
        }
    }

    const onSubmit = (e) => {
         e.preventDefault();
        if (handler === 1) {
            const auth = getAuth(firebase);
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    setModalContent("登入成功，即將跳轉至首頁");
                    myModal.show();
                    setTimeout(() => {
                        myModal.hide();
                        navigate('/siteFalicyCRADemo/');
                    }, 3000)
                })
                .catch((e) => {
                    showLoginError(e);
                })
        }
        else if (handler === 0) {
            const auth = getAuth(firebase);
            createUserWithEmailAndPassword(auth, email, password)
                .then((storeCredential) => {
                    const store = storeCredential.user;
                    return setDoc(doc(db, 'stores', store.uid), {
                        uid: store.uid,
                        storename: name,
                        email: store.email,
                        address: county + town + addr,
                        rent: money,
                        court: courtCount,
                        dutytime: weekOpenTimeList,
                        createTime: serverTimestamp()
                    });
                })
                .then(() => {
                    setModalContent("註冊成功，即將跳轉至首頁");
                    myModal.show();
                    setTimeout(() => {
                        myModal.hide();
                        navigate('/siteFalicyCRADemo/');
                    }, 3000)
                })
                .catch((e) => {
                    showLoginError(e);
                })
        }
    }

    return (<>
        <div className="container d-flex justu">
            <div className="signBox">
                <div className="logoFocus text-center my-5 pb-3 w-100">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/FocusLogo.png' className="img-fluid" alt='' />
                </div>
                <div className='chosedBox'>
                    <div className="inBlock" id="signin" onClick={onClickSignIn} style={{ backgroundColor: "#cbcdd0" }}>
                        <h5>登入</h5>
                    </div>
                    <div className="inBlock" id="signup" onClick={onClickSignUp}>
                        <h5>註冊</h5>
                    </div>
                </div>
                {handler ? (<form method="post" target="_self" onSubmit={onSubmit}>
                    <div className='form-floating mb-2'>
                        <input type='email' className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={
                            (e) => {
                                setEmail(e.target.value);
                            }
                        } />
                        <label htmlFor="floatingEmail">Email address</label>
                    </div>
                    <div className="form-floating mb-2">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={
                            (e) => {
                                setPassword(e.target.value);
                            }
                        } />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>
                    <button type="button" className="btn btn-lg btn-dark w-100 mt-5" onClick={onSubmit}>{handler ? "登入" : "註冊"}</button>
                </form>) :
                    (<form method="post" target="_self" onSubmit={onSubmit}>
                        <div className='form-floating mb-2'>
                            <input type='name' className="form-control" id="floatingName" placeholder="name" onChange={
                                (e) => {
                                    setName(e.target.value);
                                }
                            } />
                            <label htmlFor="floatingname">ex: 松上羽球館</label>
                        </div>
                        <div className='form-floating mb-2'>
                            <input type='email' className="form-control" id="floatingEmail" placeholder="name@example.com" onChange={
                                (e) => {
                                    setEmail(e.target.value);
                                }
                            } />
                            <label htmlFor="floatingEmail">Email address</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={
                                (e) => {
                                    setPassword(e.target.value);
                                }
                            } />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <AddrSet 
                        county = {county}
                        setCounty = {setCounty}
                        town = {town}
                        setTown = {setTown}
                        countynamelist = {countynamelist}
                        countycodelist = {countycodelist}
                        setAddr = {setAddr}
                        ></AddrSet>
                        <div className="opentimeset">
                            <div className='opentimeTopic'>-營業時間-</div>
                            <div className="spllit"></div>
                            <WeekOpentime weekOpenTimeList={weekOpenTimeList} setWeekOpenTimeList={setWeekOpenTimeList}></WeekOpentime>
                        </div>
                        <div className="opentimeset">
                            <div className='opentimeTopic'>-場地數量-</div>
                            <div className="spllit"></div>
                            <CourtSetting courtCount={courtCount} setCourtCount={setCourtCount}></CourtSetting>
                        </div>
                        <div className="opentimeset">
                            <div className='opentimeTopic'>-場地租金-</div>
                            <div className="spllit"></div>
                            <MoneySetting setMoney={setMoney}></MoneySetting>
                        </div>

                        <button type="button" className="btn btn-lg btn-dark w-100 mt-5" onClick={onSubmit}>{handler ? "登入" : "註冊"}</button>
                    </form>)

                }
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">{handler ? "登入提示" : "註冊提示"}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {modalContent}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}