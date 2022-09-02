const Task = (props) => {
    return (
    <div>
        <input 
            onChange={(event) =>{props.handleToggleComplete(props.index);}} 
            type="checkbox" 
            checked={props.task.complete}
        />
        <span 
            className={props.taskStyles.join(" ")}>{props.task.text}</span>

        <button 
            onClick={(event) => {props.handleDelete(props.index);}}>Delete</button>
    </div>
    )
}

export default Task