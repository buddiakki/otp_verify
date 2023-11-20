import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Home from "./home";
import App from "./App";
import ProtectedRoutes from "./protectedRoutes";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Route>
  )
);

export default router;
