// pages/api/auth/me.js

import { withAuth } from '../../../middleware/auth';

async function handler(req, res) {
  // This handler will only be called if the user is authenticated
  // req.user is set by the withAuth middleware
  return res.status(200).json({ user: req.user });
}

// Wrap the handler with the auth middleware
export default withAuth(handler)