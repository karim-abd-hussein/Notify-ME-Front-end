import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LogIn from '../log-in/log-in'
import SignUp from '../sign-up/sign-up'
import Dashboard from '../dashboard/dashboard'


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/sign-up' element={<SignUp />} />
       <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
