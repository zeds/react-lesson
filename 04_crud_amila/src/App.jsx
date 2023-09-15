import "./App.css";
import { styled } from "styled-components";
import { useQuery } from "@tanstack/react-query";

const Container = styled.div`
	max-width: 1024px;
	background: white;
	font-size: 2rem;
	margin: 0 auto;
`;
const Card = styled.div`
display: flex;
justify-content: space-between;
  width: 90%;
  padding: 10px;
  margin: 10px auto;
  /* font-size: 2rem; */
  border: 1px solid black;

  .operation {

    display: flex;
    gap:10px;
    border-radius: 4px;
  }
  button {
    border: none;
    padding: 10px;

  }
  button:hover {
    cursor: pointer;
    opacity: 0.1;
  }
  
`

function App() {
	const postsQuery = useQuery({
		queryKey: ["comments"],
		queryFn: () =>
			fetch(`https://lusty.asia:1443/api/mercari-comments`).then((res) =>
				res.json()
			),
	});

	if (postsQuery.isLoading) {
		return <h1>Loading...</h1>;
	}
  const clickEdit=()=> {
    console.log("Edit")
  }
  const clickDelete =()=> {
    console.log("delete")
  }

	return (
		<Container>
			{postsQuery.data.data.map((item,index) => (
        <Card key={index}>
          <div>
				<div>{item.attributes.name}</div>
        <div>{item.attributes.comment}</div>
        </div>
        <div className="operation">
   <button onClick={() =>clickEdit()}>edit</button>
   <button onClick={() =>clickDelete() }>delete</button>
   
        </div>
        </Card>
			))}
		</Container>
	);
}

export default App;
