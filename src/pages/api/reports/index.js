import { authenticate } from '../../../utils/auth';
import dbConnect from '../../../utils/dbConnect';
import Transaction from '../../../models/Transaction';
import generateReport from '../../../utils/report';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await authenticate(req, res, async () => {
        try {
          const { period } = req.query;
          let startDate, endDate;

          const currentDate = new Date();
          switch (period) {
            case 'monthly':
              startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
              break;
            case 'quarterly':
              const quarter = Math.floor((currentDate.getMonth() + 3) / 3);
              startDate = new Date(currentDate.getFullYear(), (quarter - 1) * 3, 1);
              endDate = new Date(currentDate.getFullYear(), quarter * 3, 0);
              break;
            case 'yearly':
              startDate = new Date(currentDate.getFullYear(), 0, 1);
              endDate = new Date(currentDate.getFullYear(), 11, 31);
              break;
            default:
              res.status(400).json({ success: false, message: 'Invalid period' });
              return;
          }

          const transactions = await Transaction.find({
            user: req.user._id,
            date: { $gte: startDate, $lte: endDate },
          });

          const pdfBytes = await generateReport(transactions, period);
          res.setHeader('Content-Disposition', `attachment; filename=${period}-report.pdf`);
          res.setHeader('Content-Type', 'application/pdf');
          res.send(pdfBytes);
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
