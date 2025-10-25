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
import { motion } from 'motion/react';
import CourtPagePanel from "../components/courtpagepanel";

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
        if (endA <= startB || startA >= endB) {
            return false;
        }
        return true;
    }

    const handleBooking = async () => {
        if (loading) return;
        setLoading(true)

        if (!user) {
            alert('請先登入才可以預訂');
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

        //用時間與場地判斷是否衝突
        querySnapshot.forEach((doc) => {
            const existingBooking = doc.data();
            console.log('2', existingBooking);
            const hasoverlapCourt = existingBooking.bookingCourt.some(court => bookingCourt.includes(court));
            if (hasoverlapCourt) {
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

    /*const renderPage = () => {
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
    })*/

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
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>{storeData.address}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <iframe
                                width='100%'
                                height="300"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                                src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_TOKEN}&q=${storeData.address}`}>
                            </iframe>
                        </div>
                    </section>
                    <section className='space&picture'>
                        <div>
                            <div className="topicgraph">
                                <div className="topicfont">空間介紹</div>
                            </div>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                        <td>球館共有{totalCourt.length}面場地</td>
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
                            <table className="table table-striped">
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
                        <div>
                            <div className="topicgraph">
                                <div className="topicfont">提供服務</div>
                            </div>
                            <table className="table table-striped-columns">
                                <tbody>
                                    <tr>
                                        <td>停車場</td>
                                        <td>飲水機</td>
                                        <td>盥洗室</td>
                                        <td>販賣機</td>
                                        <td>有冷氣</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section>
                        <div>
                            <div className="topicgraph">
                                <div className="topicfont">使用規範</div>
                            </div>
                            <ul className="mt-2">
                                <li>遵守大樓規範，公共區域應保持輕聲細語，請勿大聲喧嘩。</li>
                                <li>請配合準時離場，不得超時使用，且不可佔用公共空間。</li>
                                <li>請自行清潔環境，愛惜空間內所有設備。</li>
                            </ul>
                        </div>
                    </section>
                    <div className="split"></div>
                    <section>
                        <div>
                            <div className="topicgraph">
                                <div className="topicfont">禁止事項</div>
                            </div>
                            <ul className="mt-2">
                                <li>禁止攜帶寵物入內（導盲犬則不在此限)</li>
                                <li>禁止烹飪或使用明火之加熱設備</li>
                                <li>禁止使用擴音設備</li>
                                <li>禁止使用麥克風</li>
                                <li>禁止吸菸</li>
                            </ul>
                        </div>
                    </section>
                </div>
                {/*<div className="stickyspace">
                    <div className="stickyscope">
                        <div className="stickyblock">
                            <div className="priceselect">
                                <div className="pricecontent">
                                    <motion.span
                                        className="topicfont"
                                        key={pay}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >{pay}</motion.span>
                                    <small>/小時</small>
                                </div>
                            </div>
                            <div className="inputselect">
                                <label className="inputscope">
                                    <div className="inputcondition">
                                        <motion.span key='pageHour' id="hourRent" style={buttonColor('pageHour')} onClick={() => {
                                            setActivePage('pageHour');
                                            setPay(storeData.rent.hour);
                                            setBooking({ rentType: 'hour' });
                                        }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 8 }}
                                        >時租</motion.span>
                                        <motion.span key='pageMonth' id="monthRent" style={buttonColor('pageMonth')} onClick={() => {
                                            setActivePage('pageMonth');
                                            setPay(storeData.rent.months);
                                            setBooking({ rentType: 'month' });
                                        }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 8 }}
                                        >月租</motion.span>
                                        <motion.span key='pageSeason' id="seasonReant" style={buttonColor('pageSeason')} onClick={() => {
                                            setActivePage('pageSeason');
                                            setPay(storeData.rent.season);
                                            setBooking({ rentType: 'season' });
                                        }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 8 }}
                                        >季租</motion.span>
                                        <motion.span key={activePage} id="yearRent" style={buttonColor('pageYear')} onClick={() => {
                                            setActivePage('pageYear');
                                            setPay(storeData.rent.year);
                                            setBooking({ rentType: 'year' });
                                        }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 8 }}
                                        >年租</motion.span>
                                    </div>
                                </label>
                            </div>
                            <div className="renderblock">
                                {renderPage()}
                            </div>
                            <button className="buttonselect" onClick={handleBooking}> {loading ? '預約中...' : '預訂'}</button>
                        </div>
                    </div>
                </div>*/}
                <CourtPagePanel
                    storeData={storeData}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    pay={pay}
                    setPay={setPay}
                    handleBooking={handleBooking}
                    setBooking={setBooking}
                    loading={loading}
                />
            </div>
        </div>
        <div className="mobileBooking">
            <div>
                <span className="topicfont">{pay}</span>
                <small>/小時</small>
            </div>
            <div>
                <button className="buttonMobile">預訂</button>
            </div>
        </div>
        <Footer></Footer>
        <div className="page-content-bottom-space"></div>
    </>)
}

