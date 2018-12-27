import React, { Component } from "react";
import TodoItems from "./TodoItems";
import "./TodoList.css"

class TodoList extends Component {
    constructor(props){
        super(props);

        this.state={
            items:[]
            // isEditing:false
        };

        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);  
        this.editItem = this.editItem.bind(this);  
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

    editItem(id){
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

    render (){
        const {isEditing} = this.state;
        return(
            <div className="TodoListMain">
                <div className="header">
                    <form onSubmit={this.addItem}>
                        <input ref={(a) => this._inputElement = a} 
                            placeholder="Enter Task">
                        </input>
                        <button className="submit" type="submit">add</button>
                    </form> 
                </div>
                <div className="header">
                    <form>
                        <TodoItems entries={this.state.items}
                            delete={this.deleteItem}
                            edit={this.editItem}  
                        />
                    </form>
                </div>
            </div>
        );
    }
}

export default TodoList;