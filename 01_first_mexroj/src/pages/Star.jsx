import React from "react";
import { styled } from "styled-components";

// 参考:
// https://yws.tokyo/css-star/

const StarComponent = styled.article`
   /* position: relative; */
   display: flex;
   font-size: ${(props) => props.fontSize}rem;
   line-height: 1em;
   letter-spacing: 0.2em;
   color: #ccc;
   margin: 0;
   padding: 0;
   &:before {
      content: "★★★★★";
      position: absolute;
      color: #eeb816;
      width: calc(
         ${(props) => props.rate}em + 0.1 * (${(props) => props.rate}em - 0.5em)
      );
      overflow: hidden;
      white-space: nowrap;
   }
   p {
      display: inline-block;
      font-size: 0.8em;
      color: #0173cc;
      font-weight: 500;
      letter-spacing: 0.001em;
   }
`;

const Star = (props) => {
   // 星が何個？  　　rate
   // 評価がいくつ？  text=8562
   // fontSize="1.5"
   console.log(props.rate);
   console.log(props.text);
   console.log(props.fontSize);
   return (
      <>
         <StarComponent rate={props.rate} fontSize={props.fontSize}>
            <span>★★★★★</span>
            <p>{props.text}</p>
         </StarComponent>
      </>
   );
};

export default Star;
