import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
const Main = ({ activeNote, onUpdateNote }) => {
  const onEditField = (field, value) => {
    if (field === "body") {
      // update the activeNote.body array with the new final array
      value = final;
    }
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };
  
  

  const [subNote,setSubNote] = useState({
    msg:"",
    lastModified:Date.now()
  })

  const [final,setFinal] = useState([])

  const actionChange = (event) =>{
    const { name, value } = event.target;
    setSubNote((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
    const newBody = [...activeNote.body, subNote];
    console.log(newBody)
    
  }

  const actionSubmit = () => {
    event.preventDefault();
    const newBody = [...activeNote.body, subNote];
    onUpdateNote({
      ...activeNote,
      body: newBody,
      lastModified: Date.now(),
    });
    setSubNote({
      msg: "",
      lastModified: Date.now(),
    });
  };
  
  


  if (!activeNote) return <div className="no-active-note">No Active Note</div>;

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          type="text"
          id="title"
          placeholder="Note Title"
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus
        />
        <form onSubmit={actionSubmit}>

        <textarea
          name = 'msg'
          placeholder="Write your note here..."
          value={subNote.msg}
          onChange={actionChange}
        />
        <button type="submit">submit</button>

        </form>
        
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        {activeNote.body.map((item, index) => (
          <ReactMarkdown className="markdown-preview" key={index}>
            {item.msg}
          </ReactMarkdown>
        ))}
      </div>
    </div>
  );
};

export default Main;
