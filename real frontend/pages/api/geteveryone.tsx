import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const client = await clientPromise;
        const db = client.db("users");

        const users = await db.collection("users").find({}).toArray();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch users" });
    }
};