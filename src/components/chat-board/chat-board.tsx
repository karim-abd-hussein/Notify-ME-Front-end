import { useEffect, useState } from 'react';
import Styles from './chat-board.module.css'
import { useNavigate } from 'react-router-dom';

export default function ChatBoard(props:any) {
    const [message, setMessage] = useState('');
    const [messagesFrom, setMessagesFrom] = useState<string[]>([]);
    const [messagesTo, setMessagesTo] = useState<string[]>([]);
    const navigate=useNavigate();

    useEffect(() => {
        const handleMessage = (data: { from: string; content: string }) => {
            console.log('Message received:', data);
            setMessagesFrom(pre => [data.content, ...pre]);
            alert(`Hi, ${data.from} sent you: ${data.content}`);
        };
    
        // Add the listener
        props.socket.on('message', handleMessage);
    
        // Cleanup the listener
        return () => {
            props.socket.off('message', handleMessage);
        };
    }, [props.socket]);
    
   
    useEffect( ()=>{

        const phone=props.contact.phone;
        const token=localStorage.getItem('token');
        if(!token)
        {   
            console.error("Token is require.");
            navigate('/');
            return;
        }
        fetch(`http://localhost:3000/users/messages/to/${phone}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', 
                 'Authorization': `Bearer ${token}`
            }
        }).then(res => res.json())
        .then((data) => {

        const newMessages = data.messages.map((obj:any) => obj.content);
          setMessagesFrom(newMessages);


        }).catch(error =>{

            console.log(error);

        })

/////
fetch(`http://localhost:3000/users/messages/from/${phone}`,{
    method: 'GET',
    headers: {
        'Content-Type': 'application/json', 
         'Authorization': `Bearer ${token}`
    }
}).then(res => res.json())
.then((data) => {

    const newMessages = data.messages.map((obj:any) => obj.content);
    setMessagesTo(newMessages);


}).catch(error =>{

    console.log(error);

})

  },[props.contact.phone])



    function sendMessage () {

        setMessagesTo(pre => [message,...pre]);
        if ( props.socket) {
            // Emit a 'message' event with the data
            props.socket.emit('message', {to:props.contact.phone ,content: message });
        }
    };

    return (
        <div className={Styles.chatBoard}>
            <div className={Styles.header}></div>
            <div className={Styles.messageContainer}>
                <ul className={Styles.ulListFrom}>
                    {messagesFrom.map((msg: string, index: number) => (
                        <li className={Styles.liItems} key={index}>
                         {msg}
                        </li>
                    ))}
                </ul>

                <ul className={Styles.ulListTo}>
                    {messagesTo.map((msg: string, index: number) => (
                        <li className={Styles.liItems} key={index}>
                             {msg}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={Styles.inputContainer}>
                <input className={Styles.sendInputFiled}
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button className={Styles.sendButton}
                    onClick={() => {
                        sendMessage();
                        setMessage('');
                    }}
                >
                    Send
                </button>
            </div>
        </div>
    );
    
    
}
