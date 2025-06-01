import "../ui/ownerpage.css";
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { addDays, format } from "date-fns";
import { Dropdown } from 'react-bootstrap';

export default function YearRent({ pay }) {
    const totalDays = 336;
    const weekDays = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
    const opentime = Array.from({ length: 13 }, (_, i) => i + 10);
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [endDate, setEndDate] = useState(addDays(selectedDate, totalDays));
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const dropdownRef = useRef(null);
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

    return (<>
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
                        setStartTime(Number(hour));
                        setEndTime(null);
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
                        setEndTime(Number(hour));
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
        </div>
        {endDate && startTime && endTime && (
            <div>
                <div className="dateselect">
                    <div className="graph1">
                        <i className="fa-regular fa-calendar-days fa-lg"></i>
                    </div>
                    <span>{endDate.toLocaleDateString()}</span>
                    <span>{weekDays[endDate.getDay()]}</span>
                </div>
                <div className="payCount">
                    <h5>{`$${pay} x ${(endTime - startTime)}小時 x 48次`}</h5>
                    <div className="split" />
                    <h5>{`金額總計: ${(endTime - startTime) * (pay) *48}元`}</h5>
                </div>
            </div>
        )}
    </>)
}