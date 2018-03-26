import React from 'react';

class UserList extends React.Component {
    render() {
        let items = this.props.items;

        return (
            <ul>
                {items.map(v => <LiItem item={v} key={v.name} onCheck={this.props.selectItem} />)}
            </ul>
        )
    }
}

class LiItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleChange = this.handleChange.bind(this);
        this.state = {checked: false};
    }
  
    handleChange(event) {
        var checked = event.target.checked;
        this.setState({checked:checked});
        
        if (this.props.onCheck) {
            this.props.onCheck({item:this.props.item, checked:checked});
        }
    }
    
    render() {
        return (
            <li>
                <input type="checkbox" checked={this.state.checked} onChange={this.handleChange}/>
                <span style={{marginRight: '4px'}}>{this.props.item.name} ({this.props.item.gender})</span>
            </li>
        )
    }
}

export default UserList;
