import React from "react";
import { styled } from "styled-components";

// 参考:
// https://yws.tokyo/css-star/

const StarComponent = styled.div`
   /* position: relative; */
   display: flex;
   font-size: ${(props) => props.font_size}rem;
   line-height: 1em;
   letter-spacing: 0.1em;
   color: #ccc;
   margin: 0;
   padding: 0;
   text-align: center;
   /* align-items: center; */
   /* background: red; */
   &:before {
      content: "★★★★★";
      position: absolute;
      color: #eeb816;
      background: green;
      width: calc(
         ${(props) => props.rate}em + 0.1 * (${(props) => props.rate}em - 0.5em)
      );
      overflow: hidden;
      white-space: nowrap;
   }
   span:nth-child(2) {
      font-size: 0.5em;
      color: #0173cc;
      letter-spacing: 0.1rem;
      font-weight: bold;
      background: red;
   }
`;

const Header = styled.div`
   font-size: 20px;
   p {
      font-size: 2rem;
   }
`;

const Star = (props) => {
   console.log(props.text);
   return (
      <>
         <Header>
            {/* <p>あいうえお</p> */}

            <StarComponent rate="1" font_size="5">
               <span>★★★★★</span>
               <span>8608</span>
            </StarComponent>
         </Header>
      </>
   );
};

export default Star;
