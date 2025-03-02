import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        const { email } = req.query;
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ error: "Invalid email parameter" });
        }

        const client = await clientPromise;
        const db = client.db("users");
        
        const user = await db.collection("users").findOne({ _id: email }, { projection: { personalInfo: 1, _id: 0 } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user.personalInfo);
    } catch (e) {
        console.error("Error fetching user:", e);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};