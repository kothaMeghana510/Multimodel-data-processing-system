import { useRef, useState } from "react";
import { HiOutlineFolder } from "react-icons/hi2";

function File({ handleFile }) {
    const fileUpload = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);

    return (
        <div>
            <input type="file" ref={fileUpload} onChange={async (e) => {const selectedFile = e.target.files[0]; setFile(selectedFile); await handleFile(selectedFile);}} className="hidden" />
            <div onClick={() => fileUpload.current.click()} 
            onDragStart={(e) => e.preventDefault()}
                onDragOver={
                            (e) => {
                                    e.preventDefault(); 
                                    setIsDragging(true);
                                }} 
                onDragLeave={() => setIsDragging(false)} 
                onDrop={async (e) => {
                    e.preventDefault(); 
                    setIsDragging(false); 
                    const droppedFile = e.dataTransfer.files[0];
                    setFile(droppedFile);
                    await handleFile(droppedFile);
                }} 
                className= {` transition-colors duration-200 rounded-xl px-5 py-4 flex flex-col items-center cursor-pointer `}>
                <HiOutlineFolder className="text-6xl text-blue-500 mb-2 drop-shadow-[0_0_10px_#60a5fa]"/>
                <h1 className="text-lg ">drag and drop files here</h1>
                <h1 className="text-sm text-gray-500">or click to browse</h1>
                {file && <p className="mt-3">Selected: {file.name}</p>}
            </div>
        </div>
    )
}

export default File;
