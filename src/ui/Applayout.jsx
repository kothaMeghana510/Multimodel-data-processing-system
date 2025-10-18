import Upload from "../fileupload/Upload";
import Heading from "./Heading"

function AppLayout() {
    return (
        <>
            <header>
                <Heading />
            </header>
            <main>
                <Upload />
            </main>
        </>
    )
}

export default AppLayout;