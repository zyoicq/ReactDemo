var MyForm = React.createClass({
    getInitialState:function(){
        return {
            username:'',
            gender:'man',
            checked:true
        };
    },
    handleChange:function(event){
        var newState={};
        newState[event.target.name]=event.target.name=="checked"?event.target.checked:event.target.value;
        this.setState(newState);
    },
    submitHandler:function (e) {
        e.preventDefault();
        alert("在控制台中查看结果");
    },
    render:function () {
        return <form onSubmit={this.submitHandler}>
            <label htmlFor="username">请输入用户名</label>
            <input type="text" name="username" onChange={this.handleChange} value={this.state.username} id="username"/>
            <br/>
            <select name="gender" onChange={this.handleChange} value={this.state.gender}>
                <option value="man">男</option>
                <option value="woman">女</option>
            </select>
            <br/>
            <label htmlFor="checkbox">这里是检查框</label>
            <input type="checkbox" value="检查框结果为真" checked={this.state.checked} onChange={this.handleChange} name="checked" id="checkbox"/>
            <button type="submit">提交</button>
        </form>
    }
});

ReactDOM.render(
  <MyForm/>, 
  document.getElementById('reactContainer')
);