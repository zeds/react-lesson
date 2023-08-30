import React from "react";
import { styled } from "styled-components";
import Star from "./Star";
import avatar from "../assets/icons/kamekichi.jpeg";
import verify from "../assets/icons/verify.svg";
import arrow from "../assets/icons/arrow.svg";

export const AuthorContainer = styled.div`
   position: relative;
   margin-top: 20px;
   padding: 16px;
   font-size: 12px;
   border-top: 1px solid lightgray;
   border-bottom: 1px solid lightgray;
   .avatar {
      display: flex;

      align-items: center;
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 5px;
      gap: 15px;

      img {
         width: 46px;
         height: 46px;
         border-radius: 23px;
      }
      div {
         line-height: 24px;

         p:nth-child(1) {
            letter-spacing: 0.05em;
         }

         div {
            display: flex;
            align-items: center;
            img {
               width: 18px;
               height: 18px;
            }
            p {
               margin-left: 5px;
               font-weight: normal;
            }
         }
      }
   }
   .arrow {
      position: absolute;
      top: 40%;
      right: 0;
   }

   &:hover {
      background: #dfdfdf;
   }
`;

const Author = () => {
   return (
      <>
         <AuthorContainer>
            <div className="avatar">
               <img src={avatar} alt="avatar"></img>
               <div>
                  <p>アミラ💛メルカリへようこそ</p>
                  <Star rate="3" text="8617" fontSize="1.5"></Star>
                  <div>
                     <img src={verify} alt="verify"></img>
                     <p>本人確認済</p>
                  </div>
               </div>
            </div>
            <div className="arrow">
               <img src={arrow} alt="arrow" />
            </div>
         </AuthorContainer>
      </>
   );
};

export default Author;