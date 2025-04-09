import { useEffect, useState } from 'react'
import axios from 'axios'

const PersonForm = ({handleSubmit, handleNameChange, handleNumChange, newName, newNumber}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>name: <input value={newName} onChange={handleNameChange}/></div>
      <div>number: <input value={newNumber} onChange={handleNumChange}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

const Filter =  ({onFilter}) => {
  return (
    <form>
      <div>name: <input onChange={onFilter}/></div>
    </form> 
  )}

const Display = ({persons, filter}) => {
  const toDisplay = (filter !== '') 
  ?persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  :persons
  return (
    <div>
      {toDisplay.map((person, index) => (
        <p key={index}>{person.name} {person.number}</p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    const nameExist = persons.some(person => person.name === newName);
    console.log(nameExist);
    if (nameExist) {
      alert(`${newName} is already added to phonebook`)
      setNewName('');
      setNewNumber('');
      return
    }
    const newPerson = {
      name: newName, number: newNumber, id: persons.length + 1
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
    console.log("debug:", newName);
    setNewNumber('');
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumChange = (e) => {
    setNewNumber(e.target.value);
  }

  const filterOn = (e) => {
    setFilter(e.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilter={filterOn}/>
      <h2>add a new</h2>
      <PersonForm 
      handleSubmit={handleSubmit} 
      handleNameChange={handleNameChange} 
      handleNumChange={handleNumChange} 
      newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Display persons={persons} filter={filter} />
    </div>
  )
}

export default App