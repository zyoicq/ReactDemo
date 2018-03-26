// need "commonUtils.js", /commons/react/react.min.js, /commons/react/react-dom-min.js
var GridComponent = React.createClass({
    sortDataFunc: function (all_items) {
        console.info("grid"+all_items);
        //按字符串正向排序
        function ascCompare(propertyName) {
            return function (obj1, obj2) {
                var value1 = obj1[propertyName];
                var value2 = obj2[propertyName];
                if(!value1) return -1;
                if(!value2) return 1;
                if(typeof value1 == 'string')
                    return value1.localeCompare(value2);
                return 0;
            }
        }
        //按字符串逆向排序
        function descCompare(propertyName) {
            return function (obj1, obj2) {
                var value1 = obj1[propertyName];
                var value2 = obj2[propertyName];
                if(!value1) return 1;
                if(!value2) return -1;
                if(typeof value1 == 'string')
                    return -value1.localeCompare(value2);
                return 0;
            }
        }
        if(this.state.data.paginate.direction =='asc')
            all_items.sort(ascCompare(this.state.data.paginate.col_name));
        else
            all_items.sort(descCompare(this.state.data.paginate.col_name));

    },
    loadData: function(all_items) {
        //分页大小是变化的,需要判断当前页面是否超出范围
        var pages = Math.ceil(all_items.length/this.state.data.paginate.pageSize);
        var pageNum = this.state.data.paginate.pageNum;
        if(pageNum > pages)pageNum = pages;

        //计算当前页包含的数据项的起止范围并取出
        var start = (pageNum-1) * this.state.data.paginate.pageSize + this.state.data.paginate.offset;
        var endp = start + parseInt(this.state.data.paginate.pageSize);
        var end = (endp > all_items.length) ? all_items.length : endp;
        var result = all_items.slice(start, end);

        //构造新的组件状态
        var data = {
            columns: [{key:'userName',label:'姓名',type:'String'}, {key:'userAccount',label:'账号',type:'String'},
                {key:'grade',label:'班级',type:'String'}],
            items: result,
            paginate: {
                pageNum: pageNum,
                pageSize: this.state.data.paginate.pageSize,
                pages:  pages,
                offset: 0,
                total: all_items.length,
                col_name: this.state.data.paginate.col_name,
                direction: this.state.data.paginate.direction
            }
        };
        this.setState({paginate: data.paginate});
        this.setState({data: data});
    },

    getInitialState: function () {
        return {
            data: {
                columns: [{key:'userName',label:'姓名',type:'String'}, {key:'userAccount',label:'账号',type:'String'},
                    {key:'grade',label:'班级',type:'String'}],
                items: [],
                paginate: {
                    pageNum: 1,
                    pageSize: 10,
                    pages:  Math.ceil(this.props.all_items.length/10),
                    offset: 0,
                    total: this.props.all_items.length,
                    col_name: "userName",
                    direction: "asc"
                }
            }
        };
    },

    componentDidMount: function () {
        this.sortDataFunc(this.props.all_items);
        this.loadData(this.props.all_items);
    },
    componentWillReceiveProps: function (nextProps) {
        this.sortDataFunc(nextProps.all_items);
        this.loadData(nextProps.all_items);
    },
    componentDidUpdate: function () {
        console.info("componentDidUpdate");
    },

    componentWillUpdate: function () {
        console.info("componentWillUpdate");
    },

    getFirst: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: 1 })});
        this.loadData(this.props.all_items);
    },

    getPrev: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: this.state.paginate.pageNum - 1 })});
        this.loadData(this.props.all_items);
    },

    getNext: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: this.state.paginate.pageNum + 1 })});
        this.loadData(this.props.all_items);
    },

    getLast: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: this.state.paginate.pages })});
        this.loadData(this.props.all_items);
    },

    changeRowCount: function(e) {
        var el = e.target;

        this.setState({paginate: $.extend(this.state.paginate, { pageSize: el.options[el.selectedIndex].value })});
        this.loadData(this.props.all_items);
    },

    sortData: function (e) {
        e.preventDefault();
        var el = e.currentTarget,
            col_name = el.getAttribute("data-column"),
            previousDirection = el.getAttribute("data-direction");
        var direction = (previousDirection === "desc") ? "asc" : "desc";
        console.log(previousDirection,el);
        this.setState({paginate: $.extend(this.state.paginate, { col_name: col_name, direction: direction })});
        this.sortDataFunc(this.props.all_items);
        this.loadData(this.props.all_items);
    },

    render: function () {
        return (
            <table className="table table-striped table-bordered table-hover">
                <Head data={this.state.data} onSort={this.sortData} />
                <Body data={this.state.data} />
                <Foot data={this.state.data} onFirst={this.getFirst} onPrev={this.getPrev} onNext={this.getNext} onLast={this.getLast} onChange={this.changeRowCount} onRefresh={this.loadData}/>
            </table>
        );
    }
});

