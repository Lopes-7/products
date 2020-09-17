/**
 * IMPORTS
 */
import React from 'react';
import {Provider} from 'react-redux';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import GlobalStyle from './global';
import {store} from './store';

/**
 * CODE
 */
function App() {
    return (
        <div className="app">
            <Provider store={store}>
                <Sidebar />
                <Display />
                <GlobalStyle />
            </Provider>
        </div>
    );
}

/**
 * EXPORTS
 */
export default App;
