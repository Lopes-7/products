/**
 * IMPORTS
 */
const express = require('express');
const cors = require('cors');

/**
 * CODE
 */

// App Controler class
class AppController {
    constructor() {
        this.express = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
    }

    routes() {
        this.express.use(require('./routes'));
    }
}

/**
 * EXPORTS
 */
module.exports = new AppController().express;
