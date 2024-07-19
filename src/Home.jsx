import { useState } from "react";
import { Center } from "./Center";
import { Left } from "./Left";
import { Right } from "./Right";
import './home.scss';

const Home = () => {
  const [xmlContent, setXmlContent] = useState(null);
  const [uniqueElementNames, setUniqueElementNames] = useState([]);
  const [xPath, setXPath] = useState([]);
  return (
    <div className="home">
      <div className="left">
        <Left setXmlContent={setXmlContent} xmlContent={xmlContent} setUniqueElementNames={setUniqueElementNames}/>
      </div>
      <div className="center">
        <Center xmlContent={xmlContent} uniqueElementNames={uniqueElementNames} setXPath={setXPath}/>
      </div>
      <div className="right">
        <Right xPath={xPath}/>
      </div>
    </div>
  )
}

export default Home;
