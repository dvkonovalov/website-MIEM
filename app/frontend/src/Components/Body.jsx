import NewsCarousel from "./Caroussel";
import ProfessorsList from "./Professors";

const Body = () => {
    return (

        <>
        <div className="flex flex-col justify-center items-center text-white py-20 px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">Лаборатория</h1>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Сетевых Технологий</h2>
            <p className="font-light opacity-80 text-base md:text-xl font-semibold">Мы занимаемся этим-этим</p>
            <p className="font-light opacity-80 text-base md:text-xl font-semibold">у нас круто классно</p>
        </div>
        
        <div className="flex justify-center bg-black text-white">
                <div className="flex justify-center w-3/4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8 p-4">

                    {/* First grid*/}
                    <div className="relative space-y-2 h-64 bg-gradient-to-r from-blue-500 to-red-500">
                        <p className="absolute left-0 top-0 text-xl font-bold ml-4 mt-6">О нас</p>
                    </div>

                    {/* Second grid*/}
                    <div className="bg-black text-white relative p-6 h-64 border border-custom-gray">
                        <div className="relative flex flex-col justify-between h-full">

                            <div className="absolute flex items-center right-0 top-0">
                                <div className="w-16 border-t border-white"></div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 flex items-center m-4 space-y-2">
                                <div className="flex-grow">
                                    <p className="text-sm break-words w-64">Сюда вы можете загрустить отчетики, и их проверят</p>
                                    <h2 className="text-4xl md:text-6xl font-bold">Сдать Лабы</h2>
                                </div>
                                <div className="relative ml-3 flex-shrink-0">
                                    <a href="/labs">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white absolute bottom-0 right-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Third grid*/}


                    <div className="bg-black text-white relative p-6 h-64 border border-custom-gray">
                        <div className="relative flex flex-col justify-between h-full">

                            <div className="absolute flex items-center right-0 top-0">
                                <div className="w-16 border-t border-white"></div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 flex items-center m-4 space-y-2">
                                <div className="flex-grow">
                                    <p className="text-sm break-words w-32">Здесь вы можете посмотреть методички</p>
                                    <h2 className="text-4xl md:text-6xl font-bold">Методички</h2>
                                </div>
                                <div className="relative ml-3 flex-shrink-0">
                                    <a href="/material">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white absolute bottom-0 right-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>



                    {/* Fourth grid*/}


                    <div className="h-[64rem] md:h-64 grid grid-cols-1 md:grid-cols-2 grid-rows-4 md:grid-rows-2 gap-4">
                        <div className="relative border border-custom-gray">
                            <div className="absolute inset-x-0 top-0 flex m-4 space-y-2">
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold">Доступ к серверам</h2>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 mr-8 mb-2">
                                <a href="/wetty">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        
                        <div className="border border-custom-gray"></div>
                        
                        <div className="border border-custom-gray"></div>
                        
                        <div className="relative border border-custom-gray">
                            <div className="absolute inset-x-0 top-0 flex m-4 space-y-2">
                                <div className="flex-grow">
                                    <h2 className="text-xl font-bold break-words w-32">Вакансии в проектах</h2>
                                </div>
                            </div>
                            <div className="absolute bottom-0 right-0 mr-8 mb-2">
                                <a href="/recrutement">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                    


        <div className="flex flex-cols text-white justify-center py-12">
            <h2 className="text-4xl font-bold">О НАС</h2>
        </div>

        <div className="flex justify-center w-full">
        <div className="bg-black text-white p-5 w-3/4 flex flex-wrap justify-center gap-4 p-4 w-full">
            <div className="flex-1 p-5 border border-gray-500 rounded space-y-2">
                <h2 className="text-2xl font-bold mb-2">(01)</h2>
                <p className="text-sm">
                    Делаем то и то, а ещё то и то, и вообще вон посмотрите видео о нас или ещё что сделайте, Делаем
                    то и то, а ещё то и то, и вообще вон посмотрите видео о нас или ещё что сделайте.
                </p>
            </div>
            <div className="flex-1 p-5 border border-gray-500 rounded space-y-2">
                <h2 className="text-2xl font-bold mb-2">(02)</h2>
                <p className="text-sm">
                Делаем то и то, а ещё то и то, и объявлены нарушающими общечеловеческие нормы этики и морали.
                Таким образом, внедрение современных методик играет важную роль в формировании приоритезации
                разума над эмоциями.
                </p>
            </div>
            <div className="flex-1 p-5 border border-gray-500 rounded space-y-2">
                <h2 className="text-2xl font-bold mb-2">(03)</h2>
                <p className="text-sm">
                В частности, синтетическое тестирование в значительной степени обусловливает важность
                экспериментов, поражающих по своей масштабности и грандиозности.
                </p>
            </div>
        </div>
        </div>


        <div className="flex flex-cols text-white justify-center py-8">
            <h2 className="text-4xl font-bold">Преподователи</h2>
        </div>

        <ProfessorsList/>

        <div className="flex flex-cols text-white justify-center py-8">
            <h2 className="text-4xl font-bold">Новости</h2>
        </div>
        <div className="flex justify-center w-full">
            <div className="w-5/6">
                <NewsCarousel/>
            </div>
        </div>
            
            </>


    )

  };
  
  export default Body;
  