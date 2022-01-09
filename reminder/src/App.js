import React,{useEffect,useState} from 'react';
import axios from 'axios'

import List from './components/List'


const App =()=>{

    const [newReminder, setNewReminder] = useState('New Reminder')
    const [newTime, setNewTime] = useState('')
    const [reminders, setReminders] = useState([])

    useEffect( ()=>{
        axios.get("http://localhost:3001/api/reminders")
            .then(response => {
                const res = response.data.reminders
                console.log('Effect: ', res)
                setReminders(res)
            }).catch(error => console.log(error.text))
    }, [])


    const addReminder = (event) => {
        event.preventDefault()
        const reminderObject = {
            name: newReminder,
            timestamp: new Date().toISOString()
        }

        axios.post("http://localhost:3001/api/reminders", reminderObject)
            .then(response => {
                if(!reminders.some(reminder => reminder.name === reminderObject.name)) {
                    setReminders(reminders.concat(reminderObject))
                }
                else {
                    alert('REMINDER ALREADY EXISTS')
                }
            })
    }

    const handleDelete = id =>{
        if(window.confirm('You are deleting reminder. Are you sure?' )) {
            axios.delete('http://localhost:3001/api/reminders/'+id)
                .then(
                    window.location.reload()
                )
        }
    }

    const handleReminderChange = (event) =>{
        setNewReminder(event.target.value)
    }

    const handleTimeChange = (event) =>{
        setNewTime(event.target.value)
    }

    return (
        <div>
            <h2>Reminders</h2>
            <form onSubmit={addReminder}>
                <div>
                    Name: <input value={newReminder} onChange={handleReminderChange} style={{width: "300px"}}/>
                </div>
                <div>
                    Time: <input value={newTime} onChange={handleTimeChange} style={{width: "300px"}}/>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
            <h2>Reminders list:</h2>
            <List reminders={reminders} handleDelete={handleDelete}/>
            <p>Debug: {newReminder}</p>
        </div>
    )

}

export default App
