import React from 'react';
import XMLViewer from 'react-xml-viewer';
import './left.scss';

const customTheme = {
  attributeKeyColor: "#FF0000",
  attributeValueColor: "#0000FF"
};

export const Left = ({ xmlContent, setXmlContent, setUniqueElementNames }) => {
//   const [uniqueElementNames, setUniqueElementNamesState] = useState([]);


  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        setXmlContent(content);
        const uniqueNames = await extractUniqueElementNamesFromXML(content);
        setUniqueElementNames(uniqueNames);
        // setUniqueElementNamesState(uniqueNames);
      };
      reader.readAsText(file);
    }
  };

  async function extractUniqueElementNamesFromXML(xmlString) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      const elements = xmlDoc.getElementsByTagName("*");
      const uniqueElementNames = new Set();

      for (let i = 0; i < elements.length; i++) {
        uniqueElementNames.add(elements[i].nodeName);
      }

      return Array.from(uniqueElementNames);
    } catch (error) {
      console.error("Error parsing XML:", error);
      return [];
    }
  }

  return (
    <div className="leftcontainer">
      <div className="header">
        <h2>Upload Xml File</h2>
        <input type="file" accept=".xml" placeholder='Upload Xml file' onChange={handleFileUpload} />
      </div>
      <div className="content">
        {xmlContent && (
          <div>
            <XMLViewer collapsible={true} xml={xmlContent} theme={customTheme} />
          </div>
        )}
      </div>
    </div>
  );
};
