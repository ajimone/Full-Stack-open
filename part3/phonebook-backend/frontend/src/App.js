import { useState, useEffect } from 'react'
import service from './services/service'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='success'>
      {message}
    </div>
  )
}

const Notificationfail = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='failure'>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState(persons)
  const [successMessage, setSuccessMessage] = useState(null)
  const [failureMessage, setFailureMessage] = useState(null)

  // fetch existing records from db.json
  useEffect(() => {
    service
      .getAll()
      .then(response => {
        setPersons(response)
        setFilterPerson(response)
      })
  }, [])

  // adding new person to list
  const addPeople = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    //checking for duplicates before update
    const check = (persons.filter(person => person.name === newName))

    if (check.length > 0) {

      //checking for existing numbers
      if (check[0].number === newNumber) {
        alert(`${newName} is already added to phonebook`)
      } else {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {

          //modifying existing contact and updating server
          const modNum = persons.find(p => p.name === newName)
          const editedContact = { ...modNum, number: newNumber }

          service.put(editedContact, editedContact.id)
            .then(response => {
              setPersons(persons.map(p => p.name !== newName ? p : response))
              setFilterPerson(persons.map(p => p.name !== newName ? p : response))
            })

          //triggering success message
          setSuccessMessage(`Updated ${newName}`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }
      }
    } else {
      service.create(nameObject)
        .then(response => {
          setPersons(persons.concat(response))
          setFilterPerson(persons.concat(response))
        })

      //triggering success message
      setSuccessMessage(`Added ${newName}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  //delete contact
  const deletePeople = (num, nam) => {
    if (window.confirm(`Delete ${nam}`)) {
      service.deleteEntry(num).then(response => {
        setPersons(persons.filter(per => per.id !== num))
        setFilterPerson(filterPerson.filter(per => per.id !== num))
      })

        //triggering failure message
        .catch(error => {
          setFailureMessage(`Information of ${nam} has already been removed from server`)
          setTimeout(() => {
            setFailureMessage(null)
          }, 5000)
          setPersons(persons.filter(per => per.id !== num))
          setFilterPerson(filterPerson.filter(per => per.id !== num))
        })
    }
  }

  // updating new contact in realtime
  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNumber(event.target.value)
  }

  // updating filter value
  const handleFilter = (event) => {
    test(event.target.value)
  }

  //render filter value in realtime
  const test = (newFilter) => {
    if (newFilter.length > 0) {
      const filtering = (persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase())))
      if (filtering.length > 0) {
        setFilterPerson(filtering)
      } else {
        setFilterPerson([])
      }
    } else {
      setFilterPerson(persons)
    }
  }

  // rendering results of components
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Notificationfail message={failureMessage} />
      <Filter hfilter={handleFilter} />

      <h3>Add a new</h3>
      <PersonForm addPeople={addPeople} handleChange={handleChange} newName={newName} handleNumChange={handleNumChange} newNumber={newNumber} />

      <h2>Numbers</h2>

      <div>
        {filterPerson.map(person =>
          <Persons key={person.id} name={person.name} number={person.number} divnum={person.id} deletePeople={deletePeople} />
        )}
      </div>
    </div>
  )
}

export default App