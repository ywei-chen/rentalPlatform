import "../ui/ownerpage.css";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'react-bootstrap';

const PageMonth = () => {
    return (<>月租頁</>)
}

const PageSeason = () => {
    return (<>季租頁</>)
}

const PageYear = () => {
    return (<>年租頁</>)
}


export default function Ownerpage() {
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const opentime = Array.from({ length: 13 }, (_, i) => `${i + 10}:00`);
    const [activePage , setActivePage] = useState('pageHour');
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const renderPage = () => {
        switch(activePage){
            case 'pageHour':
                return (<>
                    <div className="hourselect" ref={dropdownRef}>
                        {showPicker && (
                            <div className="datepicker">
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => {
                                        setSelectedDate(date);
                                        setShowPicker(false);
                                    }}
                                    inline
                                />
                            </div>
                        )}
                        <div className="dateselect" onClick={() => setShowPicker((prev) => !prev)}>
                            <div className="graph1">
                                 <i className="fa-regular fa-calendar-days fa-lg"></i>
                            </div>
                            <span>{selectedDate.toLocaleDateString()}</span>
                            <span>{weekDays[selectedDate.getDay()]}</span>
                            <div className="graph2">
                                <i className={showPicker? 'fa-regular fa-square-caret-up fa-lg' : 'fa-regular fa-square-caret-down fa-lg'}></i>
                            </div>                            
                        </div>
                        <div className="dailyslesct">
                            <div className="date">
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        開始時間
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>開始時間</Dropdown.Item>
                                        {opentime.map((hour, index) => {
                                            return (<>
                                                <Dropdown.Item key={index}>{hour}</Dropdown.Item>
                                            </>)
                                        })}
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className="time">
                                <Dropdown>
                                    <Dropdown.Toggle variant="" id="dropdown-basic">
                                        結束時間
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>10:00</Dropdown.Item>
                                        <Dropdown.Item>11:00</Dropdown.Item>
                                        <Dropdown.Item>12:00</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </>)
            case 'pageMonth':
                return (<>
                    <PageMonth></PageMonth>
                </>)
            case 'pageSeason':
                return(<>
                    <PageSeason></PageSeason>
                </>)
            case 'pageYear':
                return(<>
                    <PageYear></PageYear>
                </>)
        }
    }

    const buttonColor = (page) => ({
         backgroundColor: activePage === page ? 'white' : '#e2e2e2'
    })

    return (<>
        <div className='container-lg'>
            <div className='pictureoutline'>
                <div className="pic-1">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-1.jpg' alt=''></img>
                </div>
                <div className="pic-2">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-2.jpg' alt=''></img>
                </div>
                <div className="pic-3">
                    <img src='https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court-3.jpg' alt=''></img>
                </div>
            </div>
        </div>
        <div className='container-lg'>
            <div className="contentsplit">
                <div className='contextspace'>
                    <section className='storenameaddress'>
                        <div>
                            <div className="topicgraph">
                                <i className="fa-regular fa-user fa-xl"></i>
                                <div className="topicfont">松上羽球館</div>
                                <div className="buttongroup">
                                    <button className="buttonTop">飲水機</button>
                                    <button className="buttonTop">停車場</button>
                                </div>
                            </div>
                            <div className="topicontent">高雄市左營區文學路265號</div>
                        </div>
                    </section>
                    <section className='space&picture'>
                        <div>
                            <div className="topicgraph">
                                <i className="fa-regular fa-image fa-xl"></i>
                                <div className="topicfont">空間介紹</div>
                            </div>
                            <div className="topicontent">以下繪製的場地實際完全參考商家實體場地布置</div>
                            <div className="picture">
                                <div className="courtexaple">
                                    <div>[1]</div>
                                    <img src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png" alt="" />
                                </div>
                                <div className="courtexaple">
                                    <div>[2]</div>
                                    <img src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png" alt="" />
                                </div>
                                <div className="courtexaple">
                                    <div>[3]</div>
                                    <img src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png" alt="" />
                                </div>
                                <div className="courtexaple">
                                    <div>[4]</div>
                                    <img src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png" alt="" />
                                </div>
                                <div className="courtexaple">
                                    <div>[5]</div>
                                    <img src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='hourtime'>
                        <div>
                            <div className="topicgraph">
                                <i className="fa-regular fa-calendar fa-xl"></i>
                                <div className="topicfont">開放時段</div>
                            </div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>週一</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>週二</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>週三</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>週四</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>週五</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>週六</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>週日</td>
                                        <td>
                                            <div>
                                                <span>09:00 - 23:00</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className='provideditem'>
                    </section>
                </div>
                <div className="stickyspace">
                    <div className="stickyscope">
                        <div className="stickyblock">
                            <div className="priceselect">
                                <div className="pricecontent">
                                    <span className="topicfont">$360</span>
                                    <small>/小時</small>
                                </div>
                                </div>
                                <div className="inputselect">
                                    <label className="inputscope">                                      
                                        <div className="inputcondition">
                                            <span id="hourRent" style={buttonColor('pageHour')} onClick={() => setActivePage('pageHour')}>時租</span>
                                            <span id="monthRent" style={buttonColor('pageMonth')} onClick={() => setActivePage('pageMonth')}>月租</span>
                                            <span id="seasonReant" style={buttonColor('pageSeason')} onClick={() => setActivePage('pageSeason')}>季租</span>
                                            <span id="yearRent" style={buttonColor('pageYear')} onClick={() => setActivePage('pageYear')}>年租</span>
                                        </div>
                                    </label>
                                </div>
                                <div className="renderblock">
                                    {renderPage()}
                                </div>
                            <button className="buttonselect">預定</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='split'></div>
        </div>

    </>)
}

