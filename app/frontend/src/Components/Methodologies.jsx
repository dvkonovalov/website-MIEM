import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Methodologies = () => {
  const [reports, setReports] = useState([]);


  const colors = ['bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500','bg-red-500','bg-blue-500','bg-blue-500']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://81.200.153.136/api/material/');
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
    <div className="bg-black text-white p-4 h-screen">
      <div className="mb-4 flex justify-between">
        <a href="/" className="text-gray-400 hover:text-gray-300 text-lg sm:text-xl">
          ← Главная
        </a>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center flex-1">Методички</h1>
        <div style={{ width: '5.333333rem' }} /> {/* Matching width placeholder */}
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
              <button aria-label="Download" className="text-gray-300 hover:text-gray-200">
                <a href=""><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-download">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                </a>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Methodologies;
