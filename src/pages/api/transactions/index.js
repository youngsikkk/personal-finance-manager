import { authenticate } from '../../../utils/auth';
import dbConnect from '../../../utils/dbConnect';
import Transaction from '../../../models/Transaction';
import Budget from '../../../models/Budget';
import sendEmail from '../../../utils/email';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await authenticate(req, res, async () => {
        try {
          const transactions = await Transaction.find({ user: req.user._id });
          res.status(200).json({ success: true, data: transactions });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      });
      break;

    case 'POST':
      await authenticate(req, res, async () => {
        try {
          const { type, amount, category, date, description } = req.body;
          const transaction = await Transaction.create({
            user: req.user._id,
            type,
            amount,
            category,
            date,
            description,
          });

          // 예산 초과 확인
          const budgets = await Budget.find({ user: req.user._id, category });
          const totalExpenses = await Transaction.aggregate([
            { $match: { user: req.user._id, category, type: 'expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } },
          ]);

          if (budgets.length > 0 && totalExpenses.length > 0 && totalExpenses[0].total + amount > budgets[0].amount) {
            // 예산 초과 이메일 알림
            await sendEmail(req.user.email, 'Budget Exceeded', `You have exceeded your budget for ${category}.`);
          }

          res.status(201).json({ success: true, data: transaction });
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
