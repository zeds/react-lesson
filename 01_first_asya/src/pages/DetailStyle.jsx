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
    .text {
        margin-top: 10px;
	    font-size: 20px;
	    font-weight: bold;
    }
    .text_comment {
        margin-top: 10px;
	    font-size: 20px;
	    font-weight: bold;
	    color: #666666;
    }
    .desc {
        margin-top: 10px;
        font-size: 10px;
        line-height: 15px;        
        p {
            margin-top: 10px;
        }        
    }
    .login {
        width: 100%;
        height: 45px;
        font-size: 14px;
        text-align: center;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
        border: 1px solid;
        background: #fdfcfc;
        font-weight: bold;
        color: #ff333f;
        border-radius: 4px;
        @media (max-width: 800px) {
            display: none;
        }
        &:hover {
            cursor: pointer;
	        background: #fdf1f3;
        }
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
    
`;

export const AuthorContainer = styled.div`
    margin-top: 10px;
	padding: 10px;
	width: 100%;
	height: 45px;
	border-radius: 4px;
	position: relative;
	text-align: center;
	align-items: center;
	display: flex;
	justify-content: space-between;
	background: #F5F5F5;
    &:hover {
        cursor: pointer;
	    background: #E5E5E5;
    }
    .lock {
        margin-bottom: 4px;
	    display: flex;
	    font-weight: bold;
        p {
            margin-left: 3px;
        }
    }
`;

export const InfoContainer = styled.div`
    div {
        display: flex;            
        gap: 20px;
        align-items: center;
        margin-top: 10px;
        p {
            width: 20%;
        }
        ul {
            width: 50%;
        }
    }
    
    
`;

export const SellerContainer = styled.div`
    display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 10px;
	padding: 10px;
	width: 100%;
	height: 75px;
	border-top: 1px solid #F5F5F5;
	border-bottom: 1px solid #F5F5F5;
    div p {
        width: 20%;
        }
    .div ul {
        width: 50%;
    }
    &:hover {
        cursor: pointer;
	    background: #F5F5F5;
    }
`;

export const AvatarContainer = styled.div`
    display: flex;
	flex-direction: row;
	align-items: center;
`;
export const Avatar = styled.div`
    img {
        border-radius: 50%;
	    width: 50px;
	    height: 50px;
    }
    
`;

export const MamaBox = styled.div`
    padding: 10px;
    .star  {
	    display: flex;
    }
    .checkmarktext {
        display: flex;
        flex-direction: row;
    }
    .count {
        color: skyblue
    }
`;
