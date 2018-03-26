/**
 * Created by bruce on 16/8/24.
 */

var MyModal = React.createClass({
    getInitialState: function () {
        return {showModal: true};
    },
    handleBackdropClick: function () {
        this.setState({showModal: false});
    },
    render: function () {
        return (
            <ModalComponent show={this.state.showModal} ariaLabelledby="modal-label">
                <div className="modal-header">
                    <button type="button" className="close" aria-label="Close" onClick={this.handleBackdropClick}><span aria-hidden="true">×</span></button>
                    <h4 id="cmodal-label" className="modal-title">Modal heading</h4>
                </div>
            </ModalComponent>
        );
    }
});


ReactDOM.render(
    <MyModal />,
    document.getElementById("modal-component")
);

