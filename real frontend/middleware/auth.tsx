"use client";
import jwt from 'jsonwebtoken';
import { parse } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key';

// Extend NextApiRequest to include `user`
interface AuthenticatedRequest extends NextApiRequest {
  user?: any; 
}

export function withAuth(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Ensure headers.cookie exists before parsing
      const cookieHeader = req.headers.cookie || '';
      const cookies = parse(cookieHeader);
      const token = cookies.auth_token;

      console.log('Active Token:', token);
      return res.status(200).json({ token });

    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
