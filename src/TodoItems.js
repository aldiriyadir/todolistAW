import React, { Component } from "react";
import FlipMove from "react-flip-move";

class TodoItems extends Component{
    constructor(props){
        super(props);

        this.state={
            isEditing:false
        };

        this.createTasks = this.createTasks.bind(this);
        this.renderForm = this.renderForm.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.editItem = this.editItem.bind(this);
    }

    createTasks(item){
        return <form onClick ={() => this.delete(item.id)}
            key={item.id}> 
            <p className="title">{item.title}</p> 
            <button onClick={(id)=> this.editItem(item.id)} > Edit </button> 
            </form>
    }

    delete(id){
        // console.log("key is: " + id);
        this.props.delete(id);
    }

    renderForm(){
        return (
            <form>
                <input type="text"/>
                <button type="submit"> Edit </button> 
            </form>
        )
    }

    renderItem(listItems){
        return(
            <ul className="theList"> 
            <FlipMove duration={300} easing="ease-out">
                {listItems}
            </FlipMove>
            </ul>
        )
    }
    
    editItem(id){
        const{isEditing} = this.state;
        this.setState({
            isEditing:!isEditing
        })
    }

    componentDidMount(){
        // console.log("props", this.props)
    }

    componentDidUpdate(){
        // console.log("props", this.props)
    }
    
    render(){
        var TodoEntries = this.props.entries;
        var listItems = TodoEntries.reverse().map(this.createTasks);
        const {isEditing} = this.state;

        return(
            <section>{
                isEditing ? this.renderForm() : this.renderItem(listItems)
            }
            </section>
        );
    }
}

export default TodoItems;