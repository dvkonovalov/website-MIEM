import React, { useEffect, useState } from 'react';

const Useful_links = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://81.200.153.136/api/useful_links');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className='p-4'>
        <div className="mb-4 flex justify-between">
            <a href="/" className="text-gray-400 hover:text-gray-300 text-lg sm:text-xl">
              ← Главная
            </a>
            <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center flex-1">Ссылки</h1>
        <div style={{ width: '5.333333rem' }} /> {/* Matching width placeholder */}
    </div>
    <div className="flex flex-wrap justify-center gap-4 p-4 mt-8">
        {resources.map(resource => (
          <a
            key={resource.id}
            href={resource.link}
            className="flex-1 min-w-[200px] max-w-[300px] text-white font-bold py-2 px-4 rounded-lg border border-custom-gray rounded-full"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className="text-lg text-white">{resource.title}</h2>
          </a>
        ))}
      </div>
      </div>
  );
};

export default Useful_links;