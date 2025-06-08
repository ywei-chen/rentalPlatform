import "../ui/ownerpage.css"
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Dropdown } from 'react-bootstrap';
import { updateDoc } from "firebase/firestore";

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
                <label htmlFor="floatingmonths">鼎中路726號4樓</label>
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
        months: 0,
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

    if (!profile) return <div>載入中...</div>;

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
        <button className="revise" onClick={onSubmit}>送出修改</button>
        <div className="split"></div>

    </>

    );
}