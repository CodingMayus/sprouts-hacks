//TODO: KOI Going in Circles



export default function LoadingScreen(){

    return(
        <div className = 'bg-gray-100 p-4 rounded-lg shadow-md'>
            <h2 className = 'text-xl font-semibold mb-4 text-blue-800 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Loading...
                </h2>
        </div>
    );

}