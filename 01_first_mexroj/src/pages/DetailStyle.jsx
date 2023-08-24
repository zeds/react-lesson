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