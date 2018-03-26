import React from 'react';
import ImmutableRenderMixin from 'react-immutable-render-mixin';

let SelNames = React.createClass({
    mixins: [ImmutableRenderMixin],
    
    buildNames(items) {
        let result = "";
        if (items && items.length > 0) {
            result = items[0].name;
            for (let i=1; i < items.length; i++) {
                result = result + "," + items[i].name;
            }
        }
        return result;
    },
    
    render() {
        let selItems = this.props.selItems;
        let selNames = this.buildNames(selItems);
        
        return (
            <div className="pure-form">
                <input type="text" value={selNames}/>
            </div>
        )
    }
});

export default SelNames;