var Head = React.createClass({
    render: function () {
        return (
            <thead>
            <tr>
                {this.props.data.columns.map(function (column, i) {
                    return <HeadCell key={i} column={column} direction={this.props.data.paginate.direction} onSort={this.props.onSort}
                                     showArrow={this.props.data.paginate.col_name == column.key}/>
                }.bind(this))}
            </tr>
            </thead>
        );
    }
});

var Foot = React.createClass({
    propTypes: {
        onFirst: React.PropTypes.func,
        onPrev: React.PropTypes.func,
        onNext: React.PropTypes.func,
        onLast: React.PropTypes.func,
        onRefresh: React.PropTypes.func,
        onChange: React.PropTypes.func,
        data: React.PropTypes.shape({
            columns: React.PropTypes.array,
            paginate: React.PropTypes.shape({
                pageSize: React.PropTypes.number,
                pageNum: React.PropTypes.number,
                pages: React.PropTypes.number
            })
        })
    },
    render: function () {
        return (
            <tfoot>
            <tr>
                <td colSpan={this.props.data.columns.length}>
                    <div className="pull-left">
                        <Button text="<< 首页" onClick={this.props.onFirst} disabled={this.props.data.paginate.pageNum === 1} />
                        <Button text="< 上一页" onClick={this.props.onPrev} disabled={this.props.data.paginate.pageNum === 1} />
                        <Button text="下一页 >" onClick={this.props.onNext} disabled={this.props.data.paginate.pageNum === this.props.data.paginate.pages} />
                        <Button text="尾页 >>" onClick={this.props.onLast} disabled={this.props.data.paginate.pageNum === this.props.data.paginate.pages} />
                        <Button text="刷新" onClick={this.props.onRefresh} disabled={false} />
                    </div>
                    <div className="pull-left" style={{marginLeft:'30px'}}>
                        <span>每页</span>
                        <select onChange={this.props.onChange} value={this.props.data.paginate.pageSize}
                                className="page-number-select" name="pageSize">
                            <Option value="5" />
                            <Option value="10" />
                        </select>
                        <span>行</span>
                    </div>
                    <div className="pull-right">
                            <span className="footer-style">第{this.props.data.paginate.pageNum}页(共
                                {this.props.data.paginate.pages}页)</span>
                    </div>
                </td>
            </tr>
            </tfoot>
        );
    }
});

var Button = React.createClass({
    propTypes: {
        disabled: React.PropTypes.bool
    },
    render: function () {
        console.log("render button onClick=" + this.props.onClick);
        return (
            <button type="button" className="btn btn-default" onClick={this.props.onClick} disabled={this.props.disabled}>
                {this.props.text}
            </button>
        );
    }
});

var Option = React.createClass({
    render: function () {
        return (<option value={this.props.value}>{this.props.value}</option>);
    }
});

var Body = React.createClass({
    render: function () {
        return (
            <tbody>
            {this.props.data.items.map(function(item, i) {
                return <Row key={i} item={item} columns={this.props.data.columns} />
            }.bind(this))}
            </tbody>
        );
    }
});

var Row = React.createClass({
    render: function () {
        return (
            <tr>
                {this.props.columns.map(function (column, i) {
                    return <Cell key={i} column={column} value={this.props.item[column.key]} />
                }.bind(this))}
            </tr>
        );
    }
});

