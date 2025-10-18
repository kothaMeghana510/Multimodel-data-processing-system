import { useState } from "react";
import { askGemini } from "../utilities/gemini";
import ShowResponse from "./ShowResponse";
import Loader from "../ui/Loader";


function AskQueries({ knowledgeBase }) {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("Knowledge Base on Submit:", knowledgeBase);
        if(!question.trim()) return;
        setLoading(true);

        const response = await askGemini(question, knowledgeBase); 
        setAnswer(response);
        setLoading(false);
    }
    return (
        <div className="flex flex-col items-center gap-5">
            <div  className="flex flex-col gap-4">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} id="question" placeholder="Ask Queries" className="w-72 h-10 rounded-lg bg-white bg-opacity-10 px-4 focus:border-none" />
                <button onClick={handleSubmit} className="w-72 h-10 rounded-lg bg-indigo-500">Submit</button>
            </div>

            {(loading) ? <Loader /> : answer && (
                <ShowResponse answer={answer}/>
            )}
            </div>
    )
}

export default AskQueries;