import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Modal from 'react-modal';






const Sidebar = ({
  notes,
  setNotes,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
  const colorOptions = ['red', 'green', 'blue', 'yellow', 'purple'];

  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const [isOpe, setIsOpen] = useState(false);



  const [formData , setFormData] = useState({
    id: uuid(),
    title: "",
    body: [],
    color:'',
    lastModified: Date.now(),
  });

  useEffect(() => {
    console.log('connected')
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('happened');

    if (formData.title.trim() === '') {
      alert('Please enter a title for the note.');
      return;
    }

    if (formData.color.trim() === '') {
      alert("Please select a color");
      return;
    }
    
    // Add the new note to the notes array and update the state
    
  
    // Store the updated notes array in local storage
    const updatedNotes = [...notes, formData];
    setNotes(updatedNotes);
  
    // Store the updated notes array in local storage
    
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  
    // Clear the form data and close the modal
    setFormData({
      id: uuid(),
      title: '',
      body: [],
      color: '',
      lastModified: Date.now(),
    });
    setIsOpen(false);
  };
  
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    console.log(formData);
  };

  function handleColorClick(event) {
    const newColor= event.target.getAttribute('name')
    
    setSelectedColor(event.target.value);
    setFormData({...formData, color: newColor})
    console.log("freedom")
    console.log(formData)

    
    

    
  }   
    

  

  return (
    
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>Pocket Notes</h1>
        <button onClick={() => setIsOpen(true)}>+  Create Notes</button>
        <div className='popUp'>
        <Modal isOpen ={isOpe} onRequestClose={() => setIsOpen(false)} className='popUp'>
  <h2>Create New Notes</h2>
  <form onSubmit={handleSubmit}>
    <label>
      Group Name:
      <input type="text" name='title' value={formData.title} onChange={handleChange} />
    </label>
    <div>
      
      <p>Choose Color</p>
      {colorOptions.map((color) => (
        <div
          key={color}
          name={color}
          value={formData.color}
          style={{
            backgroundColor: color,
            width: '50px',
            height: '50px',
            borderRadius:'50px',
            display: 'inline-block',
            margin: '10px',
            cursor: 'pointer',
          }}
          onClick={handleColorClick}
        />
      ))}
    </div>
    <button type="submit">Create</button>
  </form>
  
</Modal>

        </div>
        
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body,color, lastModified }, i) => (
          <div
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>Delete</button>
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;