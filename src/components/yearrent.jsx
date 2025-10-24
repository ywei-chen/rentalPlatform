import "../ui/ownerpage.css";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { addDays } from "date-fns";
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

export default function YearRent({ pay }) {
    const initialDate = new Date();
    initialDate.setHours(0, 0, 0, 0);
    const totalDays = 336;
    const totalTimes = 49;
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const opentime = Array.from({ length: 13 }, (_, i) => i + 10);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(initialDate);
    const [endDate, setEndDate] = useState(addDays(selectedDate, totalDays));
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const dropdownRef = useRef(null);
    const { setBooking, bookingCourt, totalCourt, bookingDate, toggleBookingCourt } = useBookingData();

    const isTimeSelected = (startTime !== null && endTime !== null);
    const totalHours = endTime && startTime ? (endTime - startTime) : 0;
    const totalPrice = bookingCourt.length > 0 && totalHours > 0 ? (totalHours * pay * bookingCourt.length) : 0;
    const endTimeOption = opentime.filter(hour => startTime === null || hour > Number(startTime));

    const handleStartDateChange = (date) => {
        const calculatedEnd = addDays(date, totalDays);
        setSelectedDate(date);
        setEndDate(calculatedEnd);
        setShowPicker(false);
    }

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
        setBooking({ rentType: 'year' });
    }, [setBooking]);

    useEffect(() => {
        if (totalPrice > 0) {
            setBooking({ totalPrice });
        }
    }, [totalPrice, setBooking]);

    useEffect(() => {
        let generatedDates = [];
        for (let i = 0; i < totalTimes; i++) {
            generatedDates.push(addDays(selectedDate, i * 7));
        }
        setBooking({ bookingDate: generatedDates.map(d => format(d, 'yyyy-MM-dd')) });
    }, [selectedDate]);

    return (
        <AnimatePresence>
            <motion.div
                key='yearrent'
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
                                onChange={handleStartDateChange}
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
                    {endDate && isTimeSelected && (
                        <div className="dateselect">
                            <div className="graph1">
                                <i className="fa-regular fa-calendar-days fa-lg"></i>
                            </div>
                            <span>{endDate.toLocaleDateString()}</span>
                            <span>{weekDays[endDate.getDay()]}</span>
                            <div className="graph2">
                                <i className="fa-regular fa-calendar-check fa-lg"></i>
                            </div>
                        </div>
                    )}
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
                            <h5>{`$${pay} x ${totalHours} 小時 x ${bookingCourt.length} 個場地 x 49次`}</h5>
                            <div className="split" />
                            <h5>{`金額總計: ${totalPrice * totalTimes} 元`}</h5>
                        </div>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    )
}