import { useLocation, useNavigate } from "react-router-dom";
import Board from "../board/board";
import ContactMenu from "../contacts/contactMenu";
import Styles from './dashboard.module.css'
import AddContact from '../contacts/addContact'
import { useEffect, useRef, useState } from "react";
import ChatBoard from "../chat-board/chat-board";
import { Socket,io } from "socket.io-client";

export default function Dashboard(){
    
    const [contacts, setContacts] = useState([]);
    const [displayAddContact,setDisplayAddContact]=useState<boolean>(false);
    const [contact,setContact]=useState<any>(null);
    const socketRef = useRef<Socket | null>(null);
    const location=useLocation();
    const  navigate=useNavigate();

    useEffect(()=>{
    const {info}= location.state;
    setContacts(info.contacts);
    },[])
    
    useEffect(()=>{

    const token = localStorage.getItem('token');        
            if (!token) {
                console.error("Token is required.");
                navigate('/');
                return;
            }
        
            // Initialize the socket connection
            const socket =  io('http://localhost:3000', {
                query: { token },
                transports: ['websocket'],
            });
        
            socketRef.current=socket
            // Handle socket errors
            socket.on('error', (data) => {
                console.log('Socket error:', data);
            });
        }, []);


    return(
        
        <div className={Styles.dashboard}>
        <ContactMenu contacts={contacts} setContacts={setContacts} setContact={setContact} setAddContact={setDisplayAddContact}/>
       {displayAddContact&& <AddContact setContacts={setContacts} set={setDisplayAddContact} />}
       {contact&&contacts.length? <ChatBoard socket={socketRef.current} contact={contact}  /> :<Board />}
        </div>

    );

}