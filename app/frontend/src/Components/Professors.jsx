import React, {useState, useEffect} from 'react';


const ProfessorsList = () => {

  const [professors, setprofessors] = useState([]);


  const colors = ['bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500','bg-red-500','bg-blue-500','bg-blue-500']

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1/api/professors/');
        const data = await response.json();
        setprofessors(data);
      } catch (error) {
        console.error('Error fetching professors:', error);
      }
    };

    fetchData();
  }, []);

  professors.forEach((object, index) => {
    object.color = colors[index % colors.length];
  });


  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 w-full">
    {professors.map((professor) => (
        <div key={professor.id} className="flex flex-col items-center p-4">
            <img
                src={professor.photo}
                alt={professor.full_name}
                className="w-32 h-32 sm:w-48 sm:h-48 object-cover rounded-lg"
            />
            <div className="text-center mt-2">
                <div className="font-bold text-white">{professor.full_name}</div>
                <div className="text-sm text-white">{professor.scientific_title}</div>
            </div>
        </div>
    
    ))}
</div>


  );
};

export default ProfessorsList;
