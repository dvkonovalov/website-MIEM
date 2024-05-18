import React, {useState, useEffect} from 'react';
import { ChevronRightIcon } from '@heroicons/react/solid';

const Labs = () => {
  const [reports, setReports] = useState([]);


  const colors = ['bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500','bg-red-500','bg-blue-500','bg-blue-500']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/work/');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchData();
  }, []);

  reports.forEach((object, index) => {
    object.color = colors[index % colors.length];
  });

return (
    <div className="bg-black text-white p-4">
      <div className="mb-4 flex justify-between">
        <a href="/" className="text-gray-400 hover:text-gray-300 text-lg sm:text-xl">
          ← Главная
        </a>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center flex-1">Все работы</h1>
        <div style={{ width: '5.333333rem' }} /> {/* Placeholder for right side, matching the width of the "Главная" link */}
      </div>
      <div className="space-y-2 flex flex-col items-center">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center px-4 h-24 sm:h-28 w-3/4 border border-gray-700 rounded-tl-[36px] rounded-r-[36px] rounded-bl-none overflow-hidden">
            <span className={`w-12 h-12 rounded-full ${report.color} flex-shrink-0`}></span>
            <div className="flex flex-grow items-center justify-between ml-4">
              <div>
                <h2 className="text-md sm:text-lg md:text-xl font-semibold">{report.title}</h2>
                <p className="text-sm sm:text-md md:text-lg">{report.description}</p>
              </div>
              <a href=""><ChevronRightIcon className="w-16 h-16 sm:w-10 sm:h-10 text-gray-300" /></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Labs;
