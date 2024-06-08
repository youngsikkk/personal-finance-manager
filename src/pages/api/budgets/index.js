import { authenticate } from '../../../utils/auth';
import dbConnect from '../../../utils/dbConnect';
import Budget from '../../../models/Budget';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await authenticate(req, res, async () => {
        try {
          const budgets = await Budget.find({ user: req.user._id });
          res.status(200).json({ success: true, data: budgets });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      });
      break;

    case 'POST':
      await authenticate(req, res, async () => {
        try {
          const { category, amount, date } = req.body;
          const budget = await Budget.create({
            user: req.user._id,
            category,
            amount,
            date,
          });
          res.status(201).json({ success: true, data: budget });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      });
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
