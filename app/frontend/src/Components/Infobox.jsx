
const InfoBox = (props) => {return(
    <div className="flex justify-center w-full"> 
        <div class="flex justify-center bg-black text-white p-6 grid grid-cols-1 md:grid-cols-2 gap-8 w-2/5">
            <div class="text-wrap p-4 rounded-lg h-64">
                <h2 class="text-xl font-bold mb-8">{props.title1}</h2>
                <p class="mb-8">
                    {props.string1}
                </p>
                <div class="h-1 bg-gradient-to-r from-gray-700 to-red-600 rounded-full"></div>
            </div>


            <div class="text-wrap p-4 rounded-lg h-64">
                <h2 class="text-xl font-bold mb-8">{props.title2}</h2>
                <p class="mb-8">
                    {props.string2}
                </p>
                <div class="h-1 bg-gradient-to-r from-gray-700 to-red-600 rounded-full"></div>
            </div>
        </div>
    </div>


);
}

export default InfoBox;
