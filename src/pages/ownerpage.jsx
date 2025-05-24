import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../ui/ownerpage.css";


export default function Ownerpage() {

    return(<>
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
            <div className='contextspace'>
                <section className='storenameaddress'>
                    <div>
                        <div className="topicgraph">
                            <i className="fa-regular fa-user fa-xl"></i>
                            <div className="topicfont">松上羽球館</div>
                        </div>               
                        <div className="address">高雄市左營區文學路265號</div>
                    </div> 
                </section>
                <section className='space&picture'>
                    <div>
                        <div className="topicgraph">
                            <i className="fa-regular fa-image fa-xl"></i>
                            <div className="topicfont">空間介紹</div>
                        </div>                     
                        <div className="picture"></div>           
                    </div>
                </section>
                <section className='hourtime'>
                    <div>
                        <div className="topicfont">開放時段</div>
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
                <div className='split'></div>
                <section className='provideditem'>
                    <div>
                        <div className="topicfont">提供的設備服務</div>
                        <div>飲水機</div>
                        <div>停車場</div>
                    </div>
                </section>
            </div>
        </div>
    
    </>)
}

