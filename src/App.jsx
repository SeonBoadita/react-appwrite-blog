import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { logout, login } from './feature/authSlice';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App = () => {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userDetaile) => {
        if (userDetaile) {
          dispatch(login({ userDetaile }))
          console.log(userDetaile)
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error("Error :: getCurrentUser:", error);
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false);
      });

  }, [dispatch])
  return (
    <div>
      <Header />
      {loading ? <p>Loading...</p> : <p>App Content</p>}
      <Footer />
    </div>
  )
}

export default App
