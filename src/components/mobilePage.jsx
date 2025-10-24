import { AnimatePresence, motion } from 'motion/react';
import HourRent from './hourrent';
import MonthRent from './monthrent';
import SeasonRent from './seasonrent';
import YearRent from './yearrent';

export default function ({ isOpen }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key='panel'
                    initial={{ y: 0, scale: 0 }}
                    animate={{ y: 100, scale: 1 }}
                    exit={{ y: 0, scale: 0 }}
                    transition={{
                        duration: 0.4
                    }}
                >
                </motion.div>
            )}
        </AnimatePresence>
    )
}