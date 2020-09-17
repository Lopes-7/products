/**
 * IMPORTS
 */
import axios from 'axios';

/**
 * CODE
 */
const api = axios.create({
    baseURL: 'http://localhost:3001',
});

/**
 * EXPORTS
 */
export {api};
