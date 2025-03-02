// pages/api/auth/lockedin.js

import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import clientPromise from "../../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your-secret-key'; // Store this securely in environment variables

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Ensure the request method is POST
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests are allowed' });
    }

    const { email, password } = req.body; // Email and password should be passed in the request body

    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("users");

    // Find user with the provided email
    const user = await db.collection("users").findOne({ _id: email });
    // console.log("POOPOOOPOOOPOO");
    // alert(user);
    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored password (In a real-world app, you'd hash passwords)
    const isPasswordValid = password === user.password; // Example: Compare passwords directly (use bcrypt or another hashing library for real apps)

    // Check if password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Create the JWT payload
    const payload = { email: user.email, username: user.username };

    // Create JWT token (expires in 1 hour)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Set the token in a cookie

    // res.setHeader('Set-Cookie', serialize('auth_token', token, {
    //   // To ensure the cookie can't be accessed via JavaScript
    //   secure: process.env.NODE_ENV === 'production', // Ensures cookie is only sent over HTTPS in production
    //   maxAge: 60 * 60, // 1 hour
    //   path: '/', // Accessible throughout the site
    // }));

    res.setHeader('Set-Cookie', serialize('_id', user._id.toString(), {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60,
      path: '/',
    }));

    // Send a successful response with user data
    return res.status(200).json({ message: 'Login successful', user });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
