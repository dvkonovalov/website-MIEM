const Box = (props) => {

    return(
    <div className="relative space-y-2 h-64 bg-gradient-to-r from-blue-500 to-red-500">
        <p className="absolute left-0 top-0 text-xl font-bold ml-4 mt-6">О нас</p>
        <div className="absolute bottom-0 left-0 text-right">
            <a href="/link1" className="text-blue-500 hover:text-blue-600">→</a>
        </div>
    </div>
    )

}