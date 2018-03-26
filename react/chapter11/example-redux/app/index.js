import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import rootReducer from './reducers';

const store = createStore(rootReducer);

render(
    <div>
        <Provider store={store}>
            <App/>
        </Provider>        
    </div>,
    document.getElementById('app')
);