var HeadCell = React.createClass({
    propTypes: {
        showArrow: React.PropTypes.bool
    },
    render: function () {
        var arrow =  "glyphicon-arrow-up";
        if(this.props.direction === "desc" ){
            arrow =  "glyphicon-arrow-down";
        }
        var iDom = (this.props.showArrow)? (<i className={"glyphicon "+ arrow}/>):null;
        return (
            <th>
                <a href="#" data-column={this.props.column.key} data-direction={this.props.direction === "desc" ? "desc" : "asc"}
                   role="button" tabIndex="0" onClick={this.props.onSort}>
                    {this.props.column.label}
                    {iDom}
                </a>
            </th>
        );
    }
});

var Cell = React.createClass({
    render: function () {
        return (<td>{Draw(this.props.column, this.props.value)}</td>);
    }
});

var Draw = function (column, value) {
    switch (column.type) {
        case 'Number':
            return value;
            break;
        case 'String':
            return value;
            break;
        case 'Image':
            return React.createElement('img', {src: value}, null);
            break;
    }
};
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
                    return <NodeComponent key={node.id + "_child_" + i} node={node} treeId={this.props.treeId} treeLevel="0" onClickFunc={this.props.onClickFunc}/>
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
                    return <NodeComponent key={node.id + "_child_" + i} node={node} treeId={this.props.treeId} treeLevel={this.props.treeLevel} onClickFunc={this.props.onClickFunc}/>
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
        treeNode['level']=this.props.treeLevel;
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
        var treeLevel = this.props.treeLevel*1 + 1;
        var idPrefix = this.props.treeId + "_" + this.props.node.id;
        return (
            <li id={idPrefix}>
                <span id={idPrefix + "_switch"} className={"button switch " + openClass} onClick={this.openOrClose}></span>
                <a id={idPrefix + "_a"} onDoubleClick={this.openOrClose} onClick={this.onNodeClick}>
                    <span id={idPrefix + "_ico"} className={"button " + icoClass}></span>
                    <span id={idPrefix + "_span"}>{this.props.node.name}</span>
                </a>
                {(openClass == "center_open")?
                    <SubtreeComponent subtreeId={idPrefix + "_ul"} treeId={this.props.treeId} treeLevel={treeLevel} nodeList={this.props.node.nodeList} onClickFunc={this.props.onClickFunc}/>:
                    ""
                }
            </li>
        );
    }
});

var AppComponent = React.createClass({
    getInitialState:function () {
        return {items:all_items};
    },
    onClickFunc: function (event, treeId, treeNode) {

        if(treeNode.level == 0){
            this.setState({items: all_items});
        }
        else if(treeNode.level == 1){
            var items = findByNameLike(all_items, treeNode.name);
            this.setState({items: items});

        }
        else{
            items = findByName(all_items, treeNode.name);
            this.setState({items: items});
        }
        function findByName(objList,name) {
            var rtnList = [];
            for(var i = 0; i< objList.length; i++){
                if(objList[i]['grade'] == name){
                    rtnList.push(objList[i]);
                }
            }
            return rtnList;
        }
        function findByNameLike(objList,name) {
            var rtnList = [];
            for(var i = 0; i< objList.length; i++){
                if(objList[i]['grade'].indexOf(name) >= 0){
                    rtnList.push(objList[i]);
                }
            }
            return rtnList;
        }
    },
    render: function () {
        return (
            <div>
                <div className="pull-left">
                    <TreeComponent treeId={"myTree"} nodeList={this.props.treeNodes} onClickFunc={this.onClickFunc}/>
                </div>
                <div className="right-part">
                    <GridComponent all_items={this.state.items} url="http://127.0.0.1:8082/platform/portal/getTable.do"/>
                </div>


            </div>
        );
    }
});


ReactDOM.render(
    <AppComponent treeNodes={treeNodes}/>,
    document.getElementById("grid-component")
);

//ReactDOM.render(
//    <GridComponent/>,
//    document.getElementById('mycontent')
//);

//$(function(){
//    var menuTreeComponentFactory = React.createFactory(menuTreeComponent);
//    ReactDOM.render(
//        menuTreeComponentFactory({elapsed:1000}), document.getElementById('testReact')
//    );
//});