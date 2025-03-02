import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Only POST requests are allowed' });
        }
        const { email, password, name,city, province, annual_income, dependents,current_ages,pension_plan,savings} = req.body; 

        if (!email || !password || !name) {
            return res.status(400).json({ error: 'Email, password, and name are required' });
        }

        const client = await clientPromise;
        const db = client.db("users");

        // Check if user already exists
        const existingUser = await db.collection("users").findOne({ "profile.email": email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Hash password before storing

        // Create user document
        const newUser = {
            _id: email,  // Using email as identifier (change to ObjectId if needed)
            password: password,
            profile: {
                email,
                name,
                createdAt: new Date()
            },
            personalInfo:{
                city:city,
                province:province,
                annual_income:annual_income,
                dependents:dependents,
                current_ages:current_ages,
                pension_plan: pension_plan,
                savings:savings,
            },
            list_of_items:{
                city: city,
                province: province,
                annual_income:annual_income,
                dependents:dependents,
                current_ages: current_ages,
                pension_plan:pension_plan,
                savings:savings,
                tax_rate: -1,
                inflation_rate:-1,
                retirement_age:-1,
            },
            financialData: {
                budgets: [],
                pastWork: []
            },
            goals: [],
            extraData: {
                customFields: {}
            }
        };
        // Insert into database
        await db.collection("users").insertOne(newUser);

        res.status(201).json({ message: 'User created successfully', userId: newUser._id });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal server error' });
    }
};
