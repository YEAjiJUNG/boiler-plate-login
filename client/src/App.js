import logo from './logo.svg';
import './App.css';

//여기서 페이지 렌더링

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

//hoc는 higher order component로 예를 들어 Auth라는 컴포넌트에서 해당 유저가 해당페이지에
//들어갈 자격이 있는지를 알아낸 후에 자격이된다면 admin component에 가게해주고 아니라면 다른 페이지로 보내버린다.
//이때 auth컴포넌트가 hoc이다.