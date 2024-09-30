import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';

interface Props {
  children: React.ReactNode;
}

function ReduxProvider({children}: Props) {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate> */}
      {children}
    </Provider>
  );
}

export default ReduxProvider;
