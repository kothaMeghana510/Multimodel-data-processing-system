import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";


function ShowResponse({ answer }) {
    const [copied, setCpoied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(answer);
            setCpoied(true);
            setTimeout(() => setCpoied(false), 5000);
        } catch (err) {
            console.log("Failed to Copy", err);
        }
    }

    return (
        <div className="m-2 ">
            <div className="flex gap-2">
                <h2 className="font-semibold text-lg">Response:</h2>
                {copied ? <span className="text-sm text-green-500  ml-auto font-semibold">Copied!</span> : <button className="ml-auto text-xl font-semibold" onClick={handleCopy}><HiOutlineClipboardDocumentCheck /></button>}

            </div>
             <TypeAnimation
                sequence={[answer, 1000]}
                speed={80}
                wrapper="span"
                cursor = {true}
                repeat={0}
                />
        </div>
    )
}

export default ShowResponse;