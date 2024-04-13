import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Admin/Home';
import NotFoundPage from './pages/NotFound';
import AboutPage from './pages/Admin/About';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/Auth/Login';
import RegisterPage from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ChangePassword from './pages/Auth/ChangePassword';
import ConfirmAccount from './pages/Auth/ConfirmAccount';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path='/auth/login' element={<LoginPage />} />
          <Route path='/auth/register' element={<RegisterPage />} />
          <Route path='/auth/confirm-account' element={<ConfirmAccount />} />
          <Route path='/auth/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/auth/change-password/:token'
            element={<ChangePassword />}
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
