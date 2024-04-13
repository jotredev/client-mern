import { Outlet, useLocation } from 'react-router-dom';

const AuthLayout = () => {
  const { pathname } = useLocation();

  let title = '';

  switch (pathname) {
    case '/auth/login':
      title = 'Inciar sesión';
      break;
    case '/auth/register':
      title = 'Crear cuenta';
      break;
    case '/auth/confirm-account':
      title = 'Confirmar cuenta';
      break;
    case '/auth/forgot-password':
      title = 'Recuperar contraseña';
      break;
  }

  return (
    <div className='min-h-screen flex flex-col justify-center bg-gray-100 p-5 lg:p-8'>
      <div className='w-full max-w-md mx-auto'>
        <h1 className='text-2xl font-bold mb-10'>
          {pathname.startsWith('/auth/change-password/')
            ? 'Actualizar password'
            : title}
        </h1>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
