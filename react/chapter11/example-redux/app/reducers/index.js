import { combineReducers } from 'redux'
import itemsReducer from './items'
import selectedItemsReducer from './selectedItems'

const rootReducer = combineReducers({
    items: itemsReducer,
    selectedItems: selectedItemsReducer
})

export default rootReducer
