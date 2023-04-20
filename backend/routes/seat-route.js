import express from 'express';
import { getAllSeats,createSeat, getSeatInfo,updateSeatBooked, removeBooked, deleteSeat, updateSeat } from '../controllers/seat-controller.js';
const router=express.Router();

router.route('/').get(getAllSeats);
router.route('/add').post(createSeat);
router.route('/seat/:floor').get(getSeatInfo);
router.route('/updateseat').post(updateSeatBooked)
router.route('/updatebookedseat').post(removeBooked)
router.route('/update').post(updateSeat);
router.route('/delete/:id').get(deleteSeat);

// router.route('/login').post(loginUser);
// router.route('/userdata').post(userData);

export default router;