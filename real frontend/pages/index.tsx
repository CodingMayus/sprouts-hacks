"use client";

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from './navbar';
export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // For a real implementation with an API
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResponse(data.result);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while processing your prompt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* <a href="/api/auth/login">Login</a> */}
      <div className="container mx-auto px-4 py-12">
        <Head>
          <title>KoiCash - Financial Planning</title>
          <meta name="description" content="Plan and achieve your financial goals" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet" />
        </Head>

        <main>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-blue-700 tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              KOICASH
            </h1>
            <div className="h-1 w-24 bg-blue-500 mx-auto mb-8 rounded-full"></div>
            <p className="text-lg text-blue-900 max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Plan and achieve your financial goals through a revolutionary way to create and manage budgets.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-16">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 transform transition-all hover:shadow-xl border border-blue-100">
              <div className="mb-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-center mb-2 text-blue-800" style={{ fontFamily: 'Poppins, sans-serif' }}>Start Your Financial Journey</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full p-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center shadow-sm transition-all bg-blue-50 text-blue-900"
                    rows="4"
                    placeholder="What stream do you want to flow into next?"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transform transition-transform hover:scale-105"
                    disabled={loading || !prompt.trim()}
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </div>
                    ) : (
                      'Begin Your Journey'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {response && (
              <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100 transform transition-all">
                <h2 className="text-xl font-semibold mb-4 text-blue-800 flex items-center" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Your Financial Insight:
                </h2>
                <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-900" style={{ fontFamily: 'Poppins, sans-serif' }}>{response}</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}>
              KoiCash - Navigate your financial streams with wisdom
            </p>
          </div>
        </main>
      </div>
    </div>
    </>
  );
}