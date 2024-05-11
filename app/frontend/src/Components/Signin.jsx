import React from 'react';
import hseimage from '../Assets/hse.png';
import googleimage from '../Assets/google.png';


const AuthorizationForm = () => {
  return (
    <div className="flex justify-center h-screen bg-black text-white w-full mt-12">
      <div className="w-3/4 max-w-md">
        <h1 className="text-5xl font-extrabold text-center mb-12">Авторизация</h1>
        <div className="flex flex-col items-center justify-between mb-8 space-y-4">
        <a src="" className="flex items-center justify-between p-2 border border-custom-gray rounded-full w-full">
            <div className="flex justify-center items-center rounded-full bg-white some-icon-class">
                <img src= {hseimage} alt="Icon" className="w-8 h-8" />
            </div>
            <span className="text-center flex-grow">ЕЛК ВШЭ</span>
            <div className="w-8"></div>
        </a>
        <a src="" className="flex items-center p-2 border border-custom-gray rounded-full w-full">
            <div className="flex justify-center items-center some-icon-class">
                <img src= {googleimage} alt="Icon" className="w-8 h-8" />
            </div>
            <span className="text-center flex-grow">Google</span>
            <div className="w-8"></div>
        </a>
        </div>
        <div className="mb-4">
          <input
            id="email"
            type="text"
            placeholder="Почта"
            className="w-full p-2 text-white bg-black border border-custom-gray"
          />
        </div>
        <div className="mb-6">
          <input
            id="password"
            type="password"
            placeholder="Пароль"
            className="w-full p-2 text-white bg-black border border-custom-gray"
          />
        </div>
        <div className="flex justify-center">
          <button className="w-1/4 border-4 border-white text-white py-2">
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthorizationForm;