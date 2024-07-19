import React, { useState } from 'react';
import './center.scss';
import XPathOptions from './XPathOptions';

export const Center = ({ xmlContent, uniqueElementNames, setXPath }) => {
  const [labels, setLabels] = useState(['Author', 'Title', 'Editor', 'Publisher','Introduction','Email','Country','Reviewer','Admin']);
  const [newLabel, setNewLabel] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setNewLabel(event.target.value);
  };

  const handleAddNewElement = () => {
    if (newLabel.trim()) {
      setLabels([...labels, newLabel]);
      setNewLabel('');
      setShowInput(false);
    }
  };

  const handleLabelClick = (label) => {
    setSelectedLabel(label);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    // setSelectedLabel(null);
  };

  return (
    <div className='centercontainer'>
      <div className="header">
        <button className='add' onClick={handleAddClick}>Add New Element</button>
        {showInput && (
          <div className="input-container">
            <input 
              type="text" 
              value={newLabel} 
              onChange={handleInputChange} 
              placeholder="Enter new element" 
            />
            <button className='add-confirm' onClick={handleAddNewElement}>Add</button>
          </div>
        )}
      </div>
      <div className="content">
        {labels.map((label, index) => (
          <div key={index} onClick={() => handleLabelClick(label)}>
            {label}
          </div>
        ))}
      </div>
      {showPopup && (
        <div className="popup-background">
          <div className="popup">
            <button className="close-button" onClick={closePopup}>Close</button>
            <XPathOptions label={selectedLabel} elements={uniqueElementNames} xmlContent={xmlContent} setXPath={setXPath} />
          </div>
        </div>
      )}
    </div>
  );
};
