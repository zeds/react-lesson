import React from "react";
import styled from "styled-components";

const Button = styled.button`
    background: transparent;
    border-radius: 3px;
    border: 2px solid #bf4f74;
    color: #bf4f74;
    margin: 0 1em;
    padding: 0.25em 1em;
`;

const Styled = () => {
    return (
        <div>
            <Button>押して！</Button>
        </div>
    );
};

export default Styled;