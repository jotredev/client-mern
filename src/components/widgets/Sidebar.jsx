import useAuth from '../../hooks/useAuth';
import { cn } from '../../lib/Utils';

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ showSidebar, setShowSidebar }) => {
  const { logout } = useAuth();

  return (
    <>
      <aside
        className={cn(
          'bg-gray-100 fixed z-50 h-full lg:h-auto lg:left-0 top-0 lg:static w-64 flex flex-col justify-between p-5 transition-all duration-300 ease-in-out',
          showSidebar ? 'left-0' : '-left-full'
        )}
      >
        <section>LOGO MENU</section>
        <section>
          <ul>
            <li>
              <button
                onClick={() => logout()}
                className='w-full flex items-center justify-center gap-4 hover:bg-gray-200 transition-colors duration-300 py-3 px-4 rounded-md'
              >
                <i className='fi fi-rr-exit mt-1'></i>
                Cerrar sesión
              </button>
            </li>
          </ul>
        </section>
      </aside>
      <div
        role='button'
        onClick={() => setShowSidebar(false)}
        className={cn(
          'fixed z-40 left-0 top-0 w-full h-full bg-black/50',
          showSidebar ? 'block' : 'hidden'
        )}
      />
    </>
  );
};
