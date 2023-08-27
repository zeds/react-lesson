import styled from "styled-components";

export const NekoContainer = styled.div`
    max-width: 1280px;
    background: white;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;
    gap: 10px;
    @media (max-width: 800px) {
        grid-template-columns: 1fr;
    }
`;

export const LeftBox = styled.div`
    height: 700px;
    img {
        width: 100%;
    }
`;

export const RightBox = styled.div`
    height: 1500px;
    border: 2px solid black;
    padding: 10px;
    font-size: 1.5rem;
    .title {
        font-size: 2.4rem;
        font-weight: 700;
    }
    .brand {
        font-size: 1.5rem;
        font-weight: 400;
        color: #666666;
    }
    .price {
        font-size: 28px;
        font-weight: 400;
    }
    .button_buy {
        display: flex;
        margin-top: 10px;

        width: 100%;
        height: 45px;
        background: #ff323f;
        border-radius: 4px;

        font-size: 15px;
        color: white;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        img {
            margin-left: 5px;
        }
        &:hover {
            cursor: pointer;
            opacity: 0.6;
        }
    }
        .thanks {
            margin-top: 10px;
            font-size: 15px;
            color: #666666;
            line-height: 21px;
        }
        .desc {
            /* background: yellow; */
            font-size: 1.5rem;
            margin-top: 20px;
            h2 {
                margin-bottom: 15px;
            }
        }

        .info {
            h2{
                color: #666666;

            }
            /* background: red; */
            div {
                display: flex;
                gap: 20px;
                align-items: center;
                font-size: 15px;
                margin-bottom: 10px;
                p {
                    width: 30%;
                    font-weight: bold;
                }
                ul {
                    width: 50%;
                    color: blue;
                    text-decoration: underline;
                }
            }
        }

`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const AuthorContainer = styled.div`
    position: relative;
    margin-top: 20px;
    border-radius: 4px;
    padding: 10px;
    background: #f5f5f5;
    font-size: 16px;
    div {
        span {
            margin-left: 4px;
            font-weight: bold;
        }
    }
    .arrow {
        position: absolute;
        top: 25%;
        right: 0;
    }
    &:hover {
        cursor: pointer;
        background: #999494;
    }
`;

export const Users = styled.div`
    position: relative;

    .出品者{
        padding-top: 14px;
        padding-bottom: 10px;
        font-weight: 700;
        font-size: 20px;
        color: #666666;
    }
    .box{
        position: relative;
        padding: 10px;
        border-radius: 5px;
        border-top: 1px #e5e5e5 solid;
        border-bottom: 1px #e5e5e5 solid;
        &:hover{
            cursor: pointer;
            background: #e5e5e5;
        }
        .avatar{
            position: absolute;
            margin-top: 10px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
         }
        .UserName{
            font-size: 20px;
            font-weight: bold;
            margin-left: 70px;
        }
        .StarComponent{
            display: flex;
            margin-left: 70px;
        }
        .StarComponent ul{
            display: flex;
            font-size: 14px;
        }
        .StarComponent span{
            color: #0073cc;
         }
        .check{
            font-size: 16px;
            margin-left: 70px;
         }
    }
`;
export const Delivery = styled.div`
    position: relative;
    margin-top: 20px;
    border-radius: 4px;
    padding: 10px;
    background: #d3e9f6;
    font-size: 16px;
    div {
        span {
            margin-left: 4px;
            font-weight: bold;
        }
    }
    .arrow {
        position: absolute;
        top: 25%;
        right: 0;
    }
    &:hover {
        cursor: pointer;
        background: #95d8f3;
    }

`;

export const Comment = styled.div`
    h2{
        padding-top: 14px;
        padding-bottom: 10px;
        font-weight: 700;
        font-size: 20px;
        color: #666666;
    }
    button{
        background-color: white;
        display: flex;
        margin-top: 10px;
        border: solid 1px red;
        width: 100%;
        height: 45px;
        border-radius: 4px;
        font-size: 15px;
        color: red;
        font-weight: bold;
        align-items: center;
        justify-content: center;
        img {
            margin-left: 5px;
        }
         &:hover {
            cursor: pointer;
            background-color: #ead8dd;
        }
    }
`;
