// import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { App } from './components/App/App';
// import './index.css';

// const root = createRoot(document.getElementById('root'));

// root.render(
//   <Provider store={store}>
//       <App />
//   </Provider>
// );

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import { App } from 'components/App/App';
import { Loader } from 'components/Loader/Loader';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/goit-react-hw-08-phonebook">
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loader />}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
