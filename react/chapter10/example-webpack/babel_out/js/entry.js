'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//var React = require('./react.js');
//var ReactDOM = require('./react.dom.js');

//export var MyForm = React.createClass({
var MyForm = _react2.default.createClass({
    displayName: 'MyForm',

    getInitialState: function getInitialState() {
        return {
            username: '',
            gender: 'man',
            checked: true
        };
    },
    handleChange: function handleChange(event) {
        var newState = {};
        newState[event.target.name] = event.target.name == "checked" ? event.target.checked : event.target.value;
        this.setState(newState);
    },
    submitHandler: function submitHandler(e) {
        e.preventDefault();
        console.log(this.state);
        alert("在控制台中查看结果");
    },
    render: function render() {
        return _react2.default.createElement(
            'form',
            { onSubmit: this.submitHandler },
            _react2.default.createElement(
                'label',
                { htmlFor: 'username' },
                '请输入用户名'
            ),
            _react2.default.createElement('input', { type: 'text', name: 'username', onChange: this.handleChange, value: this.state.username, id: 'username' }),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'select',
                { name: 'gender', onChange: this.handleChange, value: this.state.gender },
                _react2.default.createElement(
                    'option',
                    { value: 'man' },
                    '男'
                ),
                _react2.default.createElement(
                    'option',
                    { value: 'woman' },
                    '女'
                )
            ),
            _react2.default.createElement('br', null),
            _react2.default.createElement(
                'label',
                { htmlFor: 'checkbox' },
                '这里是检查框'
            ),
            _react2.default.createElement('input', { type: 'checkbox', value: '检查框结果为真', checked: this.state.checked, onChange: this.handleChange, name: 'checked', id: 'checkbox' }),
            _react2.default.createElement(
                'button',
                { type: 'submit' },
                '提交'
            )
        );
    }
});

_reactDom2.default.render(_react2.default.createElement(MyForm, null), document.getElementById('reactContainer'));