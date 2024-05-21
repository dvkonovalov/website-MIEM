import React, { useEffect, useState } from 'react';

const Useful_links = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch('http://127.0.0.1:7000/api/useful_links');
        const data = await response.json();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  return (
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
  );
};

export default Useful_links;