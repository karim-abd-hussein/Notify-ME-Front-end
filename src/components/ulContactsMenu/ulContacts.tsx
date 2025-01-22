import Styles from './ulContacts.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import Specific Icons
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function UlContactsMenu(props:any){


    const ulContacts=props.contacts.map((contact:any) =>{

        return <li key={contact.phone} className={Styles.liContactMenu}><div className={Styles.nameContainer}>
            
                <FontAwesomeIcon style={{padding:'0 1em'}} icon={faUser} />
            <h3 onClick={() => {
            props.setContact(contact);        
        }}>{contact.name}</h3></div><FontAwesomeIcon style={{cursor:'pointer',margin:'0px'}} className={Styles.removeButton} onClick={ () => props.handleRemove(contact.phone)} icon={faTrash}/></li>

    });
    return(
        <ul className={Styles.ulMenu}>{ulContacts}</ul>
    )
}