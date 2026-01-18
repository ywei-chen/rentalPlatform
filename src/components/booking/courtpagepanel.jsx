import GeneralBookingPanel from "./generalBookingPanel";
import MobileBookingPanel from "./mobilebookingpanel";

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
}) {
    return (
        <>
            {window.innerWidth <= 768 ? (
                <MobileBookingPanel
                    storeData={storeData}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    pay={pay}
                    setPay={setPay}
                    handleBooking={handleBooking}
                    setBooking={setBooking}
                    loading={loading}
                />
            ) : (
                <GeneralBookingPanel
                    storeData={storeData}
                    activePage={activePage}
                    setActivePage={setActivePage}
                    pay={pay}
                    setPay={setPay}
                    handleBooking={handleBooking}
                    setBooking={setBooking}
                    loading={loading}
                />
            )}
        </>
    )
}