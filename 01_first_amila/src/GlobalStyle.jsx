import styled, { createGlobalStyle } from "styled-components";

export const DISPLAY_MD = "599px";
export const DISPLAY_LG = "1024px";
export const DISPLAY_CT = "896px";
const GlobalStyle = createGlobalStyle`
	* {
		padding: 0;
		margin: 0;
		list-style: none;
		text-decoration: none;
		box-sizing: border-box;
	}
	html {
		font-size: 62.5%; 
	}
	body {
		font-family: 'Roboto', sans-serif;
	}
	h1 {
		font-size: 3rem;
	}
	h2 {
		font-size:2.0rem;
	}
	h3 {
		font-size: 1.3rem;
		
	}
	h4 {
		font-size: 1.5rem;
	}
	h5 {
		font-size: 1.4rem;
	}
	@media (max-width: ${DISPLAY_MD}) {
		html {
			font-size: 40%;
		}
	}


`;
export const FooterContainer = styled.div`
    max-width: ${DISPLAY_LG};
    padding: 0 15px;
    margin: 0 auto;
`;

export default GlobalStyle;
