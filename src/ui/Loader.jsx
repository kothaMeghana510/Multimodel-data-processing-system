function Loader() {
    return (
        <div className="flex space-x-2 justify-center items-center m-4">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.6s]"></div>
        </div>

    )
}

export default Loader;