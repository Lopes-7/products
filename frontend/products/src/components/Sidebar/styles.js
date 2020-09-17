import styled from 'styled-components';

export const Container = styled.div`
    background: #f4980c;
    height: 100vh;
    padding: 15px;
    width: 20%;

    .row {
        margin-top: 20px;
    }

    h1 {
        margin-bottom: 30px;
        margin-top: 30px;
        font-size: 16px;
    }

    @media (max-width: 770px) {
        height: 80vh;
        padding: 5px;
        width: 100%;

        .row {
            margin-top: 5px;
        }

        h1 {
            margin-bottom: 10px;
            margin-top: 10px;
        }
    }
`;
