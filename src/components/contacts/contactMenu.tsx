import Styles from './contacts.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import Specific Icons
import { faAdd,faUserGroup } from '@fortawesome/free-solid-svg-icons';
import UlContactsMenu from '../ulContactsMenu/ulContacts';

export default function ContactMenu(props:any){


    function handleRemove(phone:string){

        const token=localStorage.getItem('token');
        if(!token)
        {
            console.error("Token is require.");
            return;
        }

        fetch(`http://localhost:3000/users/delete-contact/${phone}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`
            }
        
        }).then(res => res.json())
        .then(data =>{

        props.setContacts(data.user.contacts);


        }).catch(error =>{

            console.log(error);

        })
        
    }

    

    return(
        <div className={Styles.contacts}>
        <div className={Styles.header}>
            <FontAwesomeIcon icon={faUserGroup} />
            <FontAwesomeIcon style={{cursor:'pointer'}} className={Styles.addButton} onClick={() => props.setAddContact(true)} icon={faAdd} size="2x" />
        </div>
        <UlContactsMenu setContact={props.setContact} handleRemove={handleRemove} contacts={props.contacts}/>
        </div>
    );
 
}