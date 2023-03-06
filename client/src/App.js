import Login from './Login'
import TestComponent from './TestComponent'
const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <TestComponent code={code} /> : <Login />
}

export default App;
