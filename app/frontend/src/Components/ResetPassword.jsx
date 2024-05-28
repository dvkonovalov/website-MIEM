import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  let csrftoken;

  try {
    csrftoken = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('csrftoken='))
      ?.split('=')[1];
  } catch (error) {
    console.error('CSRF token not found:', error);
  }

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch("http://127.0.0.1/account/reset_password/", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify({
          email: email,

        }),
      });

      if (!response.ok) {
        throw new Error('Не получилось создать новый аккаунт.');
      }

      const result = await response.json();
      alert(result);

      if (result.message === "SUCCESS") {
        alert("Успешно.");
        navigate('/');
        window.location.reload();
      } else {
        setError("Не получилось отправить на почту, проверьте информации.");
      }
    } catch (error) {
      console.error('Не получилось отправить на почту, проверьте информации:', error);
      setError("Не получилось отправить на почту, проверьте информации: " + error.message);
    }
  };
  
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
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex justify-center">
                <button className="w-1/2 border-4 border-white text-white py-2"
                onClick={submit}>
                Сбросить пароль
                </button>
            </div>
      </div>
    </form>
  );
};

export default ResetPassword;
