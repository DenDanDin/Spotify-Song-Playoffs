import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login'
import SearchForArtist from './SearchForArtist'
const code = new URLSearchParams(window.location.search).get('code');

function App() {
  return code ? <SearchForArtist code={code} /> : <Login />
}

export default App;
