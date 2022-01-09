const Reminder = ({reminder, handleDelete}) => {
    return(
        <div>
              {reminder.name}{reminder.time}<button onClick={() => handleDelete(reminder.id)}>Delete</button>
        </div>
    )
}

export default Reminder