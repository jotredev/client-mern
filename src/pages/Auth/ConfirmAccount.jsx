import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import api from '../../lib/Axios';

const ConfirmAccount = () => {
  const [token, setToken] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return toast.error('El token es obligatorio');
    }

    try {
      const { data } = await api.post('/users/confirm-account', {
        token,
      });

      if (data.response === 'success') {
        toast.success(data.message);
        setToken('');
        navigate('/auth/login');
      }
    } catch (error) {
      console.log(`[CREATE_USER_ERROR]: ${error}`);
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className='space-y-7'>
      <div className='w-full max-w-lg relative'>
        <label
          htmlFor='name'
          className='absolute -top-2 left-2 px-4 font-bold text-xs bg-gray-100'
        >
          Código de verificación
        </label>
        <input
          id='name'
          type='text'
          className='w-full border border-gray-500/30 bg-transparent py-3 px-5 rounded-full outline-none placeholder:text-gray-400'
          placeholder='123456'
          autoComplete='off'
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </div>
      <div>
        <button
          type='submit'
          className='w-full bg-black text-white rounded-full py-3 px-5'
        >
          Confirmar cuenta
        </button>
      </div>
      <div className='text-center'>
        <p>
          ¿Ya tienes una cuenta?{' '}
          <Link to='/auth/login' className='font-bold hover:underline'>
            Ingresar
          </Link>
        </p>
      </div>
    </form>
  );
};

export default ConfirmAccount;
