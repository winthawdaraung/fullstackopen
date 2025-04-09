import { useEffect, useState } from 'react'
import { getAll, addPerson, deletePerson, getPerson, updatePerson } from './handle'

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

const Display = ({persons, filter, handleDel}) => {
  // console.log("debug display",persons);
  const toDisplay = (filter !== '') 
  ?persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  :persons
  return (
    <div>
      {toDisplay.map((person, index) => (
        <p key={index}>{person.name} {person.number} <button onClick={() => handleDel(person.id)}>delete</button></p>
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
    console.log('effect');
    getAll().then(res => setPersons(res))
    .catch(err => console.log(err))
  }, [])

  const addNewPerson = (newPerson) => {
    console.log('Add');
    addPerson(newPerson).then(res => setPersons(persons.concat(res)))
    .catch(err => console.log(err))
  }

  const delPerson = (id) => {
    const name = getPerson(id).name;

    if (window.confirm(`Delete ${name}?`))
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
        })
        .catch(err => console.log(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameExist = persons.some(person => person.name === newName);
    console.log(nameExist);
    if (nameExist) {
      if (window.confirm(`"${newName}" is already added to phonebook, replace the old number with new one?`)) {
          const old = persons.find(person => person.name === newName);
          const updatedPerson = {...old, "number": newNumber};
          updatePerson(old.id, updatedPerson)
          .then(res => {setPersons(persons.map(person => person.id === old.id 
                                                        ?res :person
          ))});
      }
      setNewName('');
      setNewNumber('');
      return
    }
    const newPerson = {
      name: newName, number: newNumber, id: (persons.length + 1).toString()
    }
    // setPersons(persons.concat(newPerson));
    addNewPerson(newPerson);
    setNewName('');
    // console.log("debug:", newName);
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
      <Display persons={persons} filter={filter} handleDel={delPerson}/>
    </div>
  )
}

export default App