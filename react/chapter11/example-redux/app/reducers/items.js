import Immutable from 'immutable';
import { ADD_ITEM, DELETE_ITEM, DELETE_ALL } from '../constants/actionTypes';

const initialItems = Immutable.List([
    {name:'张三', gender:'男'},
    {name:'李萍', gender:'女'},
    {name:'王五', gender:'男'},
    {name:'钱六', gender:'男'}
]);

export default function itemsReducer(state = initialItems, action) {
    switch(action.type) {
        case ADD_ITEM:
            //执行添加项的任务。
            return state.push(action.item);
        case DELETE_ITEM:
            //执行删除项的任务。
            return state.delete(state.indexOf(action.item),1);
        case DELETE_ALL:
            return state.clear();
        default:
            return state
    }
}
