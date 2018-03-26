/**
 * Created by bruce on 16/8/22.
 */
var TreeComponent = React.createClass({
    //限定各属性的类型
    propTypes:{
        treeId: React.PropTypes.string.isRequired,
        onClickFunc: React.PropTypes.func,

        //每个结点数据中必须包含id和pId
        nodeList: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.oneOfType([
                    React.PropTypes.string.isRequired,
                    React.PropTypes.number.isRequired,
                ]),
                pId: React.PropTypes.oneOfType([
                    React.PropTypes.string.isRequired,
                    React.PropTypes.number.isRequired,
                ]),
                name: React.PropTypes.string.isRequired,
                open: React.PropTypes.bool
            })
        )
    },

    getDefaultProps: function() {
        return {
            //onClickFunc属性(即,鼠标单击结点事件的处理函数)可以不提供,此时需给一个默认值
            onClickFunc: function () {}
        };
    },
    //根据传入的nodeList属性,构造一个树状的结点结构——nodeList数组
    getInitialState:function () {
        var nodeList = [];
        for(var i=0;i<this.props.nodeList.length;i++){
            var found = false;
            for(var j=0;j<this.props.nodeList.length;j++){
                if(i==j)continue;

                //找到每个结点的父节点并将其放入父节点的结点列表中
                if(this.props.nodeList[i].pId == this.props.nodeList[j].id){
                    found = true;
                    if(!this.props.nodeList[j]["nodeList"])
                        this.props.nodeList[j]["nodeList"]=[this.props.nodeList[i]];
                    else this.props.nodeList[j]["nodeList"].push(this.props.nodeList[i]);
                }
            }
            //找不到父节点的结点即为根节点,放入nodeList数组中,非根节点均存在根节点的子结点列表中
            if(!found){
                nodeList.push(this.props.nodeList[i]);
            }
        }
        //将nodeList数组作为组件状态返回
        return {nodeList:nodeList};
    },
    render: function () {
        return (
            //一个树形组件可视为由多个结点组件的列表构成,每个结点组件则包含开合按钮、图标、名称及其子树组件(仅在当前结点不是叶子结点时有子树组件)
            <ul id={this.props.treeId} className="react_tree">
                {this.state.nodeList.map(function (node, i) {
                    return <NodeComponent key={node.id + "_child_" + i} node={node} treeId={this.props.treeId} onClickFunc={this.props.onClickFunc}/>
                }.bind(this))}
            </ul>
        );
    }
});

var SubtreeComponent = React.createClass({

    render: function () {
        return (
            <ul id={this.props.subtreeId} className="line">
                {this.props.nodeList.map(function (node, i) {
                    return <NodeComponent key={node.id + "_child_" + i} node={node} treeId={this.props.treeId} onClickFunc={this.props.onClickFunc}/>
                }.bind(this))}
            </ul>
        );
    }
});


var NodeComponent = React.createClass({
    getInitialState:function () {
        return {open:this.props.node.open == true};
    },
    openOrClose: function () {
        this.setState({open:!this.state.open});
    },
    //响应鼠标单击结点事件,将调用用户自定义的onClickFunc方法
    onNodeClick: function (event) {
        var treeId = this.props.treeId,
            treeNode = this.props.node;
        //除event外,还将treeId, treeNode两个参数传入onClickFunc方法
        this.props.onClickFunc.call(this, event, treeId, treeNode);
    },
    render: function () {
        var openClass = "center_close", icoClass = "ico_close";
        if(!this.props.node.nodeList || this.props.node.nodeList.length == 0){
            openClass = "center_docu";
            icoClass = "ico_docu";
        }
        else if(this.state.open){
            openClass = "center_open";
            icoClass = "ico_open";
        }
        var idPrefix = this.props.treeId + "_" + this.props.node.id;
        return (
            <li id={idPrefix}>
                <span id={idPrefix + "_switch"} className={"button switch " + openClass} onClick={this.openOrClose}></span>
                <a id={idPrefix + "_a"} onDoubleClick={this.openOrClose} onClick={this.onNodeClick}>
                    <span id={idPrefix + "_ico"} className={"button " + icoClass}></span>
                    <span id={idPrefix + "_span"}>{this.props.node.name}</span>
                </a>
                {(openClass == "center_open")?
                    <SubtreeComponent subtreeId={idPrefix + "_ul"} treeId={this.props.treeId} nodeList={this.props.node.nodeList} onClickFunc={this.props.onClickFunc}/>:
                    ""
                }
            </li>
        );
    }
});

function onClickFunc(event, treeId, treeNode) {
    console.log(event, treeId, treeNode);
}

ReactDOM.render(
    <TreeComponent treeId={"myTree"} nodeList={treeNodes} onClickFunc={onClickFunc}/>,
    document.getElementById("tree-component")
);

