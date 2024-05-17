import React, {useState,useEffect} from 'react';

const Vacancies = () => {
  const [jobs, setjobs] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:7000/api/vacancy/');
        const data = await response.json();
        setjobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchData();
  }, []);

  
  return (
    <div className="flex justify-center h-screen">
      <div className="bg-black text-white p-4 w-3/4 md:4/5">
        <div className="flex justify-start">
        <h2 className="text-5xl text-center mb-8">Вакансии</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4 p-4">
          {jobs.map((job) => (
            <div key={job.id} className="flex flex-col w-48 md:w-64 md:h-72 md:h-96 p-2 border border-custom-gray justify-between">
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
  );
};

export default Vacancies;
