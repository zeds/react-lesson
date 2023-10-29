import styled, { createGlobalStyle } from "styled-components";

// export const STRAPI_URL = `${import.meta.env.VITE_STRAPI_URL}`;
export const NESTJS_URL = 'https://danang-alley.com:2443';
export const DISPLAY_MD = "599px";
export const DISPLAY_LG = "1024px";
export const DISPLAY_CT = "896px";
export const HEIGHT_NAV = "62px";

const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		list-style: none;
		text-decoration: none;
		box-sizing: border-box;
	}
	a {
		color: white;
	}
	html {
		font-size: 62.5%;
	}
	body {
		font-family: 'Roboto', sans-serif;
		background: #F3F6F7;
	}
	h1 {
		font-size: 3rem;
	}
	h2 {
		font-size: 2rem;
	}
	h3 {
		font-size: 1.4rem;
		
	}
	h4 {
		font-size: 1.5rem;
	}
	h5 {
		font-size: 1.4rem;
	}

	@media (max-width: ${DISPLAY_MD}) {
		html {
			font-size: 45%;
		}
	}


`;

export const Container = styled.div`
	max-width: ${DISPLAY_LG};
	padding: 62px 10px;
	width: 100%;
	height: 100vh;
	background: white;
	margin: 0 auto;
`;

export const FooterContainer = styled.div`
	max-width: ${DISPLAY_LG};
	padding: 0 15px;
	margin: 0 auto;
`;

export default GlobalStyle;
