import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/mobile/home/Home";
import Create from "./pages/mobile/create/Create";
import Login from "./pages/mobile/login/Login";
import Signup from "./pages/mobile/signup/Signup";
import CartPage from "./pages/mobile/cartpage/CartPage";
import Orders from "./pages/mobile/orders/Orders";
import Completed from "./pages/mobile/completed/Completed";
import Order from "./pages/mobile/order/Order";
import About from "./pages/mobile/about/About";
import Contacts from "./pages/mobile/contacts/Contacts";

function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/orders/:id" element={<Order />} />
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contacts" element={<Contacts />}></Route>
            <Route
              path="/create"
              element={(!user && <Login />) || (user && <Create />)}
            />
            <Route
              path="/orders"
              element={(!user && <Login />) || (user && <Orders />)}
            ></Route>
            <Route
              path="/completed"
              element={(!user && <Login />) || (user && <Completed />)}
            ></Route>
            <Route
              path="/login"
              element={(!user && <Login />) || (user && <Navigate to="/" />)}
            />
            <Route
              path="/signup"
              element={(!user && <Signup />) || (user && <Navigate to="/" />)}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
