import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./main/pages/Homepage";
import Premium from "./main/pages/Premium";
import Customization from "./main/pages/Customization";
import Page404 from "./main/pages/page404";
import AuthBox from "./main/components/Authbox";
import { GlobalProvider } from "./context/GlobalContext";
import "./styles/style.css"
import { useState } from "react";

function App() {
    let [longURL, setLongURL] = useState("");

    return (
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Homepage  longURL={longURL} setLongURL={setLongURL} />} />
                        <Route path="premium" element={<Premium />} />
                        <Route path="customization" element={<Customization longURL={longURL} setLongURL={setLongURL} />} />
                        <Route path="*" element={<Page404 />} />
                        <Route exact path= "/login" element={<AuthBox />}/>
                        <Route path= "/register" element={<AuthBox register={true}/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;
