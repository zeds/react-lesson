import styled from "styled-components";
import axios from "axios";

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

function Login() {
  const clickSubmit = () => {
    // alert("Please enter");
    console.log("testtt");
    axios
      .post("http://localhost:1337/api/auth/local", {
        identifier: "tien@gmail.com",
        password: "Tien123",
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        console.log("エラー");
      });
  };
  return (
    <Container>
      <>Login</>
      <div>email</div>
      <input></input>
      <div>password</div>
      <input></input>
      <br />
      <button onClick={clickSubmit}>送信</button>
    </Container>
  );
}

export default Login;
