import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import { TicketProvider } from "./providers/TicketProvider";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
// Pages
import HomePage from "./pages/Admin/Home";
import NotFoundPage from "./pages/NotFound";
import AboutPage from "./pages/Admin/About";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ChangePassword from "./pages/Auth/ChangePassword";
import ConfirmAccount from "./pages/Auth/ConfirmAccount";
import HomeTickets from "./pages/Admin/Tickets";
import CreateTicketPage from "./pages/Admin/Tickets/CreateTicket";
import TicketDetails from "./pages/Admin/Tickets/TicketDetails";
import ProfilePage from "./pages/Admin/User/Profile";

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/confirm-account" element={<ConfirmAccount />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/auth/change-password/:token"
              element={<ChangePassword />}
            />
          </Route>
          <Route path="/tickets" element={<MainLayout />}>
            <Route index element={<HomeTickets />} />
            <Route path="create" element={<CreateTicketPage />} />
            <Route path=":ticketId" element={<TicketDetails />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;
