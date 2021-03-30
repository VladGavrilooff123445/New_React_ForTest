import React, {useState} from 'react';
import axios from "axios";

 function Header(){
     const [login, setLogin] = useState('');
     const [password, setPassword] = useState('');
     const handler = async () =>{
         const userName = await axios.post('http://localhost:3000/api/user_name',{login: login,password: password}, { headers: {
                 'Content-Type': 'application/json'
             }
         });
    }

        return (
            <div>
            <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Курсы валют</h1>
                </div>
            </div>
                <input type="text" name="login" placeholder={'логин'} onChange={(event)=>setLogin(event.target.value)}/>
                <input type="text" name="password" placeholder={'пароль'} onChange={(event)=>setPassword(event.target.value)}/>
                <button onClick={handler}>Submit</button>
            </div>
        );

}
export default Header