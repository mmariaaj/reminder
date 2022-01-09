import React from "react"
import Reminder from "./Reminder.js"

const List = ({reminders, handleDelete}) =>{
    setTimeout(() => console.log('Timeout over'), 1000)
    console.log('Reminders in list: ', reminders)
    console.log(typeof reminders)
    return(
            <>
                {
                    reminders.length > 0 &&
                        <div>
                            {reminders.map((reminder) => (
                                <li key={reminder.id} style={{listStyleType: 'none' }}>
                                    <Reminder reminder={reminder} handleDelete={handleDelete}/>
                                </li>
                            ))}
                        </div>
                }
            </>
    )
}

export default List