import { authenticate } from '../../../utils/auth';
import dbConnect from '../../../utils/dbConnect';
import Tag from '../../../models/Tag';

dbConnect();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      await authenticate(req, res, async () => {
        try {
          const tags = await Tag.find({ user: req.user._id });
          res.status(200).json({ success: true, data: tags });
        } catch (error) {
          res.status(400).json({ success: false, message: error.message });
        }
      });
      break;

    case 'POST':
      await authenticate(req, res, async () => {
        try {
          const { name } = req.body;
          const tag = await Tag.create({
            user: req.user._id,
            name,
          });
          res.status(201).json({ success: true, data: tag });
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
