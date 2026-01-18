import "../ui/ownerpage.css";
import Footer from "../components/common/footer";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { Dropdown } from 'react-bootstrap';
import { collection, query, where, getDocs, doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

const MoneySetting = ({ setMoney }) => {
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
                <input type='text' className="form-control" id="floatingmonth" placeholder="money" onChange={
                    (e) => {
                        handleChange('month', e.target.value);
                    }
                } />
                <label htmlFor="floatingmonth">月租 ex: 300</label>
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
                        <div key={index} className="openslesct">
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
        </>
    )
}

const AddrSet = ({ county, setCounty, town, setTown, countynamelist, countycodelist, setAddr }) => {
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
                <label htmlFor="floatingmonth">鼎中路726號4樓</label>
            </div>
        </div>
    )
}

export default function Ownerpage() {
    const parser = new XMLParser();
    const { uid } = useParams();
    const [profile, setProfile] = useState(null);
    const [county, setCounty] = useState('');
    const [town, setTown] = useState('');
    const [addr, setAddr] = useState('');
    const [bookings, setBookings] = useState([]);
    const [usersMap, setUsersMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [countynamelist, setCountynamelist] = useState([]);
    const [countycodelist, setCountycodelist] = useState([]);
    const [weekOpenTimeList, setWeekOpenTimeList] = useState([
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' },
        { open: '', close: '' }
    ]);
    const [money, setMoney] = useState({
        hour: 0,
        month: 0,
        season: 0,
        year: 0
    });

    const onSubmit = async () => {
        const storeRef = doc(db, 'stores', uid);
        try {
            await updateDoc(storeRef, {
                rent: money,
                address: county + town + addr,
                dutytime: weekOpenTimeList,
            })
            alert("資料已成功更新！");
        } catch (error) {
            console.error("更新失敗:", error);
            alert("更新失敗，請稍後再試！");
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            const docSnap = await getDoc(doc(db, "stores", uid));
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            }
            const bookingRef = collection(db, 'bookings');
            const q = query(bookingRef, where('StoreID', '==', uid));
            const querySnapshot = await getDocs(q);
            const bookingList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log(bookingList);
            setBookings(bookingList);

            const userUids = [...new Set(bookingList.map(b => b.userID))];

            let userNameMap =  {};
            for (const userUid of userUids) {
                const userDoc = await getDoc(doc(db, 'users', userUid));
                if (userDoc.exists()) {
                    userNameMap[userUid] = userDoc.data().userName;
                } else {
                    userNameMap[userUid] = "未知使用者";
                }
            }
            setUsersMap(userNameMap);
            setLoading(false);
        };

        fetchProfile();
    }, [uid]);

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
    }, [])

    const handleCancel = async (bookingId, date) => {
        if (!window.confirm('確定要取消這筆預約嗎？')) return;

        try {
            const bookingRef = doc(db, 'bookings', bookingId);
            const bookingSnap = await getDoc(bookingRef);
            if (bookingSnap.exists()) {
                let currentData = bookingSnap.data();

                const updatedDates = currentData.bookingDate.filter(d => d !== date);

                if (updatedDates.length > 0) {
                    await updateDoc(bookingRef, { bookingDate: updatedDates });
                } else {
                    await deleteDoc(bookingRef);
                }

                setBookings(prev => prev.map(b => {
                    if (b.id === bookingId) {
                        return { ...b, bookingDate: b.bookingDate.filter(d => d !== date) };
                    }
                    return b;
                }).filter(b => b.bookingDate.length > 0));
            }
        } catch (error) {
            alert('取消失敗');
            console.log(error);
        }
    }

    if (!profile) return <div>載入中使用者資料...</div>;
    if (loading) return <div>載入中預約資訊...</div>;

    return (<>
        <div className="context">
            <h6>Hi, {profile.storename} 歡迎回來</h6>
        </div>
        <div className="split"></div>
        <div className="settingChange">
            <div>
                <p>-場地租金調整-</p>
                <MoneySetting setMoney={setMoney}></MoneySetting>
            </div>
            <div>
                <p>-營業時間調整-</p>
                <WeekOpentime weekOpenTimeList={weekOpenTimeList} setWeekOpenTimeList={setWeekOpenTimeList}></WeekOpentime>
            </div>
            <div>
                <p>-商家地址調整-</p>
                <AddrSet
                    county={county}
                    setCounty={setCounty}
                    town={town}
                    setTown={setTown}
                    countynamelist={countynamelist}
                    countycodelist={countycodelist}
                    setAddr={setAddr}
                ></AddrSet>
            </div>
        </div>
        <div className="text-end mx-5">
            <button className="revise" onClick={onSubmit}>送出修改</button>
        </div>
        <div className="split"></div>
        <div className="booking">
            {bookings.map(booking => (
                booking.bookingDate.map((date, index) => (
                    <div className="bookblock" key={`${booking.id}-${index}`}>
                        <div className="storename me-2">{usersMap[booking.userID] || '未知商家'}</div>
                        <div className="bookdate me-2">預約日期：{booking.bookingDate[index]}</div>
                        <div className="bookstarttime">{`預約時間：${booking.bookingStartTime}:00 - ${booking.bookingEndTime}:00`}</div>
                        <div className="bookcourt">{`預約場地: ${booking.bookingCourt}`}</div>
                        <div className="text-end">
                            <button className="buttonend" onClick={() => handleCancel(booking.id, date)}>取消預約</button>
                        </div>
                    </div>
                ))
            ))}
        </div>
        <Footer></Footer>
    </>

    );
}