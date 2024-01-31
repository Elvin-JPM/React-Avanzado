import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SignUpLayout from "./Pages/SignUpLayout.js";
import AddsPage from "./Pages/AddsPage.js";
import LoginLayout from "./Pages/LoginLayout.js";
import CreateAddPage from "./Pages/CreateAddPage.js";
import Ad from "./Components/Ad.js";
import NotFound from "./Pages/NotFound.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginLayout />} />
          <Route path="signup" element={<SignUpLayout />}></Route>
          <Route path="login" element={<LoginLayout />}></Route>
          <Route path="adds" element={<AddsPage />}></Route>
          <Route path="adds/new" element={<CreateAddPage />} />
          <Route path="adds/:id" element={<Ad/>} />
          <Route path="/notFound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
