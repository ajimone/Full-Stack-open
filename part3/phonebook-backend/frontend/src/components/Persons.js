const Persons = (props) => {
    return (
        <div>{props.name} {props.number} <button onClick={() => props.deletePeople(props.divnum,props.name )}>delete</button> </div>
    )
}

export default Persons