import React, {useEffect} from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import Sidebar from '../components/molecules/Dashboard/Sidebar';
import Navbar from '../components/molecules/Dashboard/Navbar';
import LogoutOverlay from '../components/organisms/Logout/LogoutOverlay';
import { logoutActions, logout } from '../state-manager/reducers/logout/logout';
import { useSelector, useDispatch } from 'react-redux';
import ResetPassword from "../components/organisms/Password/resetpassword";
import { getAuthToken, getDeviceName } from '../utilis';

const AppLayout = () => {
  const showLogoutModal = useSelector(state => state.logout.showModal)
  const showResetModal = useSelector(state => state.logout.showResetModal)
  const allowedTimeOfInactivityInSeconds = useSelector(state => state.logout.allowedTimeOfInactivityInSeconds)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const eventsThatShowActivity = ["mousemove", "keydown", "click", "scroll", "input"];
    eventsThatShowActivity.forEach((event) => {
      window.addEventListener(event, () => {
        dispatch(logoutActions.resetAllowedTimeOfInactivityInSeconds())
      })
    })
  }, [dispatch])
  
  console.log(allowedTimeOfInactivityInSeconds);
  
  useEffect(() => {
    const checkIfTokenExistsAndIsValid = async () => {
      dispatch(logoutActions.countDownSeconds());
      const token = await getAuthToken()
      if(allowedTimeOfInactivityInSeconds <= 0 && token){
        const deviceName = getDeviceName();
        dispatch(logout({ deviceName: deviceName }));
      }
      if(!token){
        navigate("/")
      }
    }

    const id = setInterval(checkIfTokenExistsAndIsValid, 1000)
    return () => clearInterval(id)
  }, [navigate, dispatch, allowedTimeOfInactivityInSeconds])

  return (
    <> 
    {showLogoutModal && <LogoutOverlay/>}
    {showResetModal && <ResetPassword/>}

      <div className='flex h-screen max-h-screen'>
          <Sidebar/>
          <div className='basis-[85%] flex flex-col max-w-[85%]'>
            <Navbar/>
            <div className="bg-[#F8FAFC] py-[1.125rem] px-[2.5rem] grow space-y-[1.25rem] overflow-y-auto overflow-x-auto">
              <Outlet/>
            </div>
          </div>
      </div>
    </>
  )
}

export default AppLayout;
