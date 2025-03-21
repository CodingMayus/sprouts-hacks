import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Ensure the request method is POST (you can use GET if needed)
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST requests are allowed' });
    }

    const { email, password } = req.body;  // Both email and password should be passed in the request body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("users");

    // Find user with the provided email
    const user = await db.collection("users").findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = (password==user.password?true:false);

    // Check if the password is correct
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    // Send a successful response if email and password match
    res.status(200).json({ message: 'Login successful', user });

  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Internal server error' });
  }
};
