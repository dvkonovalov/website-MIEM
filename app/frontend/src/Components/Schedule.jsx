import useSWR from 'swr';

const fetcher = url => fetch(url).then(res => {
  return res.json();
});

const ScheduleFetcher = () => {
  const toprofessor = new Date();
  const nextWeek = new Date(toprofessor);
  nextWeek.setDate(toprofessor.getDate() + 7);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const { data: schedules, error } = useSWR(
    `http://127.0.0.1:8000/api/schedule/?fromdate=${formatDate(toprofessor)}&todate=${formatDate(nextWeek)}`,
    fetcher,
  );
  if (error) return <div className="text-white">Failed to load schedules</div>;
  if (!schedules) return <div className="text-white">Loading...</div>;

  return (
    <div className="p-5">
      {schedules.map((professor, index) => professor.Count > 0 && (
        <div key={index} className="mb-4 p-6 rounded-lg shadow">
          <div className="flex justify-normal">
          <div className="mb-6 font-bold text-lg text-white">{professor.Lessons[0].lecturer}</div>
          </div>
          {professor.Lessons.map((lesson, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-gray-300 py-3">
              <div className="font-bold text-lg text-white">
                <p>{lesson.beginLesson} - {lesson.endLesson}</p>
                <p>{lesson.date}</p>
              </div>
              <div className='w-1/2'>
                <h3 className="text-lg font-semibold text-white">{lesson.discipline}</h3>
                <p className="text-white">Аудитория: {lesson.auditorium}, {lesson.building}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ScheduleFetcher;
