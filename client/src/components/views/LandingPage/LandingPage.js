import React, {useEffect} from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {

  const onClickHandler = () => {
    axios.get('/api/users/logout')
      .then(res => {
        if(res.data.success){
          props.history.push('/login');
        }
        else{
          alert('Failed to logout');
        }
      });
  }

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data));
  }, []);
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <h2>LandingPage</h2>
      <button onclick={onClickHandler}>로그아웃</button>
    </div>
  );
}

export default withRouter(LandingPage);