const PersonForm = (props) => {
    return (
        <form onSubmit={props.addPeople}>
            <div>
                name: <input
                    value={props.newName}
                    onChange={props.handleChange} />
            </div>

            <div>
                number: <input
                    value={props.newNumber}
                    onChange={props.handleNumChange} />
            </div>

            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm