import { Routes, Route, BrowserRouter } from "react-router-dom";

import SignUpLayout from "./Pages/SignUpLayout.js";
import AddsPage from "./Pages/AddsPage.js";
import LoginLayout from "./Pages/LoginLayout.js";
import CreateAddPage from "./Pages/CreateAddPage.js";
import Ad from "./Components/Ad.js";
import NotFound from "./Pages/NotFound.js";
import RequireAuth from "./RequireAuth.js";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <AddsPage />
          </RequireAuth>
        }
      />
      <Route path="signup" element={<SignUpLayout />}></Route>
      <Route path="login" element={<LoginLayout />}></Route>
      <Route
        path="adds"
        element={
          <RequireAuth>
            <AddsPage />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="adds/new"
        element={
          <RequireAuth>
            <CreateAddPage />
          </RequireAuth>
        }
      />
      <Route path="adds/:id" element={<Ad />} />
      <Route path="/notFound" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
