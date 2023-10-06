import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./main/pages/Layout";
import Homepage from "./main/pages/Homepage";
import Page404 from "./main/pages/page404";
// import Info from "./main/components/Info";
import "./styles/style.css"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Homepage />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
