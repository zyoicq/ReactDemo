import Immutable from 'immutable';
import { SELECTED_ADD_ITEM, SELECTED_DEL_ITEM } from '../constants/actionTypes'

const initialSelectedItems = Immutable.List([]);

export default function selectedItemsReducer(state = initialSelectedItems, action) {
    switch(action.type) {
        case SELECTED_ADD_ITEM:
            return state.push(action.item);
        case SELECTED_DEL_ITEM:
            return state.delete(state.indexOf(action.item),1);
        default:
            return state;
    }
}
