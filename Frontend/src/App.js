import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./main/pages/Homepage";
import Premium from "./main/pages/Premium";
import Page404 from "./main/pages/page404";
import AuthBox from "./main/components/Authbox";
import { GlobalProvider } from "./context/GlobalContext";
import "./styles/style.css"

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Homepage />} />
                        <Route path="premium" element={<Premium />} />
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
