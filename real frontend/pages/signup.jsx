"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, DollarSign, Users, Calendar, MapPin, Building, PiggyBank, Briefcase } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // Adding name field to match API requirements
    city: "",
    province: "",
    annualIncome: "",
    dependents: "0",
    age: "",
    savings: "",
    pensionAmount: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = (e) => {
    e.preventDefault();
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    try {
      // Transform the form data to match the API's expected structure
      const apiData = {
        email: formData.email,
        password: formData.password,
        name: formData.name || formData.email.split('@')[0], // Use part of email as name if not provided
        city: formData.city,
        province: formData.province,
        annual_income: parseFloat(formData.annualIncome) || 0,
        dependents: parseInt(formData.dependents) || 0,
        current_ages: parseInt(formData.age) || 0,
        pension_plan: parseFloat(formData.pensionAmount) || 0,
        savings: parseFloat(formData.savings) || 0
      };
      
      console.log("Sending data to API:", apiData);
      
      // Make the API request
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
      
      const backEndData = {
        city: formData.city,
        province: formData.province,
        annual_income: parseFloat(formData.annualIncome) || 0,
        dependents: parseInt(formData.dependents) || 0,
        current_age: parseInt(formData.age) || 0,
        pension_plan: parseFloat(formData.pensionAmount) || 0,
        savings: parseFloat(formData.savings) || 0
      };
      const data = await response.json();

      const response2 = await fetch('http://127.0.0.1:5000/get_customer_profile',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backEndData),
      })
      console.log("Response from backend:", response2.json());
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
  
      console.log("Registration successful:", data);
      
      // Redirect to dashboard on success
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="w-16 h-16 relative">
            <Image
              src="/fishloading.jpg"
              alt="KOICASH Logo"
              width={64}
              height={64}
              className="animate-pulse rounded-full border-2 border-blue-300"
            />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">KOICASH</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your personal finance companion
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Step {formStep} of 3</span>
              <span className="text-sm font-medium text-blue-600">{Math.round((formStep / 3) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(formStep / 3) * 100}%` }}></div>
            </div>
          </div>

          {/* Show error message if any */}
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded">
              {error}
            </div>
          )}

          {formStep === 1 && (
            <form onSubmit={nextStep}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {formStep === 2 && (
            <form onSubmit={nextStep}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location & Demographics</h3>
              <div className="space-y-4">
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                        <span>City</span>
                      </div>
                    </label>
                    <input
                      id="city"
                      name="city"
                      type="text"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                      <div className="flex items-center">
                        <Building className="h-4 w-4 mr-1 text-blue-500" />
                        <span>Province</span>
                      </div>
                    </label>
                    <input
                      id="province"
                      name="province"
                      type="text"
                      required
                      value={formData.province}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Current Age</span>
                    </div>
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Number of Dependents</span>
                    </div>
                  </label>
                  <input
                    id="dependents"
                    name="dependents"
                    type="number"
                    required
                    min="0"
                    value={formData.dependents}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {formStep === 3 && (
            <form onSubmit={handleSubmit}>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
              <p className="text-xs text-gray-500 mb-4">This information helps us provide tailored financial insights.</p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Annual Income (CAD)</span>
                    </div>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="annualIncome"
                      name="annualIncome"
                      type="number"
                      required
                      min="0"
                      step="1000"
                      value={formData.annualIncome}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="savings" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <PiggyBank className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Estimated Savings (CAD)</span>
                    </div>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="savings"
                      name="savings"
                      type="number"
                      required
                      min="0"
                      step="100"
                      value={formData.savings}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pensionAmount" className="block text-sm font-medium text-gray-700">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1 text-blue-500" />
                      <span>Estimated Pension Amount (CAD)</span>
                    </div>
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      id="pensionAmount"
                      name="pensionAmount"
                      type="number"
                      required
                      min="0"
                      step="100"
                      value={formData.pensionAmount}
                      onChange={handleChange}
                      className="block w-full pl-7 pr-12 border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="privacy" className="font-medium text-gray-700">Privacy agreement</label>
                    <p className="text-gray-500">I understand this data will be used to provide financial insights.</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Complete Setup"}
                </button>
              </div>
            </form>
          )}
        </div>
        <p className="mt-6 text-center text-xs text-gray-600">
          Your data is securely encrypted and protected.
        </p>
      </div>
    </div>
  );
}