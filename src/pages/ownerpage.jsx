import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../ui/ownerpage.css";
import { useState } from "react";

const PageHour = () => {
    return (<>時租頁</>)
}

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

    const [activePage , setActivePage] = useState('pageHour');

    const renderPage = () => {
        switch(activePage){
            case 'pageHour':
                return (<>
                    <PageHour></PageHour>
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

    /*const onClickhourRent = () => {
        const hourRent = document.getElementById('hourRent');
        const monthRent = document.getElementById('monthRent');
        const seasonReant = document.getElementById('seasonReant');
        const yearRent = document.getElementById('yearRent');

        hourRent.style.backgroundColor = 'white';
        monthRent.style.backgroundColor = '#e2e2e2';
        seasonReant.style.backgroundColor = '#e2e2e2';
        yearRent.style.backgroundColor = '#e2e2e2';
    }

    const onClickmonthRent = () => {
        const hourRent = document.getElementById('hourRent');
        const monthRent = document.getElementById('monthRent');
        const seasonReant = document.getElementById('seasonReant');
        const yearRent = document.getElementById('yearRent');

        hourRent.style.backgroundColor = '#e2e2e2';
        monthRent.style.backgroundColor = 'white';
        seasonReant.style.backgroundColor = '#e2e2e2';
        yearRent.style.backgroundColor = '#e2e2e2';
    }

    const onClickseasonReant = () => {
        const hourRent = document.getElementById('hourRent');
        const monthRent = document.getElementById('monthRent');
        const seasonReant = document.getElementById('seasonReant');
        const yearRent = document.getElementById('yearRent');

        hourRent.style.backgroundColor = '#e2e2e2';
        monthRent.style.backgroundColor = '#e2e2e2';
        seasonReant.style.backgroundColor = 'white';
        yearRent.style.backgroundColor = '#e2e2e2';
    }

    const onClickyearRent = () => {
        const hourRent = document.getElementById('hourRent');
        const monthRent = document.getElementById('monthRent');
        const seasonReant = document.getElementById('seasonReant');
        const yearRent = document.getElementById('yearRent');

        hourRent.style.backgroundColor = '#e2e2e2';
        monthRent.style.backgroundColor = '#e2e2e2';
        seasonReant.style.backgroundColor = '#e2e2e2';
        yearRent.style.backgroundColor = 'white';
    }
    */

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
                                <i class="fa-regular fa-calendar fa-xl"></i>
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
                            <div className="hourselect">
                                {renderPage()}
                                <div className="dateselect">
                                    <i class="fa-regular fa-calendar-days fa-xs"></i>
                                </div>
                                <div className="dailyslesct">
                                    <div className="date"></div>
                                    <div className="time"></div>
                                </div>
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

