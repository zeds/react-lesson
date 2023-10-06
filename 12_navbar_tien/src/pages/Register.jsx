import styled from "styled-components";
import axios from "axios";
import { useRef, useState } from "react";

const Container = styled.div`
  max-width: 800px;
  background-color: #fff;
  margin: 0 auto;
  input {
    width: 200px;
    height: 30px;
    padding: 0 5px;
  }
`;
const Error = styled.div`
font-size:1.6rem;
color: red;
`
function Register() {
  const [messenger, setMessenger] = useState("");
  const refUserName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();

  const clickSubmit = () => {
    // alert("click");
    console.log(refUserName);
    axios
      .post("http://localhost:1337/api/auth/local/register", {
        username: refUserName.current.value,
        email: refEmail.current.value,
        password: refPassword.current.value,
      })
      .then((response) => {
        console.log(response);
        setMessenger("")
      })
      .catch((error) => {
        console.log(error);
        console.log("エラー");
        setMessenger(error.response.data.error.message);
      });
  };
  return (
    <Container>
      <h1>Register</h1>
      <Error>{messenger}</Error>
      <div>username</div>
      <input ref={refUserName}></input>
      <div>email</div>
      <input ref={refEmail}></input>
      <div>password</div>
      <input ref={refPassword}></input>
      <br />
      <button onClick={clickSubmit}>送信</button>
    </Container>
  );
}

export default Register;
