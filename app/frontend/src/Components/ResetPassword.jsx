import React from 'react';


const RegisterForm = () => {
  return (
    <form className="flex justify-center h-screen bg-black text-white w-full mt-12">
        <div className="w-3/4 max-w-md">
            <h1 className="text-5xl font-extrabold text-center mb-12">Сброс пароля</h1>
            <div className="mb-4">
                <input
                    id="email"
                    type="text"
                    placeholder="Почта"
                    className="w-full p-2 text-white bg-black border border-custom-gray mb-4" 
                />
            </div>

            <div className="flex justify-center">
                <button className="w-1/2 border-4 border-white text-white py-2">
                Сбросить пароль
                </button>
            </div>
      </div>
    </form>
  );
};

export default RegisterForm;
