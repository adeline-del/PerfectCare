import express from 'express';
import { 
  loginUser, registerUser, getProfile, updateProfile, bookAppointment, 
  listAppointment, cancelAppointment, 
  paymentStripe, verifyStripe 
} from '../controllers/userController.js';
import { initializePaystack } from '../controllers/paymentController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

userRouter.get("/get-profile", authUser, getProfile)
userRouter.post("/update-profile", upload.single('image'), authUser, updateProfile)
userRouter.post("/book-appointment", authUser, bookAppointment)
userRouter.get("/appointments", authUser, listAppointment)
userRouter.post("/cancel-appointment", authUser, cancelAppointment)

// Stripe
userRouter.post("/payment-stripe", authUser, paymentStripe)
userRouter.post("/verifyStripe", authUser, verifyStripe)

// Paystack
userRouter.post("/payment-paystack", authUser, initializePaystack)

export default userRouter;
