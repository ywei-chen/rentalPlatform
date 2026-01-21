import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from 'motion/react';
import style from '../../ui/mobilebookingpanel.module.css';
import HourRent from './rentTypes/hourrent';
import MonthRent from './rentTypes/monthrent';
import SeasonRent from './rentTypes/seasonrent';
import YearRent from './rentTypes/yearrent';

export default function MobileBookingPanel({
    storeData,
    pay,
    setPay,
    handleBooking,
    setBooking,
    loading
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('pageHour');

    const renderPage = () => {
        switch (activePage) {
            case 'pageHour':
                return <HourRent pay={pay} />
            case 'pageMonth':
                return <MonthRent pay={pay} />
            case 'pageSeason':
                return <SeasonRent pay={pay} />
            case 'pageYear':
                return <YearRent pay={pay} />
        }
    }

    const buttonColor = (page) => ({
        backgroundColor: activePage === page ? 'white' : 'transparent'
    })

    return (
        <>
            <div className={style.triggerBar}>
                <div>
                    <span>${pay}</span>
                    <small>/小時</small>
                </div>
                <button className={style.triggerBtn} onClick={() => setIsOpen(true)}>
                    預約
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className={style.overlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            className={style.panel}
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        >
                            <div className={style.handle} />
                            <button className={style.closeBtn} onClick={() => setIsOpen(false)}>
                                &times;
                            </button>
                            <div style={{ textAlign: 'left', paddingBottom: '15px' }}>
                                <span style={{ fontSize: '22px', fontWeight: 600 }}>${pay}</span>
                                <small>/小時</small>
                            </div>
                            <div className={style.typeSelector}>
                                {['Hour', 'Month', 'Season', 'Year'].map((type) => (
                                    <button
                                        key={type}
                                        className={style.typeBtn}
                                        style={buttonColor(`page${type}`)}
                                        onClick={() => {
                                            setActivePage(`page${type}`);
                                            setPay(storeData.rent[type.toLowerCase()]);
                                            setBooking({ rentType: type });
                                        }}
                                    >
                                        {type === 'Hour' ? '時租' :
                                            type === 'Month' ? '月租' :
                                                type === 'Season' ? '季租' : '年租'}
                                    </button>
                                ))}
                            </div>
                            <div>
                                {renderPage()}
                            </div>
                            <button className={style.bookBtn} onClick={handleBooking}>
                                {loading ? '預約中...' : '預訂'}
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}