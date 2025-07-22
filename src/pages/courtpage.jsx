import "../ui/courtpage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/footer";
import HourRent from "../components/hourrent";
import MonthRent from "../components/monthrent";
import SeasonRent from "../components/seasonrent";
import YearRent from "../components/yearrent";
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, firebase } from "../components/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useBookingData } from "../components/bookingStore";

const Courtcounty = ({ item }) => {
    return (
        <div className="col-3 text-center">
            <div>
                <div >[{item}]</div>
                <img src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png" alt="" />
            </div>
        </div>
    )
}


export default function Courtpage() {
    const { uid } = useParams();
    const [storeData, setStoreData] = useState(null);
    const [activePage, setActivePage] = useState('pageHour');
    const [pay, setPay] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setBooking, rentType, bookingCourt, totalCourt, totalPrice, bookingDate, bookingStartTime, setTotalCourt, bookingEndTime } = useBookingData();

    useEffect(() => {
        (async () => {
            const storeRef = doc(db, "stores", uid);
            const docSnap = await getDoc(storeRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setStoreData(data);
                setPay(data.rent.hour);
                setTotalCourt(data.court)
            }
        })()
    }, [uid]);

    useEffect(() => {
        const auth = getAuth(firebase);
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })

        return () => unsubscribe();
    }, [])

    const isTimeOverlap = (startA, endA, startB, endB) => {
        if (endA <= startB || startA >= endB){
            return false;
        }
        return true;
    }

    const handleBooking = async() => {
        if(loading) return;
        setLoading(true)

        if (!user) {
            alert('請先登入才可以預定');
            setLoading(false);
            return;
        }

        const bookingQuery = query(
            collection(db, 'bookings'),
            where('StoreID', '==', uid),
            where('bookingDate', '==', bookingDate)
        );

        const querySnapshot = await getDocs(bookingQuery);
        let isConflict = false;

        querySnapshot.forEach((doc) => {
            const existingBooking = doc.data();
            console.log('2',existingBooking);
            const hasoverlapCourt = existingBooking.bookingCourt.some(court => bookingCourt.includes(court));
            if(hasoverlapCourt){
                if (isTimeOverlap(
                    bookingStartTime,
                    bookingEndTime,
                    existingBooking.bookingStartTime,
                    existingBooking.bookingEndTime
                )) {
                    isConflict = true;
                }
            }
        });

        if (isConflict) {
            alert('預約失敗：該時間已有人預約');
            setLoading(false);
            return;
        }

        const bookingData = {
            userID: user.uid,
            StoreID: uid,
            rentType,
            totalPrice,
            bookingDate,
            bookingCourt,
            bookingStartTime,
            bookingEndTime,
            createdAt: new Date()
        };

        try {
            const docRef = await addDoc(collection(db, 'bookings'), bookingData);
            alert('預約成功');
        } catch (error) {
            alert('預約失敗');
        } finally {
            setLoading(false);
        }

    }

    if (!storeData) return <div>載入中...</div>;

    const renderPage = () => {
        switch (activePage) {
            case 'pageHour':
                return (<>
                    <HourRent pay={pay}></HourRent>
                </>)
            case 'pageMonth':
                return (<>
                    <MonthRent pay={pay}></MonthRent>
                </>)
            case 'pageSeason':
                return (<>
                    <SeasonRent pay={pay}></SeasonRent>
                </>)
            case 'pageYear':
                return (<>
                    <YearRent pay={pay}></YearRent>
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
                                <div className="topicfont">{storeData.storename}</div>
                            </div>
                            <table className="table table-striped w-75">
                                <tbody>
                                    <tr>
                                        <td>{storeData.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className='space&picture'>
                        <div>
                            <div className="topicgraph">
                                <div className="topicfont">空間介紹</div>
                            </div>
                            <table className="table table-striped w-75">
                                <tbody>
                                    <tr>
                                        <td>此球館共有{totalCourt.length}面場地</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className='hourtime'>
                        <div>
                            <div className="topicgraph">
                                <div className="topicfont">開放時段</div>
                            </div>
                            <table className="table table-striped w-75">
                                <tbody>
                                    {["週一", "週二", "週三", "週四", "週五", "週六", "週日"].map((day, index) => (
                                        <tr key={index}>
                                            <td>{day}</td>
                                            <td>{`${storeData.dutytime[index].open} - ${storeData.dutytime[index].close}`}</td>
                                        </tr>
                                    ))}
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
                                    <span className="topicfont">{pay}</span>
                                    <small>/小時</small>
                                </div>
                            </div>
                            <div className="inputselect">
                                <label className="inputscope">
                                    <div className="inputcondition">
                                        <span id="hourRent" style={buttonColor('pageHour')} onClick={() => {
                                            setActivePage('pageHour');
                                            setPay(storeData.rent.hour);
                                            setBooking({ rentType: 'hour'});
                                        }}>時租</span>
                                        <span id="monthRent" style={buttonColor('pageMonth')} onClick={() => {
                                            setActivePage('pageMonth');
                                            setPay(storeData.rent.months);
                                            setBooking({ rentType: 'month'});
                                        }}>月租</span>
                                        <span id="seasonReant" style={buttonColor('pageSeason')} onClick={() => {
                                            setActivePage('pageSeason');
                                            setPay(storeData.rent.season);
                                            setBooking({ rentType: 'season'});
                                        }}>季租</span>
                                        <span id="yearRent" style={buttonColor('pageYear')} onClick={() => {
                                            setActivePage('pageYear');
                                            setPay(storeData.rent.year);
                                            setBooking({ rentType: 'year'});
                                        }}>年租</span>
                                    </div>
                                </label>
                            </div>
                            <div className="renderblock">
                                {renderPage()}
                            </div>
                            <button className="buttonselect" onClick={handleBooking}> {loading ? '預約中...' : '預定'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </>)
}

