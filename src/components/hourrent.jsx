import "../ui/ownerpage.css";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Dropdown } from 'react-bootstrap';
import { useBookingData } from "./bookingStore";
import { format } from "date-fns";
import { AnimatePresence, motion } from "motion/react";

const CourtcountyButton = ({ item, isSelected, onClick }) => {
    return (
        <button
            className="col-2 text-center border-0 h-100"
            onClick={onClick}
            style={{ backgroundColor: isSelected ? '#dcdcdc' : 'transparent' }}
        >
            <div>
                <div>[{item}]</div>
                <img
                    src="https://raw.githubusercontent.com/ywei-chen/siteFalicyCRADemo/refs/heads/main/src/assets/court.png"
                    alt=""
                />
            </div>
        </button>
    )
}



export default function HourRent({ pay }) {
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const opentime = Array.from({ length: 13 }, (_, i) => i + 10);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const dropdownRef = useRef(null);
    const { setBooking, bookingCourt, totalCourt, toggleBookingCourt } = useBookingData();

    const isTimeSelected = (startTime !== null && endTime !== null);
    const totalHours = endTime && startTime ? (endTime - startTime) : 0;
    const totalPrice = bookingCourt.length > 0 && totalHours > 0 ? (totalHours * pay * bookingCourt.length) : 0;
    const endTimeOption = opentime.filter(hour => startTime === null || hour > Number(startTime));

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (totalPrice > 0) {
            setBooking({ totalPrice });
        }
    }, [totalPrice]);

    useEffect(() => {
        setBooking({ bookingDate: format(selectedDate, 'yyyy-MM-dd') });
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                key='hourrent'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
            >
                <div className="hourselect" ref={dropdownRef}>
                    {showPicker && (
                        <div className="datepicker">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => {
                                    setSelectedDate(date);
                                    setShowPicker(false);
                                    setBooking({ bookingDate: format(date, 'yyyy-MM-dd') });
                                }}
                                inline
                            />
                        </div>
                    )}
                    <div className="dateselect" onClick={() => setShowPicker((prev) => !prev)}>
                        <div className="graph1">
                            <i className="fa-regular fa-calendar-days fa-lg"></i>
                        </div>
                        <span>{selectedDate.toLocaleDateString()}</span>
                        <span>{weekDays[selectedDate.getDay()]}</span>
                        <div className="graph2">
                            <i className={showPicker ? 'fa-regular fa-square-caret-up fa-lg' : 'fa-regular fa-square-caret-down fa-lg'}></i>
                        </div>
                    </div>
                    <div className="dailyslesct">
                        <div className="date">
                            <Dropdown onSelect={(hour) => {
                                const selected = Number(hour);
                                setStartTime(selected);
                                setEndTime(null);
                                setBooking({ bookingStartTime: selected, bookingEndTime: null });
                            }}>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    {startTime === null ? '開始時間' : `${startTime}:00`}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {opentime.map((hour, index) => {
                                        return (
                                            <Dropdown.Item key={index} eventKey={hour}>{hour}:00</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                        <div className="time">
                            <Dropdown onSelect={(hour) => {
                                const selected = Number(hour);
                                setEndTime(selected);
                                setBooking({ bookingEndTime: selected });
                            }}>
                                <Dropdown.Toggle variant="" id="dropdown-basic">
                                    {endTime === null ? '結束時間' : `${endTime}:00`}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {endTimeOption.map((hour, index) => {
                                        return (
                                            <Dropdown.Item key={index} eventKey={hour}>{hour}:00</Dropdown.Item>
                                        )
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    {isTimeSelected && (
                        <div className="row me-3 mt-2">
                            {totalCourt.map((item, index) => (
                                <CourtcountyButton
                                    item={item}
                                    key={index}
                                    isSelected={bookingCourt.includes(item)}
                                    onClick={() => toggleBookingCourt(item)}
                                />
                            ))}
                        </div>
                    )}
                    {bookingCourt.length > 0 && (
                        <div className="payCount">
                            <h5>{`$${pay} x ${totalHours} 小時 x ${bookingCourt.length} 個場地`}</h5>
                            <div className="split" />
                            <h5>{`金額總計: ${totalPrice} 元`}</h5>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}