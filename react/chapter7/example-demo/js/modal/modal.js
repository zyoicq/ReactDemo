/**
 * Created by bruce on 16/8/24.
 */
var ModalComponent = React.createClass({
    //限定各属性的类型
    propTypes:{
        show: React.PropTypes.string,
        onHide: React.PropTypes.func.isRequired,
        ariaLabelledby: React.PropTypes.string,
    },
    handleDialogClick: function(e) {
        //当鼠标点击目标是事件绑定元素的子结点时,忽略该点击事件
        if (e.target !== e.currentTarget) {
            return;
        }

        this.props.onHide();
    },
    //组件加载后,进行模态框的渲染
    componentDidMount: function() {
        this._renderOverlay();
    },
    //组件更新后,进行模态框的渲染
    componentDidUpdate: function() {
        this._renderOverlay();
    },
    //组件卸载前,分别从虚拟DOM和真实DOM中移除模态框叠层
    componentWillUnmount: function() {
        this._unrenderOverlay();
        this._unmountOverlayTarget();
    },
    //在真实DOM的body元素内部的末尾插入模态框叠层
    _mountOverlayTarget: function() {
        if (!this._overlayTarget) {
            this._overlayTarget = document.createElement('div');
            this._portalContainerNode = document.getElementsByTagName("body")[0];
            this._portalContainerNode.appendChild(this._overlayTarget);
        }
    },
    //在真实DOM中移除模态框叠层
    _unmountOverlayTarget: function() {
        if (this._overlayTarget) {
            this._portalContainerNode.removeChild(this._overlayTarget);
            this._overlayTarget = null;
        }
        this._portalContainerNode = null;
    },
    //在虚拟DOM中插入模态框叠层及内容
    _renderOverlay: function() {
        var children = this.props.show?(
            <div>
                <div className="modal-backdrop fade in" onClick={this.props.onHide}></div>
                <div className="modal in fade" role="dialog" aria-labelledby={this.props.ariaLabelledby} onClick={this.handleDialogClick}
                     style={{display: 'block', paddingLeft: 0}}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        ):(
            null
        );

        if (children !== null) {
            this._mountOverlayTarget();
            this._overlayInstance = ReactDOM.unstable_renderSubtreeIntoContainer(
                this, children, this._overlayTarget
            );
        } else {
            //在隐藏模态框时,从虚拟DOM和真实DOM中移除模态框叠层
            this._unrenderOverlay();
            this._unmountOverlayTarget();
        }
    },

    //在虚拟DOM中移除模态框叠层
    _unrenderOverlay: function() {
        if (this._overlayTarget) {
            ReactDOM.unmountComponentAtNode(this._overlayTarget);
            this._overlayInstance = null;
        }
    },

    //渲染函数不执行任何动作
    render: function() {
        return null;
    }
});
//模态框顶部组件,含标题和关闭按钮
ModalComponent.Header = React.createClass({
    propTypes:{
        closeButton: React.PropTypes.bool,
        onHide: React.PropTypes.func.isRequired,
    },
    render: function () {
        const {
            'aria-label': label,
            closeButton,
            children,
            onHide
        } = this.props;

        return (
            <div className="modal-header">
                {closeButton &&
                <button
                    type="button"
                    className="close"
                    aria-label={this.props.label}
                    onClick={onHide}
                >
                    <span aria-hidden="true">
                      &times;
                    </span>
                </button>
                }

                {children}
            </div>
        );
    }
});
//模态框标题组件
ModalComponent.Title = React.createClass({
    render: function () {
        return (
            <h4
                id={this.props.id}
                className="modal-title"
            >
                {this.props.children}
            </h4>
        );
    }
});
//模态框体部组件
ModalComponent.Body = React.createClass({
    render: function () {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
});
//模态框底部组件
ModalComponent.Footer = React.createClass({
    render: function () {
        return (
            <div className="modal-footer">
                {this.props.children}
            </div>
        );
    }
});
//一个完整的示例模态框组件
var MyModal = React.createClass({
    getInitialState: function () {
        return {showModal: false};
    },
    onClose: function () {
        this.setState({showModal: false});
    },
    onOpen: function () {
        this.setState({showModal: true});
    },
    render: function () {
        return (
            <div>
                <button className="btn btn-default" onClick={this.onOpen}>弹出模态框</button>
                <ModalComponent show={this.state.showModal} ariaLabelledby={this.props.ariaLabelledby} onHide={this.onClose}>
                    <ModalComponent.Header closeButton aria-label="Close"  onHide={this.onClose}>
                        <ModalComponent.Title id={this.props.ariaLabelledby}>Modal标题</ModalComponent.Title>
                    </ModalComponent.Header>
                    <ModalComponent.Body>
                        Modal内容
                    </ModalComponent.Body>
                    <ModalComponent.Footer>
                        <button type="button" className="btn btn-default" onClick={this.onClose}>关闭</button>
                    </ModalComponent.Footer>
                </ModalComponent>
            </div>
        );
    }
});

ReactDOM.render(
    <MyModal ariaLabelledby="modal-label"/>,
    document.getElementById("modal-component")
);
