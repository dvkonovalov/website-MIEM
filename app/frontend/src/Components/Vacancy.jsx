// Vacancies.js
import React, { useState, useEffect } from 'react';

const Vacancies = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1/api/vacancy/');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-grow">
      <div className="p-4">
        <div className="mb-4 flex justify-between">
          <a href="/" className="text-gray-400 hover:text-gray-300 text-lg sm:text-xl">
            ← Главная
          </a>
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center flex-1">Вакансии</h1>
          <div style={{ width: '5.333333rem' }} />
        </div>
      </div>
      <div className="flex flex-grow justify-center">
        
        <div className="bg-black text-white p-4 w-3/4 md:w-4/5">
          <div className="flex flex-wrap justify-center gap-4 p-4">
            {jobs.map((job) => (
              <div key={job.id} className="flex flex-col w-48 md:w-64 md:h-72 p-2 border border-custom-gray justify-between">
                <div>
                  <h3 className="text-2xl mb-2 font-bold">{job.title}</h3>
                  <ul className="mb-4">
                    <li className="text-base font-semibold mb-2 mt-4">Навыки:</li>
                    {job.skills.map((skill, index) => (
                      <li className="text-sm" key={index}>• {skill}</li>
                    ))}
                  </ul>
                </div>
                <button className="w-full h-12 text-white rounded-full border border-red-600 hover:border-red-700">
                  Подать заявку
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vacancies;
