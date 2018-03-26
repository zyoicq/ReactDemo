// need "commonUtils.js", /commons/react/react.min.js, /commons/react/react-dom-min.js
var GridComponent = React.createClass({
    sortDataFunc: function () {
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
    loadData: function() {
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
            columns: [{key:'userName',label:'姓名',type:'String'}, {key:'userAccount',label:'账号',type:'String'}],
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
                columns: [{key:'userName',label:'姓名',type:'String'}, {key:'userAccount',label:'账号',type:'String'}],
                items: [],
                paginate: {
                    pageNum: 1,
                    pageSize: 10,
                    pages:  Math.ceil(all_items.length/10),
                    offset: 0,
                    total: all_items.length,
                    col_name: "userName",
                    direction: "asc"
                }
            }
        };
    },

    componentDidMount: function () {
        this.sortDataFunc();
        this.loadData();
    },

    getFirst: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: 1 })});
        this.loadData();
    },

    getPrev: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: this.state.paginate.pageNum - 1 })});
        this.loadData();
    },

    getNext: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: this.state.paginate.pageNum + 1 })});
        this.loadData();
    },

    getLast: function() {
        this.setState({paginate: $.extend(this.state.paginate, { pageNum: this.state.paginate.pages })});
        this.loadData();
    },

    changeRowCount: function(e) {
        var el = e.target;

        this.setState({paginate: $.extend(this.state.paginate, { pageSize: el.options[el.selectedIndex].value })});
        this.loadData();
    },

    sortData: function (e) {
        e.preventDefault();
        var el = e.currentTarget,
            col_name = el.getAttribute("data-column"),
            previousDirection = el.getAttribute("data-direction");
        var direction = (previousDirection === "desc") ? "asc" : "desc";
        console.log(previousDirection,el);
        this.setState({paginate: $.extend(this.state.paginate, { col_name: col_name, direction: direction })});
        this.sortDataFunc();
        this.loadData();
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
    renderCell: function(column, value) {
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
    },
    
    render: function () {
        return (<td>{this.renderCell(this.props.column, this.props.value)}</td>);
    }
});

ReactDOM.render(
    <GridComponent url="http://127.0.0.1:8082/platform/portal/getTable.do"/>,
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