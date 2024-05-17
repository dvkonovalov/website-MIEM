import React from 'react';

const Useful_links = () => {

  const resources = [
    { id: 1, link: 'https://example.com/resource1', title: 'Resource 1'},
    { id: 2, link: 'https://example.com/resource2', title: 'Resource 2'},
    { id: 3, link: 'https://example.com/resource3', title: 'Resource 3'},
  ];

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
