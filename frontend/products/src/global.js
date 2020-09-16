/**
 * IMPORTS
 */
import {createGlobalStyle} from 'styled-components';

/**
 * EXPORTS
 */
export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
    }
    
    .app {
        display: flex;

        @media (max-width: 767px) {
            display: block;
        }
    }

    body {
        font-size: 14px;
        background: white;
        color: #333;
        -webkit-font-smoothing: antialiased !important;
    }
`;
