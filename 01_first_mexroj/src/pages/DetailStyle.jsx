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
    height: 1000px;
    border: 2px solid black;
    padding: 10px;
    .title {
        font-size: 24px;
        font-weight: 700;
    }
    .brand {
        font-size: 15px;
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
        .thanks {
            margin-top: 10px;
            font-size: 15px;
            color: #666666;
            line-height: 21px;
        }

        .info {
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
    }
`;

export const IconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background: green;
`;

export const AuthorContainer = styled.div`
    position: relative;
    margin-top: 20px;
    border-radius: 4px;
    padding: 10px;
    background: #f5f5f5;
    font-size: 12px;
`;
