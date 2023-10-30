import { DISPLAY_MD } from './../GlobalStyle';
import styled, { keyframes } from 'styled-components'
import { DISPLAY_LG } from '../GlobalStyle';

export const NewInfoSection = styled.section`
  display: flex;
	justify-content: space-around;
	flex-direction: column;
  width: 100%;
  align-items: center;
  h2 {
    color: #000;
    text-align: center;
    font-size: 2.6rem;
    font-weight: 500;
    line-height: 26px;
  }
`
export const TopNewInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
  max-width: ${DISPLAY_LG};
  margin: 50px auto;
  padding: 0 30px 30px 30px;

  &.member {
    margin: 0 auto;
  }
  @media(max-width: ${DISPLAY_MD}){
    margin: 0 auto;
    padding: 30px 0;
  }
`
const slideAnimation = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50px);
  }
`;

export const MovingBar = styled.div`
  margin: 5px 0 0 10px;
  width: 70px;
  height: 1px;
  background-color: black;
  animation: ${slideAnimation} 2s cubic-bezier(.51,.03,.38,.96) normal infinite;
`;
export const TopNewSwiper = styled.div`
  display: flex;
	justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;

  button {
    height: 100px;
    width: 40px;
    background-color: rgb(243, 246, 247);
    color: rgba(0, 0, 0, 0.5);
    border: none;
    transition: color 0.5s;
    &:hover {
      color: rgba(0, 0, 0, 0.8);
    }
    &:active {
      color: gray;
    }
  }
  @media(max-width: ${DISPLAY_MD}) {
    button {
      display: none;
    }
  }
`
export const SwiperSwaper = styled.div`
  display: flex;
  gap: 25px;
  width: 100%;
  max-width: ${DISPLAY_LG};
  flex: 1;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-behavior: smooth;

  ::-webkit-scrollbar {
    height: 3px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  @media(max-width: ${DISPLAY_LG}){
    gap: 5px;
  }
`
export const SwiperSwaperNewInf = styled(SwiperSwaper)`
  gap: 20px;
`
export const SwiperSwaperStaff = styled(SwiperSwaper)`
`
export const TopNewBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  button {
    &.LeftBtn {
      margin-right: 10px;
    }
  }
`
export const GroupLink = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 210px;
  height: 100%;
`
export const Description = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 210px;
`
export const IMG = styled.div`
  display: flex;
  width: 100%;
  height: 126px;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;

  img {
    width: 100%;
    height: 126px;
    object-fit: cover;
  }
`
export const Term = styled.div`
  padding: 1px 14.78px 17px 0px;
  align-items: flex-start;
  width: 210px;
  gap: 2.39px;
  border-bottom: 1px solid #E3E3E3;

  p {
    color: #000;
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 22.4px;
  }
`
export const Details = styled.div`
  display: inline-flex;
  margin-top: 15px;
  justify-content: center;
  align-items: center;
  width: 100%;

  p {
    color: #000;
    font-size: 1.4rem;
    font-weight: 400;
    line-height: 22.4px;
  }

  &.money {
    margin-top: auto;
  }
`