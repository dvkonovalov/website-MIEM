import { useState, useEffect } from 'react';
import axios from 'axios';

const useUserStatus = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [hasRemoteAccess, setHasRemoteAccess] = useState(false);

  const fetchUserStatus = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:7000/api/status_user/');
      if (response.status === 200) {
        const data = response.data;
        setUserStatus(data);
        setIsSessionValid(data.authorized === "true");
        setHasRemoteAccess(data.remote_access === "true");
      }
    } catch (error) {
      console.error('Error fetching user status:', error);
      setIsSessionValid(false);
      setHasRemoteAccess(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
    const intervalId = setInterval(fetchUserStatus, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { userStatus, isSessionValid, hasRemoteAccess };
};

export default useUserStatus;
