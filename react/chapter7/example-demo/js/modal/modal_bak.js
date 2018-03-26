/**
 * Created by bruce on 16/8/24.
 */
var ModalComponent = React.createClass({
    // childContextTypes: {
    //         $bs_modal: React.PropTypes.shape({
    //             onHide: React.PropTypes.func,
    //         })
    // },
    // getChildContext: function() {
    //     return {
    //         $bs_modal: {
    //             onHide: this.props.onHide,
    //         },
    //     };
    // },
    handleDialogClick: function(e) {
        if (e.target !== e.currentTarget) {
            return;
        }

        this.props.onHide();
    },

    componentDidMount: function() {
        this._renderOverlay();
    },

    componentDidUpdate: function() {
        this._renderOverlay();
    },

    componentWillUnmount: function() {
        this._unrenderOverlay();
        this._unmountOverlayTarget();
    },

    _mountOverlayTarget: function() {
        if (!this._overlayTarget) {
            this._overlayTarget = document.createElement('div');
            this._portalContainerNode = document.getElementsByTagName("body")[0];
            this._portalContainerNode.appendChild(this._overlayTarget);
        }
    },

    _unmountOverlayTarget: function() {
        if (this._overlayTarget) {
            this._portalContainerNode.removeChild(this._overlayTarget);
            this._overlayTarget = null;
        }
        this._portalContainerNode = null;
    },
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
            // Unrender if the component is null for transitions to null
            this._unrenderOverlay();
            this._unmountOverlayTarget();
        }
    },

    _unrenderOverlay: function() {
        if (this._overlayTarget) {
            ReactDOM.unmountComponentAtNode(this._overlayTarget);
            this._overlayInstance = null;
        }
    },

    render: function() {
        return null;
    },

    getMountNode: function(){
        return this._overlayTarget;
    },

    getOverlayDOMNode: function() {
        if (!this.isMounted()) {
            throw new Error('getOverlayDOMNode(): A component must be mounted to have a DOM node.');
        }

        if (this._overlayInstance) {
            if (this._overlayInstance.getWrappedDOMNode) {
                return this._overlayInstance.getWrappedDOMNode();
            } else {
                return ReactDOM.findDOMNode(this._overlayInstance);
            }
        }

        return null;
    }
});
ModalComponent.Header = React.createClass({
    // contextTypes: {
    //     $bs_modal: React.PropTypes.shape({
    //         onHide: React.PropTypes.func,
    //     })
    // },

    render: function () {
        const {
            'aria-label': label,
            closeButton,
            children,
            onHide
        } = this.props;
        // const modal = this.context.$bs_modal;
        // console.info(this.context);

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
ModalComponent.Body = React.createClass({
    render: function () {
        return (
            <div className="modal-body">
                {this.props.children}
            </div>
        );
    }
});
ModalComponent.Footer = React.createClass({
    render: function () {
        return (
            <div className="modal-footer">
                {this.props.children}
            </div>
        );
    }
});
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

// function handleClick() {
    ReactDOM.render(
        <MyModal ariaLabelledby="modal-label"/>,
        document.getElementById("modal-component")
    );
// }
// module.exports = handleClick;
// var Modal = ReactBootstrap.Modal;
// var MyModal = React.createClass({
//     getInitialState: function () {
//         return {showModal: true};
//     },
//     handleBackdropClick: function () {
//         this.setState({showModal: false});
//     },
//     render: function () {
//         return (
//             <Modal
//                 show={this.state.showModal}
//                 onHide={this.handleBackdropClick}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>推荐页面</Modal.Title>
//                 </Modal.Header>
//             </Modal>
//         );
//     }
// });
//
//
// ReactDOM.render(
//     <MyModal >
//     </MyModal>,
//     document.getElementById("modal-component")
// );
//
//
// ReactDOM.render(
//     <ModalComponent ariaLabelledby="modal-label">
//         <div className="modal-header">
//             <button type="button" className="close" aria-label="Close"><span aria-hidden="true">×</span></button>
//             <h4 id="cmodal-label" className="modal-title">Modal heading</h4>
//         </div>
//     </ModalComponent>,
//     document.getElementById("modal-component")
// );

