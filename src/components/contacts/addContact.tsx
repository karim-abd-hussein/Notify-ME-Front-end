import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import Styles from './addContact.module.css'

export default function AddContact(props:any){


    const [phone, setPhone] = useState('');
    const [name,setName]=useState('');
    // const navigate=useNavigate();
    // const [error,setError]=useState<string|null>();

function handelAdd(){
        // setError(null);

        const token=localStorage.getItem('token');
        if(!token)
        {
            console.error("Token is require.");
            return;
        }

        fetch('http://localhost:3000/users/add-contact',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                phone,
                name
            })
        
        }
        
        )
        .then(res => res.json())
        .then(data => {

            console.log(data);
        props.setContacts(data.user.contacts);
         props.set(false);

            // navigate('dashboard',{state:{}})

        }).catch(error =>{

            // setError(error);

        });
    }


    return (
        <div className={Styles.addContact}>
        {/* {error} */}
        <input onChange={e => setName(e.target.value)} className={Styles.inputFiledAdd} type="text" placeholder="name" />
        <input onChange={e => setPhone(e.target.value)} className={Styles.inputFiledAdd} type="text" placeholder="phone" />
        <button onClick={handelAdd}>Add Contact</button>

        </div>)
}