import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import ForgotPassword from "./Pages/ForgetPassword";
import Home from "./Pages/Home";
import CategoryPage from "./Pages/CategoryPage";
import BookPage from "./Pages/BookPage";
import PublishBook from "./Pages/PublishBook";
import ManageUsers from "./Pages/ManageUsers";
import UserProfile from "./Pages/UserProfile";
import ManageBooks from "./Pages/ManageBooks";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import PaymentSuccess from "./Pages/PaymentSuccess";
import ProtectedRoute from "./Components/ProtectedRoute";
import ChangePassword from "./Pages/ChangePassword";
import NotFound404 from "./Pages/NotFound404";
import MyOrders from "./Pages/MyOrders";
import RevokeAccess from "./Pages/RevokeAccess";
import OrderHistory from "./Pages/OrderHistory";

const App = () => {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      secondary: {
        main: "#ff4c3b",
      },
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route exact path="/" element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route
              path="/:categoryName/:categoryId"
              element={<ProtectedRoute />}
            >
              <Route
                path="/:categoryName/:categoryId"
                element={<CategoryPage />}
              />
            </Route>
            <Route exact path="/book/:bookId" element={<ProtectedRoute />}>
              <Route path="/book/:bookId" element={<BookPage />} />
            </Route>
            <Route exact path="/cart" element={<ProtectedRoute />}>
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route exact path="/publish" element={<ProtectedRoute />}>
              <Route path="/publish" element={<PublishBook />} />
            </Route>
            <Route exact path="/admin/manageusers" element={<ProtectedRoute />}>
              <Route path="/admin/manageusers" element={<ManageUsers />} />
            </Route>
            <Route exact path="/admin/manageusers" element={<ProtectedRoute />}>
              <Route path="/admin/manageusers" element={<ManageUsers />} />
            </Route>
            <Route exact path="/profile" element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
            </Route>
            <Route exact path="/managebooks" element={<ProtectedRoute />}>
              <Route path="/managebooks" element={<ManageBooks />} />
            </Route>
            <Route exact path="/checkout" element={<ProtectedRoute />}>
              <Route path="/checkout" element={<Checkout />} />
            </Route>
            <Route
              exact
              path="/paymentsuccess/:paymentId"
              element={<ProtectedRoute />}
            >
              <Route
                path="/paymentsuccess/:paymentId"
                element={<PaymentSuccess />}
              />
            </Route>
            <Route exact path="/changepassword" element={<ProtectedRoute />}>
              <Route path="/changepassword" element={<ChangePassword />} />
            </Route>
            <Route exact path="/notfound404" element={<ProtectedRoute />}>
              <Route path="/notfound404" element={<NotFound404 />} />
            </Route>
            <Route exact path="/myorders" element={<ProtectedRoute />}>
              <Route path="/myorders" element={<MyOrders />} />
            </Route>
            <Route
              exact
              path="/revokeaccess/:userID"
              element={<ProtectedRoute />}
            >
              <Route path="/revokeaccess/:userID" element={<RevokeAccess />} />
            </Route>
            <Route
              exact
              path="/orderhistory/:userID/:orderID"
              element={<ProtectedRoute />}
            >
              <Route
                path="/orderhistory/:userID/:orderID"
                element={<OrderHistory />}
              />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
