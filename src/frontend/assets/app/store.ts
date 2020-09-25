import reducer from './state';
import { createStore, compose } from 'redux';
import { IExtendable } from '../../../shared/interfaces/common/IExtendable';

export const store = createStore(reducer, compose(
    (window as IExtendable).__REDUX_DEVTOOLS_EXTENSION__ && (window as IExtendable).__REDUX_DEVTOOLS_EXTENSION__()
));