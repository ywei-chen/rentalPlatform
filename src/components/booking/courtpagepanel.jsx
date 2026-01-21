import { useEffect, useState } from "react";
import GeneralBookingPanel from "./generalbookingpanel";
import MobileBookingPanel from "./mobilebookingpanel";

// CourtPagePanel用來判斷哪一種courtpage的預訂小視窗的RWD
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
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const widthHandler = () => {
            setIsMobile(window.innerWidth <= 768)
        };

        window.addEventListener('resize', widthHandler);
        return () => {
            window.removeEventListener('resize', widthHandler);
        };

    }, []);


    return (
        <>
            {isMobile ? (
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