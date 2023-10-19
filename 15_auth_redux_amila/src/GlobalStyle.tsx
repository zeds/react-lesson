import styled, { createGlobalStyle } from "styled-components";

export const NESTJS_URL = `${import.meta.env.VITE_NESTJS_URL}`;

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
		width: 100%;
		height: 100vh;
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
	:root {
		--ls-color-border-input: lightgray;
		--ls-color-border-frame: lightgray;
		--font-feature-settings-palt: "palt" 1;
		--color-clear: hsla(0,0%,100%,0);
		--color-whiteAlpha-900: #fff;
		--color-whiteAlpha-800: hsla(0,0%,100%,0.9019607843137255);
		--color-whiteAlpha-700: hsla(0,0%,100%,0.8196078431372549);
		--color-whiteAlpha-600: hsla(0,0%,100%,0.6588235294117647);
		--color-whiteAlpha-500: hsla(0,0%,100%,0.5019607843137255);
		--color-whiteAlpha-400: hsla(0,0%,100%,0.4);
		--color-whiteAlpha-300: hsla(0,0%,100%,0.3215686274509804);
		--color-whiteAlpha-200: hsla(0,0%,100%,0.2196078431372549);
		--color-whiteAlpha-100: hsla(0,0%,100%,0.12156862745098039);
		--color-whiteAlpha-50: hsla(0,0%,100%,0.03137254901960784);
		--color-blackAlpha-900: #000;
		--color-blackAlpha-800: rgba(0,0,0,0.9019607843137255);
		--color-blackAlpha-700: rgba(0,0,0,0.8196078431372549);
		--color-blackAlpha-600: rgba(0,0,0,0.6588235294117647);
		--color-blackAlpha-500: rgba(0,0,0,0.5019607843137255);
		--color-blackAlpha-400: rgba(0,0,0,0.4);
		--color-blackAlpha-300: rgba(0,0,0,0.3215686274509804);
		--color-blackAlpha-200: rgba(0,0,0,0.2196078431372549);
		--color-blackAlpha-100: rgba(0,0,0,0.1411764705882353);
		--color-blackAlpha-50: rgba(0,0,0,0.03137254901960784);
		--color-grayAlpha-800: rgba(8,19,26,0.9019607843137255);
		--color-grayAlpha-700: rgba(8,19,26,0.8196078431372549);
		--color-grayAlpha-600: rgba(8,19,26,0.6588235294117647);
		--color-grayAlpha-500: rgba(8,19,26,0.5019607843137255);
		--color-grayAlpha-400: rgba(8,19,26,0.4);
		--color-grayAlpha-300: rgba(8,19,26,0.3215686274509804);
		--color-grayAlpha-200: rgba(8,19,26,0.2196078431372549);
		--color-grayAlpha-100: rgba(8,19,26,0.1411764705882353);
		--color-grayAlpha-50: rgba(8,19,26,0.03137254901960784);
		--color-gray-900: #08131a;
		--color-gray-800: #202a30;
		--color-gray-700: #363f42;
		--color-gray-600: #5a656b;
		--color-gray-500: #7e888f;
		--color-gray-400: #9ca7ad;
		--color-gray-300: #aeb7bd;
		--color-gray-200: #c5ccd1;
		--color-gray-100: #dce0e3;
		--color-gray-50: #f5f8fa;
		--color-darkblue-900: #181a5d;
		--color-darkblue-800: #1e2072;
		--color-darkblue-700: #232788;
		--color-darkblue-600: #292d9e;
		--color-darkblue-500: #2e33b3;
		--color-darkblue-400: #3439c9;
		--color-darkblue-300: #6165d5;
		--color-darkblue-200: #8d90e1;
		--color-darkblue-100: #babced;
		--color-darkblue-50: #e7e7f9;
		--color-blue-900: #32517d;
		--color-blue-800: #43709d;
		--color-blue-700: #4981b2;
		--color-blue-600: #5193c6;
		--color-blue-500: #57a0d4;
		--color-blue-400: #60aedb;
		--color-blue-300: #70bce1;
		--color-blue-200: #90cfeb;
		--color-blue-100: #bae2f4;
		--color-blue-50: #e3f4fb;
		--color-green-900: #145445;
		--color-green-800: #196755;
		--color-green-700: #1e7b65;
		--color-green-600: #238f76;
		--color-green-500: #27a286;
		--color-green-400: #2cb696;
		--color-green-300: #5ac6ad;
		--color-green-200: #89d6c4;
		--color-green-100: #b7e6db;
		--color-green-50: #e6f6f2;
		--color-yellow-900: #716724;
		--color-yellow-800: #8b7f2c;
		--color-yellow-700: #a69735;
		--color-yellow-600: #c0af3d;
		--color-yellow-500: #dbc746;
		--color-yellow-400: #f5df4e;
		--color-yellow-300: #f7e675;
		--color-yellow-200: #f9ed9c;
		--color-yellow-100: #fcf4c3;
		--color-yellow-50: #fefbea;
		--color-orange-900: #75531e;
		--color-orange-800: #916626;
		--color-orange-700: #ac7a2d;
		--color-orange-600: #c88d34;
		--color-orange-500: #e4a13b;
		--color-orange-400: #ffb442;
		--color-orange-300: #ffb94f;
		--color-orange-200: #ffcd81;
		--color-orange-100: #ffe1b3;
		--color-orange-50: #fff3e0;
		--color-red-900: #753528;
		--color-red-800: #914131;
		--color-red-700: #ac4e3b;
		--color-red-600: #c85a44;
		--color-red-500: #e4674e;
		--color-red-400: #ff7357;
		--color-red-300: #ff927c;
		--color-red-200: #ffb1a1;
		--color-red-100: #ffcfc6;
		--color-red-50: #ffeeeb;
		--color-pink-900: #762334;
		--color-pink-800: #8d2a3e;
		--color-pink-700: #a53148;
		--color-pink-600: #bc3852;
		--color-pink-500: #d43f5d;
		--color-pink-400: #eb4667;
		--color-pink-300: #f0718a;
		--color-pink-200: #f49bad;
		--color-pink-100: #f9c6d0;
		--color-pink-50: #fdf0f3;
		--color-purple-900: #4d2459;
		--color-purple-800: #5f2c6e;
		--color-purple-700: #713583;
		--color-purple-600: #833d98;
		--color-purple-500: #9546ad;
		--color-purple-400: #a74ec2;
		--color-purple-300: #ba75cf;
		--color-purple-200: #d09fde;
		--color-purple-100: #e1c3ea;
		--color-purple-50: #f4eaf8;
		--elevation-6: 0px 6px 10px 4px rgba(0,0,0,0.1411764705882353),0px 2px 3px 0px rgba(0,0,0,0.2196078431372549);
		--elevation-4: 0px 4px 8px 3px rgba(0,0,0,0.1411764705882353),0px 1px 3px 0px rgba(0,0,0,0.2196078431372549);
		--elevation-1: 0px 1px 3px 1px rgba(0,0,0,0.1411764705882353),0px 1px 2px 0px rgba(0,0,0,0.2196078431372549);
		--z-index-toast: 10000;
		--z-index-modal: 9999;
		--z-index-popupMessage: 9998;
		--z-index-10000: 10000;
		--z-index-9999: 9999;
		--z-index-9998: 9998;
		--z-index-50: 50;
		--z-index-40: 40;
		--z-index-30: 30;
		--z-index-20: 20;
		--z-index-10: 10;
		--z-index-0: 0;
		--easeOut: cubic-bezier(0,0,0.58,1);
		--easeInOutExpo: cubic-bezier(1,0,0,1);
		--easeInOut: cubic-bezier(0.42,0,0.58,1);
		--easeIn: cubic-bezier(0.42,0,1,1);
		--ratio-movieNoteCard: 56.25%;
		--ratio-soundNoteCard: 66.66667%;
		--ratio-imageNoteCard: 66.66667%;
		--ratio-introductionCard: 56.25%;
		--ratio-circlePlanCard: 56.25%;
		--ratio-circleCard: 52.34375%;
		--ratio-userPopupBanner: 50%;
		--ratio-contestBanner: 33.33333%;
		--ratio-movieCover: 56.25%;
		--ratio-magazineCover--card: 35.5%;
		--ratio-magazineCover: 16.875%;
		--ratio-creatorCover--card: 35.5%;
		--ratio-creatorCover: 16.875%;
		--ratio-noteDetailCover: 52.34375%;
		--size-breakpoint-2xl: 2048px;
		--size-breakpoint-xl: 1280px;
		--size-breakpoint-lg: 941px;
		--size-breakpoint-md: 769px;
		--size-breakpoint-sm: 481px;
		--size-breakpoint_xlarge: 1920px;
		--size-breakpoint_large: 1280px;
		--size-breakpoint_tb: 768px;
		--size-breakpoint_sp: 480px;
		--size-breakpoint_sp_under: 360px;
		--size-content_navbar_primary_mobile_height: 48px;
		--size-content_navbar_primary_height: 64px;
		--size-content_edit: 580px;
		--size-content_timeline: 580px;
		--size-content_2column_sub: 280px;
		--size-content_2column_main: 610px;
		--size-content_large: 1920px;
		--size-content_small: 620px;
		--size-content: 940px;
		--family-emoji: PrimaryEmojiFont,-apple-system,BlinkMacSystemFont,"Helvetica Neue","Segoe UI","Hiragino Kaku Gothic ProN","Hiragino Sans","Apple Color Emoji","noto color emoji",Arial,"Segoe UI Emoji","Segoe UI Symbol",Meiryo,sans-serif;
		--family-monospace: SFMono-Regular,Consolas,Menlo,Courier,monospace;
		--family-en: -apple-system,BlinkMacSystemFont,"Helvetica Neue","Segoe UI",Arial;
		--family-number: "Open Sans",sans-serif;
		--family-windowsSerif: YakuHanMPs,"Yu Mincho",YuMincho,"MS PMincho",serif;
		--family-windowsYakuhan: YakuHanJPs,"Segoe UI",Arial,Meiryo,sans-serif;
		--family-windows: "Segoe UI",Arial,Meiryo,sans-serif;
		--family-serif: "Hiragino Mincho ProN","Hiragino Mincho Pro",HGSMinchoE,"Yu Mincho",YuMincho,"MS PMincho",serif;
		--family-base: -apple-system,BlinkMacSystemFont,"Helvetica Neue","Segoe UI","Hiragino Kaku Gothic ProN","Hiragino Sans",Arial,Meiryo,sans-serif;
		--family: -apple-system,BlinkMacSystemFont,"Helvetica Neue","Segoe UI","Hiragino Kaku Gothic ProN","Hiragino Sans",Arial,Meiryo,sans-serif;
		--font-size-4xl: 3.5rem;
		--font-size-3xl: 2.25rem;
		--font-size-2xl: 1.75rem;
		--font-size-xl: 1.25rem;
		--font-size-lg: 1.125rem;
		--font-size-base: 1rem;
		--font-size-sm: 0.875rem;
		--font-size-xs: 0.75rem;
		--font-size-layout-infra-56: 3.5rem;
		--font-size-layout-infra-36: 2.25rem;
		--font-size-layout-infra-20: 1.25rem;
		--font-size-layout-infra-16: 1rem;
		--font-size-layout-infra-14: 0.875rem;
		--font-size-layout-infra-12: 0.75rem
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
