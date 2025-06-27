import axios from 'axios';
import appointmentModel from '../models/appointmentModel.js';

export const initializePaystack = async (req, res) => {
  try {
    const { appointmentId, email } = req.body;

    const appointment = await appointmentModel.findById(appointmentId);

    if (!appointment || appointment.cancelled) {
      return res.status(400).json({ success: false, message: 'Invalid or cancelled appointment' });
    }

    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: appointment.amount * 100, // GHS to pesewa
        currency: 'GHS',
        metadata: {
          appointmentId: appointment._id.toString()
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ success: true, authorization_url: response.data.data.authorization_url });

  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Paystack payment failed' });
  }
};
