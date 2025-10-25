import { motion } from "motion/react";
import '../ui/generalbookingpanel.module.css';
import HourRent from "./hourrent";
import MonthRent from "./monthrent";
import SeasonRent from "./seasonrent";
import YearRent from "./yearrent";

// 四種租賃選單component
export default function GeneralBookingPanel({
    storeData,
    activePage,
    setActivePage,
    pay,
    setPay,
    handleBooking,
    setBooking,
    loading }) {

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
                                {['Hour', 'Month', 'Season', 'Year'].map((type) => {
                                    return (<>
                                        <motion.div
                                            key={type}
                                            id={type}
                                            style={buttonColor(`page${type}`)}
                                            onClick={() => {
                                                setActivePage(`page${type}`);
                                                setPay(storeData.rent[type]);
                                                setBooking({ rentType: type });
                                            }}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ type: "spring", stiffness: 100, damping: 8 }}
                                        >
                                            {type === 'Hour' ? '時租' :
                                                type === 'Month' ? '月租' :
                                                    type === 'Season' ? '季租' : '年租'}
                                        </motion.div>
                                    </>)
                                })}
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