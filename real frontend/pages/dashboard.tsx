"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import jwt from 'jsonwebtoken';
import { 
  BarChart, 
  PieChart, 
  LineChart, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Target, 
  User, 
  Home, 
  Briefcase, 
  PiggyBank, 
  Clock
} from "lucide-react";

// Widget component for dashboard sections
function Widget({ title, icon, children, className = "" }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}

// Progress bar component
function ProgressBar({ percent, color = "blue" }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
      <div 
        className={`bg-${color}-600 h-2.5 rounded-full`} 
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default function Dashboard() {
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [decoded, setDecoded] = useState(null); // State to store decoded token
  
  // Moved the useEffect inside the component
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          console.log("Authenticated user data:", data);
          const decodedToken = jwt.decode(data.token);
          setDecoded(decodedToken); // Store decoded token in state
          console.log("Decoded token:", decodedToken);
        } else {
          console.error("Failed to fetch authenticated user data");
        }
      } catch (error) {
        console.error("Error fetching authenticated user data:", error);
      }
    };

    fetchAuthData();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedPhoto(file); // Store the file object directly
    }
  };
  
  // Calls API to send to DB and backend to be analyzed
  const handleSubmit = async () => {
    if (!uploadedPhoto) {
      console.error("No image uploaded");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('image', uploadedPhoto); // Append the image file to the FormData
      console.log(uploadedPhoto);
      // console.log(formData);
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,  // Send form data (multipart/form-data) with the image file
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Image uploaded successfully!", data);
      } else {
        console.error("Upload failed", data);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  function handleDelete() {
    setUploadedPhoto(null); // Clear the image or reset any data
    // setSubmitted(false); // Reset the submitted status
    console.log("Data deleted.");
  }

  // This would come from your API in a real application
  const [userData, setUserData] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    city: "Toronto",
    province: "Ontario",
    age: 32,
    dependents: 2,
    income: 85000,
    savings: 42500,
    pension: 65000,
    profileImage: "/fishloading.jpg"
  });

  // Use decoded token to fetch user data
  useEffect(() => {
    // Only fetch if we have the decoded token with user ID
    if (decoded && decoded._id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`/api/userdata`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: decoded._id }),
          });
          
          if (response.ok) {
            const data = await response.json();
            setUserData(data);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      
      fetchUserData();
    }
  }, [decoded]); // Run this effect when decoded token changes

  useEffect(() => {
    const createBudgetFromProfile = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/create_budget_from_profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userData }),
        });

        if (response.ok) {
          const budget = await response.json();
          console.log("Budget created from profile:", budget);
          // Update the state with the new budget data
          setBudgetData({
            income: budget.monthly_income,
            spent: budget.housing.total + budget.food.total + budget.transportation.total + budget.miscellaneous.total,
            saved: budget.savings.total,
            categories: [
              { name: "Housing", amount: budget.housing.total, limit: budget.housing.total, color: "blue" },
              { name: "Food", amount: budget.food.total, limit: budget.food.total, color: "green" },
              { name: "Transport", amount: budget.transportation.total, limit: budget.transportation.total, color: "yellow" },
              { name: "Miscellaneous", amount: budget.miscellaneous.total, limit: budget.miscellaneous.total, color: "gray" },
              { name: "Savings", amount: budget.savings.total, limit: budget.savings.total, color: "purple" }
            ]
          });
        } else {
          console.error("Failed to create budget from profile");
        }
      } catch (error) {
        console.error("Error creating budget from profile:", error);
      }
    };

    createBudgetFromProfile();
  }, [userData]);

  // Example budget data
  const [budgetData, setBudgetData] = useState({
    income: 7083, // Monthly income
    spent: 4850,
    saved: 2233,
    categories: [
      { name: "Housing", amount: 2100, limit: 2300, color: "blue" },
      { name: "Food", amount: 850, limit: 1000, color: "green" },
      { name: "Transport", amount: 700, limit: 800, color: "yellow" },
      { name: "Entertainment", amount: 300, limit: 400, color: "red" },
      { name: "Utilities", amount: 350, limit: 400, color: "purple" },
      { name: "Other", amount: 350, limit: 500, color: "gray" }
    ]
  });

  // Example bills data
  const upcomingBills = [
    { name: "Rent", amount: 2100, dueDate: "March 5, 2025", isPaid: false },
    { name: "Electricity", amount: 120, dueDate: "March 10, 2025", isPaid: false },
    { name: "Internet", amount: 80, dueDate: "March 12, 2025", isPaid: false },
    { name: "Phone", amount: 75, dueDate: "March 15, 2025", isPaid: false },
    { name: "Car Payment", amount: 340, dueDate: "March 18, 2025", isPaid: false }
  ];

  // Example savings goals
  const savingsGoals = [
    { name: "Emergency Fund", current: 10000, target: 25000, color: "blue" },
    { name: "Vacation", current: 3500, target: 5000, color: "green" },
    { name: "Down Payment", current: 28000, target: 75000, color: "indigo" }
  ];

  // Example spending trends (last 6 months)
  const spendingTrends = [
    { month: "Oct", amount: 4950 },
    { month: "Nov", amount: 5200 },
    { month: "Dec", amount: 5800 },
    { month: "Jan", amount: 4700 },
    { month: "Feb", amount: 4800 },
    { month: "Mar", amount: 4850 }
  ];

  // Financial health score (example calculation)
  const financialHealthScore = 78;

  // Financial insights based on user data
  const financialInsights = [
    "Your housing costs are within the recommended 30% of income",
    "You're on track to meet your emergency fund goal by September",
    "Consider increasing your pension contributions by 3%",
    "Your entertainment spending exceeded your budget this month"
  ];

  // Calculate monthly savings rate
  const savingsRate = Math.round((budgetData.saved / budgetData.income) * 100);

  return (
    <div className="bg-blue-50 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Financial Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Profile Card */}
        <Widget 
          title="Profile" 
          icon={<User className="h-6 w-6 text-blue-600" />}
          className="md:col-span-1"
        >
          <div className="flex flex-col items-center mb-4">
            <div className="relative w-24 h-24 mb-3">
              <Image
                src={userData.profileImage}
                alt="Profile"
                width={96}
                height={96}
                className="rounded-full border-4 border-blue-200"
              />
              <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white"></div>
            </div>
            <h3 className="text-xl font-semibold">{userData.name}</h3>
            <p className="text-gray-600 text-sm">{userData.email}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{userData.city}, {userData.province}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Age</p>
                <p className="font-medium">{userData.age}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dependents</p>
                <p className="font-medium">{userData.dependents}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Annual Income</p>
                <p className="font-medium">${userData.income.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Savings</p>
                <p className="font-medium">${userData.savings.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </Widget>
        
        {/* Rest of your component... */}
        {/* Monthly Budget Widget */}
        <Widget 
          title="Monthly Budget" 
          icon={<CreditCard className="h-6 w-6 text-blue-600" />}
          className="md:col-span-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Income</p>
              <p className="text-xl font-bold text-blue-900">${budgetData.income}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Saved</p>
              <p className="text-xl font-bold text-green-600">${budgetData.saved}</p>
              <p className="text-xs text-green-600">{savingsRate}% of income</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <p className="text-sm text-gray-500">Spent</p>
              <p className="text-xl font-bold text-purple-600">${budgetData.spent}</p>
              <p className="text-xs text-purple-600">{Math.round((budgetData.spent / budgetData.income) * 100)}% of income</p>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-700 mb-2">Category Spending</h3>
          <div className="space-y-3">
            {budgetData.categories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm font-medium">${category.amount} / ${category.limit}</span>
                </div>
                <ProgressBar percent={(category.amount / category.limit) * 100} color={category.color} />
              </div>
            ))}
          </div>
          {!uploadedPhoto && (
            <>
              {/* Photo upload section */}
              <div className="mt-6">
                <h3 className="font-medium text-gray-700 mb-2">Upload Photo</h3>
                <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg py-6 px-4 cursor-pointer">
                  <label className="text-sm text-gray-500">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange}
                      className="hidden" 
                    />
                    <div className="flex flex-col items-center">
                      <span className="text-blue-600 font-semibold">Click to upload photo</span>
                      <span className="text-gray-400">JPEG, PNG, or GIF</span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}
          {/* Display uploaded photo */}
          {uploadedPhoto && (
            <div className="mt-4 flex justify-center items-center flex-col">
              <img 
                src={URL.createObjectURL(uploadedPhoto)} 
                alt="Uploaded" 
                className="max-w-full h-auto rounded-lg shadow-lg" 
              />
              <div className="flex space-x-4 mt-4">
                <div className="hover:bg-blue-700 transition w-32 bg-blue-600 text-white text-center py-2 rounded-lg cursor-pointer" onClick={handleSubmit}>SUBMIT</div>
                <div className="hover:bg-red-700 transition w-32 bg-red-600 text-white text-center py-2 rounded-lg cursor-pointer" onClick={handleDelete}>DELETE</div>
              </div>
            </div>
          )}
        </Widget>
      </div>
      
      {/* The rest of your component remains unchanged */}
      {/* Remaining dashboard widgets... */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Bills */}
        <Widget 
          title="Upcoming Bills" 
          icon={<Calendar className="h-6 w-6 text-blue-600" />}
        >
          <div className="space-y-3">
            {upcomingBills.map((bill, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b last:border-0">
                <div className="flex items-center">
                  {bill.isPaid ? 
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
                    <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  }
                  <div>
                    <p className="text-sm font-medium">{bill.name}</p>
                    <p className="text-xs text-gray-500">{bill.dueDate}</p>
                  </div>
                </div>
                <span className="font-medium">${bill.amount}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Pay Bills
          </button>
        </Widget>
        
        {/* Savings Goals */}
        <Widget 
          title="Savings Goals" 
          icon={<Target className="h-6 w-6 text-blue-600" />}
        >
          <div className="space-y-4">
            {savingsGoals.map((goal, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{goal.name}</span>
                  <span className="text-sm">${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}</span>
                </div>
                <ProgressBar percent={(goal.current / goal.target) * 100} color={goal.color} />
                <p className="text-xs text-gray-500">
                  {Math.round((goal.current / goal.target) * 100)}% completed
                </p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Add New Goal
          </button>
        </Widget>
        
        {/* Financial Health */}
        <Widget 
          title="Financial Health" 
          icon={<PiggyBank className="h-6 w-6 text-blue-600" />}
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <svg className="w-32 h-32">
                <circle 
                  className="text-gray-200" 
                  strokeWidth="10" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="56" 
                  cx="64" 
                  cy="64"
                />
                <circle 
                  className="text-blue-600" 
                  strokeWidth="10" 
                  strokeDasharray={351.86}
                  strokeDashoffset={351.86 * (1 - financialHealthScore/100)} 
                  strokeLinecap="round" 
                  stroke="currentColor" 
                  fill="transparent" 
                  r="56" 
                  cx="64" 
                  cy="64"
                />
              </svg>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold">{financialHealthScore}</span>
              </div>
            </div>
          </div>
          
          <h3 className="font-medium text-gray-700 mb-2">Insights</h3>
          <ul className="space-y-2">
            {financialInsights.map((insight, index) => (
              <li key={index} className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{insight}</span>
              </li>
            ))}
          </ul>
        </Widget>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trends */}
        <Widget 
          title="Spending Trends" 
          icon={<BarChart className="h-6 w-6 text-blue-600" />}
        >
          <div className="h-64 w-full">
            <div className="flex items-end h-48 w-full space-x-2">
              {spendingTrends.map((item, index) => {
                const maxAmount = Math.max(...spendingTrends.map(i => i.amount));
                const height = (item.amount / maxAmount) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full flex justify-center items-end h-full">
                      <div 
                        className={`w-full max-w-md rounded-t-md bg-blue-${index === spendingTrends.length - 1 ? '600' : '400'}`} 
                        style={{ height: `${height}%` }}
                      ></div>
                    </div>
                    <div className="text-xs mt-2 text-gray-600">{item.month}</div>
                    <div className="text-xs font-medium">${item.amount}</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-sm text-gray-500">Average Monthly Spending</p>
              <p className="font-medium">
                ${Math.round(spendingTrends.reduce((acc, curr) => acc + curr.amount, 0) / spendingTrends.length)}
              </p>
            </div>
            <button className="text-blue-600 text-sm hover:underline">View Details</button>
          </div>
        </Widget>
        
        {/* Asset Allocation */}
        <Widget 
          title="Asset Allocation" 
          icon={<PieChart className="h-6 w-6 text-blue-600" />}
        >
          <div className="flex items-center justify-center py-4">
            <div className="w-48 h-48 rounded-full border-8 border-blue-100 relative">
              {/* This is a simplified visualization of a pie chart */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="absolute bg-blue-500 w-1/2 h-full left-0"></div>
                <div className="absolute bg-green-500 w-1/2 h-1/2 right-0 top-0"></div>
                <div className="absolute bg-yellow-500 w-1/4 h-1/2 right-0 bottom-0"></div>
                <div className="absolute bg-purple-500 w-1/4 h-1/2 right-1/4 bottom-0"></div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Retirement (50%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm">Savings (25%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm">Investments (12.5%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-sm">Real Estate (12.5%)</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <p className="text-sm text-gray-500">Total Assets</p>
              <p className="font-medium">${(userData.savings + userData.pension).toLocaleString()}</p>
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
}

function MapPin(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24" 
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}