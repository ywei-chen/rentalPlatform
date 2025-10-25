import { motion } from "motion/react";
import 'bootstrap/dist/css/bootstrap.min.css';

// 四種租賃選單component
export default function GeneralBookingPanel({
    storeData,
    activePage,
    setActivePage,
    pay,
    setPay,
    handleBooking,
    setBooking,
    loading,
    renderPage }) {

    //renderPage函式: 帶出租賃方式的component與既定的場地單價pay
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

    //buttonColor物件: render選定的選單顏色並套用css
    const buttonColor = (page) => ({
        backgroundColor: activePage === page ? 'white' : '#e2e2e2'
    })

    return (<>
        <div className="stickyspace">
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
                                <motion.span key='pageYear' id="yearRent" style={buttonColor('pageYear')} onClick={() => {
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
        </div>
    </>)




}