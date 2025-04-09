import { useEffect, useState } from 'react'
import { getAll, addPerson, deletePerson, updatePerson } from './handle'

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
  const toDisplay = (filter !== '') 
  ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  : persons
  return (
    <div>
      {toDisplay.map((person, index) => (
        <p key={index}>{person.name} {person.number} <button onClick={() => handleDel(person.id)}>delete</button></p>
      ))}
    </div>
  )
}

const AlertMsg = ({ alertType, msg }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (msg) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return visible ? <div className={alertType}>{msg}</div> : null;
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [msg, setMessage] = useState('');
  const [alertType, setType] = useState('');

  useEffect(() => {
    console.log('effect');
    getAll()
      .then(res => setPersons(res))
      .catch(error => {
        setMessage(`Error: ${error.message}`);
        setType('error');
        console.log(error);
      });
  }, [])

  const addNewPerson = (newPerson) => {
    console.log('Add');
    addPerson(newPerson)
      .then(res => {
        setPersons(persons.concat(res));
        setMessage(`Added ${newPerson.name}!`);
        setType('success');
      })
      .catch(error => {
        setMessage(`Error adding ${newPerson.name}: ${error.message}`);
        setType('error');
        console.log(error);
      });
  }

  const delPerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    
    if (!personToDelete) {
      setMessage("This person doesn't exist anymore");
      setType('error');
      return;
    }
    
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id));
          setMessage(`Deleted ${personToDelete.name}!`);
          setType('success');
        })
        .catch(error => {
          if (error.response && error.response.status === 404) {
            // Person was already deleted from server
            setMessage(`Information of ${personToDelete.name} has already been removed from server`);
            setPersons(persons.filter(p => p.id !== id)); 
          } else {
            setMessage(`Error deleting ${personToDelete.name}: ${error.message}`);
          }
          setType('error');
        });
    }
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
          .then(res => {
            setPersons(persons.map(person => person.id === old.id ? res : person));
            setMessage(`Updated ${updatedPerson.name}!`);
            setType('success');
          })
          .catch(error => {
            if (error.response && error.response.status === 404) {
              // Person no longer exists in the database
              setMessage(`Information of ${updatedPerson.name} has already been removed from server`);
              setType('error');
              // Remove the person from the local state as well
              setPersons(persons.filter(person => person.id !== old.id));
            } else {
              setMessage(`Error updating ${updatedPerson.name}: ${error.message}`);
              setType('error');
            }
          });
      }
      setNewName('');
      setNewNumber('');
      return;
    }
    
    const newPerson = {
      name: newName, 
      number: newNumber, 
      id: (persons.length + 1).toString()
    }
    
    addNewPerson(newPerson);
    setNewName('');
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
      <AlertMsg alertType={alertType} msg={msg}/>
      <Filter onFilter={filterOn}/>
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit} 
        handleNameChange={handleNameChange} 
        handleNumChange={handleNumChange} 
        newName={newName} 
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Display persons={persons} filter={filter} handleDel={delPerson}/>
    </div>
  )
}

export default App