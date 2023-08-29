import React from "react";
import { styled } from "styled-components";

// 参考:
// https://yws.tokyo/css-star/

const StarComponent = styled.div`
   position: relative;
   display: flex;
   font-size: ${(props) => props.font_size}rem;
   line-height: 0.5em;
   letter-spacing: 0.1em;
   color: #cec6c6;
   margin: 5px;
   padding: 0;
   text-align: center;
   &:before {
      content: "★★★★★";
      position: absolute;
      color: #eeb816;
      width: calc(
         ${(props) => props.rate}em + 0.1 * (${(props) => props.rate}em - 0.5em)
      );
      overflow: hidden;
      /* white-space: nowrap; */
   }
`;

const Star = (props) => {
   console.log(props.text);
   return (
      <>
            <StarComponent rate="3" font_size="2.5">
               <span>★★★★★</span>
            </StarComponent>
       </>
   );
};

export default Star;
