import express from 'express';
import { createBooking, getAllBookings, getBooking, getBookingsByDate, getUserBooking, updateBooking, updateCheckInTime } from '../controllers/book-controller.js';

const router=express.Router();

router.route('/').get(getAllBookings);
router.route('/add').post(createBooking);
router.route('/update').post(updateBooking);
router.route('/updatetime').post(updateCheckInTime);
router.route('/get/:id').get(getBooking);
router.route('/getuser/:id').get(getUserBooking);
router.route('/getdate').post(getBookingsByDate);



export default router;