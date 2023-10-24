import React, { useEffect, useState } from "react";

const Home = () => {
	const [data, setData] = useState({ name: "Alice", age: 25 });

	useEffect(() => {
		setData((prevData) => ({ ...prevData, age: 26 }));
		console.log("Home data=", data);
	}, []);

	return (
		<div>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
				nobis adipisci recusandae reprehenderit maxime veritatis repellat
				doloremque aspernatur, similique quas id possimus excepturi veniam.
				Id voluptates asperiores dolores praesentium iusto?
			</p>
		</div>
	);
};

export default Home;
