import ImageNotFound from "../assets/ImageNotFound.png";
import styled from "styled-components";
import { DISPLAY_LG, STRAPI_URL } from "../GlobalStyle";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const GridContainer = styled.div`
	max-width: ${DISPLAY_LG};
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	padding: 64px 36px;
	gap: 16px;
	@media (max-width: 1100px) {
		grid-template-columns: repeat(4, 1fr);
	}
	@media (max-width: 900px) {
		grid-template-columns: repeat(3, 1fr);
	}
	@media (max-width: 670px) {
		grid-template-columns: repeat(2, 1fr);
	}
	.nekoBox {
		width: 200px;
		height: 100%;
		@media (max-width: 670px) {
			width: 80%;
		}
		div {
			position: relative;
			width: 100%;
			img {
				width: 100%;
				aspect-ratio: 1/1;
				height: 100%;
				object-fit: contain;
			}
			span {
				position: absolute;
				font-size: 1.4rem;
				color: white;
				font-weight: bold;
				left: 0;
				bottom: 5px;
				background: rgb(0, 0, 0, 0.4);
				padding: 3px 15px 3px 5px;
				border-radius: 0 20px 20px 0;

				&:before {
					content: "￥";
					color: white;
					font-size: 1rem;
					font-weight: 700;
					top: 0px;
					left: 10px;
				}
			}
		}
		p {
			padding: 0 5px;
			font-size: 1.4rem;
			font-weight: 400;
			color: #333333;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			@media (max-width: 800px) {
				display: none;
			}
		}
	}
`;

const Home = () => {
	const { isLoading, error, data } = useQuery({
		queryKey: ["Products"],
		queryFn: async () => {
			const res = await axios.get(`${STRAPI_URL}/api/products?populate=*`);
			console.log("res=", res.data.data);
			return res.data.data;
		},
	});

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error</p>;
	}

	const content = data.map((item: any) => {
		let show = item.attributes.images.data ? true : false;
		console.log(item.id);

		if (show == true) {
			return (
				<a href={`/item?id=${item.id}`} key={item.id}>
					<div className="nekoBox">
						<div>
							<img
								src={`https://lusty.asia:1443${item.attributes.images?.data[0].attributes.url}`}
								alt=""
							/>
							<span>{item.attributes.price}</span>
						</div>
						<p>{item.attributes.description}</p>
					</div>
				</a>
			);
		} else {
			return (
				<div className="nekoBox" key={item.id}>
					<div>
						<img src={ImageNotFound} alt="" />
					</div>
				</div>
			);
		}
	});

	return (
		<>
			<GridContainer>{content}</GridContainer>
		</>
	);
};

export default Home;
