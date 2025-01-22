import { useState } from 'react';
import Styles from './log-in.module.css'
import { useNavigate } from 'react-router-dom';

export default function LogIn() {

    const [phone, setPhone] = useState('');
    const [error,setError]=useState<string|null>();

    const  navigate=useNavigate();

   async function handleLogIn() {
        setError(null);
    try {
        
      const res=await fetch('http://localhost:3000/users/log-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({
                phone
            }),
        });
        
        if (!res.ok) {
            setError('Login failed.');
            return;
          }

        const data=await res.json();

         if(!res.ok)
        {
            let errorMessage = 'Something went wrong.';
                try {
                    errorMessage = data.message || errorMessage; 
                } catch {
                    errorMessage = 'Unable to parse server response.';
                }
                setError(errorMessage); 
                return;

        }
        const {info,token}=data;
        localStorage.setItem('token', token);

            navigate('dashboard',{state:{info}});

      
  } catch (error) {
    setError('Network error: Unable to reach the server.');
  }
 }
    
    return (
        <div className={Styles.form}>
            {error && <p className={Styles.error}>{error}</p>} {/* Display error message */}

            <input
                className={Styles.inputPhone}
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
           
            <button 
            className={Styles.botton}
            onClick={handleLogIn}>Log In</button>

            <button onClick={()=> {
                navigate('sign-up');
            }} className={Styles.button} >Don't have account</button>
        </div>
    );
}
