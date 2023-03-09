import React from 'react'
import {Container} from 'react-bootstrap'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=6463990fb32c4b6183d50216d53ceff0&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
  return (
    <Container 
    className="d-flex flex-column justify-content-center align-items-center"
    style={{ minHeight: "100vh" }}
    >
      <h1>Spotify Playoffs</h1>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
          Login with Spotify
      </a>
  </Container>
  )
}
