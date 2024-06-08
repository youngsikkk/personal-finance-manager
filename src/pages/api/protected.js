import { authenticate } from '../../utils/auth';

export default async function handler(req, res) {
  await authenticate(req, res, () => {
    res.status(200).json({ success: true, message: 'You have access to this protected route', user: req.user });
  });
}
