import { useFileProcessor } from "../hooks/useFileProcessor";
import AskQueries from "./AskQueries";
import File from "./File";


function Upload() {
    const { knowledgeBase, handleFile } = useFileProcessor();
    
    return (
        <div className="flex items-center justify-center">
        <div className="px-3 py-5 w-[50vw] m-5 flex flex-col items-center border border-white border-opacity-30  bg-white bg-opacity-10 backdrop-blur-md">
            <File handleFile={handleFile} />
            <AskQueries knowledgeBase={knowledgeBase} />
        </div>
        </div>
    )
}

export default Upload;