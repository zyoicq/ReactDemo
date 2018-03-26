import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ImmutableRenderMixin from 'react-immutable-render-mixin';
import * as ItemsActions from '../actions';
import SelNames from '../components/selNames';
import UserList from '../components/userList';

let App = React.createClass({
    mixins: [ImmutableRenderMixin],
    propTypes: {
        items: React.PropTypes.object,
        selectedItems: React.PropTypes.object
    },
    render() {
        const actions = this.props.actions;
        const items = this.props.items;
        const selectedItems = this.props.selectedItems.toArray();

        return (
            <div>
                <h2>已选择的项：</h2>
                <SelNames selItems={selectedItems}/>            
                <UserList items={items} selectItem={actions.selectItem}/>
            </div>
        )
    }
})

export default connect(state => ({
    items: state.items,
    selectedItems: state.selectedItems
}), dispatch => ({
    actions: bindActionCreators(ItemsActions, dispatch)
}))(App)
