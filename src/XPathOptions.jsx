import React, { useState, useEffect } from 'react';
import './xpathoptions.scss';

const XPathOptions = ({ label, mainElement, elements, xmlContent, setXPath }) => {
  const [selectedElement, setSelectedElement] = useState(mainElement || "");
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [childNodes, setChildNodes] = useState([]);
  const [childAttributes, setChildAttributes] = useState([]);
  const [childAttributeValues, setChildAttributeValues] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [xpathResults, setXPathResults] = useState({});
  const [gen, setGen] = useState(false);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (selectedElement) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      const elements = xmlDoc.getElementsByTagName(selectedElement);
      if (elements.length > 0) {
        const attrNames = Array.from(elements[0].attributes).map(attr => attr.name);
        const childNodeNames = Array.from(elements[0].children).map(child => child.nodeName);
        setAttributes(attrNames);
        setChildNodes(childNodeNames);
        setMessages({});
      } else {
        setAttributes([]);
        setChildNodes([]);
        setMessages({});
      }
    } else {
      setAttributes([]);
      setChildNodes([]);
      setMessages({});
    }
    setAttributeValues([]);
    setChildAttributes([]);
    setChildAttributeValues([]);
  }, [selectedElement, xmlContent]);

  const handleElementChange = (e) => {
    setSelectedElement(e.target.value);
    setConditions([]);
    setXPathResults({});
    setMessages({});
  };

  const handleConditionChange = (index, field, value) => {
    const updatedConditions = conditions.map((condition, i) =>
      i === index ? { ...condition, [field]: value } : condition
    );
    setConditions(updatedConditions);

    if (field === "attribute") {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      const elements = xmlDoc.getElementsByTagName(selectedElement);
      if (elements.length > 0) {
        const attrValues = Array.from(elements)
          .map(el => el.getAttribute(value))
          .filter(val => val !== null);
        setAttributeValues([...new Set(attrValues)]);
      }
    }

    if (field === "child") {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      const childElements = xmlDoc.getElementsByTagName(value);
      if (childElements.length > 0) {
        const childAttrNames = Array.from(childElements[0].attributes).map(attr => attr.name);
        setChildAttributes(childAttrNames);
      } else {
        setChildAttributes([]);
      }
    }

    if (field === "childAttribute") {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      const childElements = xmlDoc.getElementsByTagName(updatedConditions[index].child);
      if (childElements.length > 0) {
        const childAttrValues = Array.from(childElements)
          .map(el => el.getAttribute(value))
          .filter(val => val !== null);
        setChildAttributeValues([...new Set(childAttrValues)]);
      }
    }

    if (field === "type" && value === "attribute" && attributes.length === 0) {
      setMessages({ ...messages, attribute: "No attributes for the selected element." });
    } else if (field === "type" && value === "child" && childNodes.length === 0) {
      setMessages({ ...messages, child: "No child nodes for the selected element." });
    } else if (field === "type" && value === "atomic" && !xmlContent.trim()) {
      setMessages({ ...messages, atomic: "No atomic values for the selected element." });
    } else {
      setMessages({});
    }
  };

  const addCondition = () => {
    if (conditions.length === 0 || conditions[conditions.length - 1].connector !== "end") {
      setConditions([...conditions, { type: "attribute", attribute: "", value: "", condition: "equals", connector: "end" }]);
    } else {
      setMessages({ ...messages, addCondition: "Add Condition is only allowed when the last condition has an 'and' or 'or' connector." });
    }
  };

  const removeCondition = (index) => {
    const updatedConditions = conditions.filter((_, i) => i !== index);
    setConditions(updatedConditions);
  };

  const generateXPath = () => {
    if (!selectedElement) {
      setXPath("");
      return;
    }

    let hasError = false;
    conditions.forEach((cond) => {
      if (cond.type === "attribute" && attributes.length === 0) {
        setMessages({ ...messages, generate: "Cannot generate XPath: No attributes available." });
        hasError = true;
      } else if (cond.type === "child" && childNodes.length === 0) {
        setMessages({ ...messages, generate: "Cannot generate XPath: No child nodes available." });
        hasError = true;
      } else if (cond.type === "atomic" && !xmlContent.trim()) {
        setMessages({ ...messages, generate: "Cannot generate XPath: No atomic values available." });
        hasError = true;
      }
    });

    if (hasError) {
      return;
    }

    setGen(true);

    let xpath = `//${selectedElement.toLowerCase()}`;
    const conditionStrings = conditions.map((cond) => {
      switch (cond.type) {
        case "attribute":
          switch (cond.condition) {
            case "equals":
              return `@${cond.attribute}="${cond.value}"`;
            case "notEquals":
              return `@${cond.attribute}!="${cond.value}"`;
            case "exists":
              return `@${cond.attribute}`;
            case "contains":
              return `contains(@${cond.attribute}, "${cond.value}")`;
            default:
              return "";
          }
        case "atomic":
          switch (cond.condition) {
            case "equals":
              return `text()="${cond.value}"`;
            case "notEquals":
              return `text()!="${cond.value}"`;
            case "contains":
              return `contains(text(), "${cond.value}")`;
            default:
              return "";
          }
        case "child":
          let childCondition = `.${cond.child}`;
          if (cond.childAttribute) {
            switch (cond.childCondition) {
              case "equals":
                childCondition += `[@${cond.childAttribute}="${cond.childValue}"]`;
                break;
              case "notEquals":
                childCondition += `[@${cond.childAttribute}!="${cond.childValue}"]`;
                break;
              case "exists":
                childCondition += `[@${cond.childAttribute}]`;
                break;
              case "contains":
                childCondition += `[contains(@${cond.childAttribute}, "${cond.childValue}")]`;
                break;
              default:
                break;
            }
          }
          if (cond.childText) {
            switch (cond.childTextCondition) {
              case "equals":
                childCondition += `[text()="${cond.childText}"]`;
                break;
              case "notEquals":
                childCondition += `[text()!="${cond.childText}"]`;
                break;
              case "contains":
                childCondition += `[contains(text(), "${cond.childText}")]`;
                break;
              default:
                break;
            }
          }
          return childCondition;
        default:
          return "";
      }
    }).filter(condStr => condStr !== "");

    if (conditionStrings.length > 0) {
      let conditionString = conditionStrings[0];
      for (let i = 1; i < conditionStrings.length; i++) {
        if (conditions[i - 1].connector === "end") break;
        conditionString += ` ${conditions[i - 1].connector} ${conditionStrings[i]}`;
      }
      xpath += `[${conditionString}]`;
    }

    const newXpathResults = { ...xpathResults, [label]: { "xpath": xpath } };
    setXPathResults(newXpathResults);
    setXPath((prevXPaths) => [...prevXPaths, newXpathResults]);
    setMessages({});
  };
  const [childSelection,setChildSelection]=useState(false);
  return (
    <div className="xpath-options">
      <div className="title">
        <div className="card">
          <div className="label">
            <h3>{label}</h3>
          </div>
          <div className="element-select">
            <select value={selectedElement} onChange={handleElementChange}>
              <option value="">--Select the Mapping Element--</option>
              {elements.map((element) =>(<option key={element} value={element}>{element}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="genbutton" onClick={generateXPath}>Generate JSON</button>
      </div>
      {messages.generate && (
        <div className="result">
          <p className="message">{messages.generate}</p>
        </div>
      )}
      {gen && !messages.generate && (
        <div className="result">
          {/* {Object.entries(xpathResults).map(([key, value]) => (
            <p className="message" key={key}><strong>{key}:</strong> {value.xpath}</p>
          ))} */}
          <pre  className="message">{JSON.stringify(xpathResults, null,2)}</pre>
        </div>
      )}
      <div className="con_labels">
        <span>Mapping type</span>
        <span>Selection Type</span>
        <span>Selection Field</span>
        <span>Conditions</span>
        <span>Value</span>
        <span>Logical Connector</span>
        <span>Actions</span>
      </div>
      <div className="conditions">
        {conditions.map((condition, index) => (
          <div className="condition" key={index}>
            <select value={condition.type} onChange={(e) => handleConditionChange(index, "type", e.target.value)}>
              <option value="">--Select Mappping Type--</option>
              <option value="attribute">Attribute</option>
              <option value="atomic">Text</option>
              <option value="child">Child Node</option>
            </select>
            {condition.type === "attribute" && (
              <>
                <div className="empty"></div>
                <select value={condition.attribute} onChange={(e) => handleConditionChange(index, "attribute", e.target.value)}>
                  <option value="">--Select Attribute--</option>
                  {attributes.map(attr => (
                    <option key={attr} value={attr}>{attr}</option>
                  ))}
                </select>
                <select value={condition.condition} onChange={(e) => handleConditionChange(index, "condition", e.target.value)}>
                  <option value="">--Select Attribute Condition--</option>
                  <option value="equals">equals</option>
                  <option value="notEquals">not equals</option>
                  <option value="exists">exists</option>
                  <option value="contains">contains</option>
                </select>
                {(condition.condition === "equals" || condition.condition === "notEquals" || condition.condition === "contains") ? (
                  <select value={condition.value} onChange={(e) => handleConditionChange(index, "value", e.target.value)}>
                    <option value="">--Select Value--</option>
                    {attributeValues.map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                ):<div className='empty'></div>}
              </>
            )}
            {condition.type === "atomic" && (
              <>
                <div className="empty"></div>
                <div className="empty"></div>
                <select value={condition.condition} onChange={(e) => handleConditionChange(index, "condition", e.target.value)}>
                  <option value="">--Select Text Condition--</option>
                  <option value="equals">equals</option>
                  <option value="notEquals">not equals</option>
                  <option value="contains">contains</option>
                </select>
                <input type="text" placeholder='Enter the text of the element' value={condition.value} onChange={(e) => handleConditionChange(index, "value", e.target.value)} />
              </>
            )}
            {condition.type === "child" && (
              <>
                <div className="selection">
                  <select value={condition.child} onChange={(e) => handleConditionChange(index, "child", e.target.value)}>
                  <option value="">--Select Child--</option>
                  {childNodes.map(child => (
                    <option key={child} value={child}>{child}</option>
                  ))}
                </select>
                <select value={condition.childCondition} onChange={(e) => {
                  handleConditionChange(index, "childCondition", e.target.value);
                  // Set childSelection state based on the selected value
                  if (e.target.value === "attribute") {
                    setChildSelection(true);
                  } else if (e.target.value === "text") {
                    setChildSelection(false);
                  }
                }}>
                  <option value="">--Select Child Mapping--</option>
                  <option value="attribute" onClick={()=>{setChildSelection(true)}}>Attribute</option>
                  <option value="text" onClick={()=>{setChildSelection(false)}}>Text</option>
                </select>
                </div>
                {
                  childSelection ? 
                  (
                    <>
                      <select value={condition.childAttribute} onChange={(e) => handleConditionChange(index, "childAttribute", e.target.value)}>
                        <option value="">--Select Child Attribute--</option>
                        {childAttributes.map(attr => (
                          <option key={attr} value={attr}>{attr}</option>
                        ))}
                      </select>
                      <select value={condition.childCondition} onChange={(e) => handleConditionChange(index, "childCondition", e.target.value)}>
                        <option value="">--Select Attribute Condition--</option>
                        <option value="equals">equals</option>
                        <option value="notEquals">not equals</option>
                        <option value="exists">exists</option>
                        <option value="contains">contains</option>
                      </select>
                      {condition.childCondition !== "exists" ? (
                        <select value={condition.childValue} onChange={(e) => handleConditionChange(index, "childValue", e.target.value)}>
                          <option value="">--Select Child Value--</option>
                          {childAttributeValues.map(value => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                        ):<div className='empty'></div>}
                    </>
                  ):
                  (
                    <>
                        <div className="empty"></div>
                        <select value={condition.childTextCondition} onChange={(e) => handleConditionChange(index, "childTextCondition", e.target.value)}>
                          <option value="">--Select Text Condition--</option>
                          <option value="equals">equals</option>
                          <option value="notEquals">not equals</option>
                          <option value="contains">contains</option>
                        </select>
                        <input type="text" placeholder='Enter child text' value={condition.childText} onChange={(e) => handleConditionChange(index, "childText", e.target.value)} />
                    </>
                  )
                }
              </>
            )}
            <select value={condition.connector} onChange={(e) => handleConditionChange(index, "connector", e.target.value)}>
              <option value="end">end</option>
              <option value="or">or</option>
              <option value="and">and</option>
            </select>
            <button className="remove-btn" onClick={() => removeCondition(index)}>Remove</button>
          </div>
        ))}
        <button className="add-condition-btn" onClick={addCondition}>Add Condition</button>
      </div>
      {messages.addCondition && (
        <div className="result">
          <p className="message">{messages.addCondition}</p>
        </div>
      )}
    </div>
  );
};

export default XPathOptions;
