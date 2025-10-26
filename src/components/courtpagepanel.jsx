import GeneralBookingPanel from "./generalBookingPanel";
import MobileBookingPanel from "./mobilebookingpanel";
import style from '../ui/courtpagepanel.module.css';


//CourtPagePanel用來判斷哪一種courtpage的預訂小視窗的RWD
export default function CourtPagePanel({
    storeData,
    activePage,
    setActivePage,
    pay,
    setPay,
    handleBooking,
    setBooking,
    loading,
    renderPage
}) {
    return (
        <>
            {/* 桌機版booking RWD */}
            <div className={style['booking-panel-desktop']}>
                <GeneralBookingPanel
                    storeData={storeData}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    pay={pay}
                    setPay={setPay}
                    handleBooking={handleBooking}
                    setBooking={setBooking}
                    loading={loading} />
            </div>

            {/* 手機版booking RWD */}
            <div className={style['booking-panel-mobile']}>
                <MobileBookingPanel
                    storeData={storeData}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    pay={pay}
                    setPay={setPay}
                    handleBooking={handleBooking}
                    setBooking={setBooking}
                    loading={loading} />
            </div>
        </>
    )
}