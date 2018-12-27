import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css"

class TodoList extends Component {
    constructor(props){
        super(props);

        this.state={
            items:[],
            isLogin:false
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);  
        this.editItem = this.editItem.bind(this);  
    }

    loginFunc(e, username, password){
        e.preventDefault();
        console.log("loginFunc invoked")
        console.log("username: ", username)
        console.log("password: ", password)
        if(username === 'aldi' && password === 'aldi')
            this.setState({
                isLogin:true
            });

            console.log("isLogin: ", this.state.isLogin)
    }

    renderLogin(){
        let username ='';
        let password ='';
        return(
            <div className="login">
                <form>
                    <label className="label"> Username </label>
                    <input className="input" onChange={(t) => username = t.target.value} 
                        placeholder="Username">
                    </input>
                    <label className="label"> Pasword </label>
                    <input className="input" onChange={(t) => password = t.target.value} 
                        placeholder="Password">
                    </input>
                    <button className="pencet" onClick={e => this.loginFunc(e, username, password)}>Login</button>
                </form>
            </div> 
        );
    }
    
    addItem(e){
        let array_Terakhir = this.state.items[0].id 
        // console.log("terakhir", array_Terakhir);

        if(this._inputElement.value !==""){
            var newItem ={
            title: this._inputElement.value,
            id: array_Terakhir + 1
            };

            this.setState((prevState) => {
                return{
                    items:prevState.items.reverse().concat(newItem)
                };
            });
        }

        this._inputElement.value = "";

        // console.log(this.state.items);

        e.preventDefault();
    }

    deleteItem(id){
        // console.log("id in deleteItem:" + id);
        // console.log("Items at delete: " + this.state.items);

        var filteredItems = this.state.items.filter(function(item){
            return(item.id !== id)
        });

        this.setState({
            items: filteredItems.reverse()
        });
    }

    editItem(e, id){
        var filteredItems = this.state.items.filter(function(item){
            return(item.id !== id)
        });
    }

    async ambilData(){
        await fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(json => {
            console.log(json)
            this.setState({
                items:json
            });
        })   
    }

    componentDidMount(){
        this.ambilData()
    }

    renderTodo() {
        return(
            <div className="TodoListMain">
                    <div className="header">
                        <form onSubmit={this.addItem}>
                            <input ref={(a) => this._inputElement = a} 
                                placeholder="Enter Task">
                            </input>
                            <button className="submit" type="submit" >add</button>
                        </form> 
                    </div>
                    <div className="header">
                        <form>
                            <TodoItems entries={this.state.items}
                                delete={this.deleteItem}
                                edit={this.editItem()}  
                            />
                        </form>
                    </div>
                </div>
        )
    }
    render (){
        const {isEditing} = this.state;
        return( 
            <div>
                { this.state.isLogin ? this.renderTodo() : this.renderLogin() }
                {console.log(this.state.isLogin)}
            </div>
        );
    }
}

export default TodoList;