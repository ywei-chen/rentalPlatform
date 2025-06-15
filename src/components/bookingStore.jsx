import { create } from "zustand";

export const useBookingData = create((set) => ({
    totalCourt: [],
    rentType: 'hour',
    bookingCourt: [],
    totalPrice: null,
    bookingDate: [],
    bookingStartTime: null,
    bookingEndTime: null,
    setBooking: (data) => set((state) => ({...state, ...data})),
    resetBooking: () => set({
        totalCourt: [],
        rentType: 'hour',
        bookingCourt: [],
        totalPrice: null,
        bookingDate: [],
        bookingStartTime: null,
        bookingEndTime: null,
    }),

    setTotalCourt: (courtCount) =>
        set({ totalCourt: Array.from({ length: courtCount }, (_, i) => i + 1) }),

    toggleBookingCourt: (courtNumber) =>
        set((state) => {
            const isSelected = state.bookingCourt.includes(courtNumber);
            return {
                bookingCourt: isSelected
                    ? state.bookingCourt.filter((c) => c !== courtNumber)
                    : [...state.bookingCourt, courtNumber]
            };
        })
}));