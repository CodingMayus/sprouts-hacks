"use client";
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import Head from 'next/head';



//Sidebar
export default function SideBar(){
  return(

    <div className="flex h-screen bg-blue-50">
    {/* Side Navbar */}
    <div className="w-64 bg-blue-600 text-white p-5 flex flex-col shadow-lg">
      <div className="text-2xl font-bold mb-8 flex items-center">
        <Image 
          src="/koi-icon.png" 
          alt="KoiCash Logo" 
          width={36} 
          height={36} 
          className="mr-2"
          onError={(e) => {
            e.target.style.display = 'none'; // Hide if image not found
          }}
        />
        KOICASH
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link href="/" className="block p-2 rounded hover:bg-blue-700 bg-blue-700 transition-colors">
              Flow Into More Streams?
            </Link>
          </li>
          <li>
            <Link href="/explore" className="block p-2 rounded hover:bg-blue-700 transition-colors">
              Explore
            </Link>
          </li>
          <li>
            <Link href="/templates" className="block p-2 rounded hover:bg-blue-700 transition-colors">
              Templates
            </Link>
          </li>
          {/* <li>
            <Link href="/settings" className="block p-2 rounded hover:bg-blue-700 transition-colors">
              Settings
            </Link>
          </li> */}
        </ul>
      </nav>
      <div className="mt-auto">
        <div className="border-t border-blue-500 pt-4 mb-2"></div>
        <div className="flex items-center mb-4">
          <FishCircle />
          <div className="ml-3">
            <p className="text-sm font-medium">KoiUser</p>
            {/* <p className="text-xs opacity-70">Premium</p> */}
          </div>
        </div>
        <Link href="/logout" className="block p-2 rounded hover:bg-blue-700 transition-colors text-sm">
          Logout
        </Link>
      </div>
    </div>
    </div>
  );
}

// FishCircle component
function FishCircle() {
  const [isHidden, setIsHidden] = useState(true);
  
  function handleClick() {
    setIsHidden(!isHidden);
  }
 
  
  return (
    <div className="relative cursor-pointer">
      {isHidden && (
        <SideBar/>
      )}
      <Image 
        className="fishimg rounded-full border-2 border-blue-300 hover:border-blue-500 transition-all" 
        width={50} 
        height={50} 
        src="/fishloading.jpg" 
        alt="fish" 
        onClick={handleClick} 
      />
    </div>
  );
}

// Main component
 function Home() {
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
    <div className="flex h-screen bg-blue-50">


      {/* Main Content */}
      <div className="flex-grow p-8 overflow-auto">
        <Head>
          <title>KoiCash - Financial Planning</title>
          <meta name="description" content="Plan and achieve your financial goals" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        </Head>

        <main className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3 text-blue-600">KOICASH</h1>
            <p className="text-lg text-blue-800 mb-1">
              Plan and Achieve your Financial Goals
            </p>
            <p className="text-md text-blue-600">
              A Revolutionary Way to Plan Budgets
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-blue-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full p-4 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center shadow-sm"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                  rows="4"
                  placeholder="What Stream do You Want to Flow into Next?"
                  required
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                  disabled={loading || !prompt.trim()}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </div>

          {response && (
            <div className="bg-white rounded-lg shadow-md p-6 border border-blue-200">
              <h2 className="text-xl font-semibold mb-3 text-blue-700">Response:</h2>
              <div className="p-4 bg-blue-50 rounded border border-blue-200">
                <p className="text-blue-900">{response}</p>
              </div>
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-sm text-blue-500">
              Navigate your financial streams with KoiCash
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}