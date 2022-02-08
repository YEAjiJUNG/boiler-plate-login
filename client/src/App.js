import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

//여기서 페이지 렌더링

function App() {
  return (
    <Router>
      <div>

        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)} />
          <Route path="/login" element={Auth(LoginPage, false)} />
          <Route path="/register" element={Auth(RegisterPage, false)} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//hoc는 higher order component로 예를 들어 Auth라는 컴포넌트에서 해당 유저가 해당페이지에
//들어갈 자격이 있는지를 알아낸 후에 자격이된다면 admin component에 가게해주고 아니라면 다른 페이지로 보내버린다.
//이때 auth컴포넌트가 hoc이다.