import { useState } from 'react';
import Styles from './sign-up.module.css';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();

    async function handleSignUp() {
        setError(null); 
        try {
            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, name }),
            });

            if (!res.ok) {
                let errorMessage = 'Something went wrong.';
                try {
                    const errorData = await res.json();
                    errorMessage = errorData.message || errorMessage; 
                } catch {
                    errorMessage = 'Unable to parse server response.';
                }
                setError(errorMessage); 
                return;
            }

            const data = await res.json();
            const { token, info } = data;
            localStorage.setItem('token', token); 
            navigate('/dashboard', { state: { info } });
        } catch (err) {
            setError('Network error: Unable to reach the server.');
        }
    }

    return (
        <div className={Styles.form}>
            {error && <p className={Styles.error}>{error}</p>} {/* Display error message */}
            <input
                className={Styles.input}
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                className={Styles.input}
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={() => navigate('/')}>Already have an account</button>
        </div>
    );
}
