import { ADD_ITEM, DELETE_ITEM, DELETE_ALL, SELECTED_ADD_ITEM, SELECTED_DEL_ITEM } from '../constants/actionTypes'

export function addItem() {
    return {type: ADD_ITEM};
}

export function deleteItem(item) {
    return {
        type: DELETE_ITEM,
        item
    }
}

export function deleteAll() {
    return {
        type: DELETE_ALL
    }
}

export function selectItem(info) {
    if (info.checked) {
        return {
            type: SELECTED_ADD_ITEM,
            item: info.item
        }
    } else {
        return {
            type: SELECTED_DEL_ITEM,
            item: info.item
        }
    }
}
