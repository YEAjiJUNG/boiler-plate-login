import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action';

function LoginPage(props){
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    //action이름: loginUser -> 리듀서로 보내준다. 리듀서는 이전state과 action 받아서 새로운 state 준다.
    dispatch(loginUser(body))
      .then(res => {
        if(res.payload.loginSuccess){
          props.history.push('/');
        }
        else{
          alert('Error');
        }
      })

  
  }


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
        >
          <label>Email</label>
          <input type="email" value={Email} onChange={onEmailHandler}/>
          <label>Password</label>
          <input type="password" value={Password} onChange={onPasswordHandler}/>
        <br />
        <button >Login</button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage);