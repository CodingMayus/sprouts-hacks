
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

export default async (req: NextApiRequest, res:NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Get the current auth token from cookies
    const cookies = cookie.parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ error: 'No authentication token found' });
    }

    try {
      // Verify the token
      const decoded = jwt.verify(token, SECRET_KEY);
      
      // Create a new token with extended expiration (30 days)
      const newToken = jwt.sign(
        { email: decoded.email, username: decoded.username },
        SECRET_KEY,
        { expiresIn: '30d' }
      );

      // Set the new cookie with extended expiration
      res.setHeader('Set-Cookie', cookie.serialize('auth_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
      }));

      return res.status(200).json({ message: 'Remember me setting applied' });
    } catch (error) {
      console.error('Token verification error:', error);
      return res.status(401).json({ error: 'Invalid token' });
    }
  } catch (error) {
    console.error('Remember me error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};