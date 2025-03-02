import dbConnect from '../../lib/dbConnect'; // Update the import path
import User from '../../models/users'; // Update the import path

export default async function handler(req, res) {
    await dbConnect(); // Ensure DB connection is called

    if (req.method === 'POST') {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                return res.status(400).json({ success: false, message: "Name and email are required." });
            }

            const user = new User({ name, email });
            await user.save();

            return res.status(201).json({ success: true, user });
        } catch (error) {
            console.error("Error saving user:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    if (req.method === 'GET') {
        try {
            const users = await User.find({});
            return res.status(200).json({ success: true, users });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
}
