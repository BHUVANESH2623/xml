import React from 'react';
import './helpguide.scss';

const HelpGuide = () => {
  return (
    <div className='helpguide-container'>
      <h2>XML Help Guide</h2>
      <section>
        <h3>What is XML?</h3>
        <p>
          XML (eXtensible Markup Language) is a markup language that defines a set of rules for encoding documents in a format that is both human-readable and machine-readable. It is primarily used to store and transport data.
        </p>
      </section>
      <section>
        <h3>XML Structure</h3>
        <p>
          An XML document is structured with nested elements. Here is a basic example:
        </p>
        <pre className='xml-sample'>
          {`
<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>
          `}
        </pre>
        <p>
          In the above example:
        </p>
        <ul>
          <li><span className='element'>Element</span> - <code>note</code>, <code>to</code>, <code>from</code>, <code>heading</code>, <code>body</code></li>
          <li><span className='text'>Text</span> - <code>Tove</code>, <code>Jani</code>, <code>Reminder</code>, <code>Don't forget me this weekend!</code></li>
          <li><span className='child-node'>Child Node</span> - <code>to</code>, <code>from</code>, <code>heading</code>, <code>body</code> are child nodes of <code>note</code></li>
        </ul>
      </section>
      <section>
        <h3>Example of an XML Document</h3>
        <pre className='xml-sample'>
          {`
<?xml version="1.0" encoding="UTF-8"?>
<catalog>
  <book id="bk101">
    <author>Gambardella, Matthew</author>
    <title>XML Developer's Guide</title>
    <genre>Computer</genre>
    <price>44.95</price>
    <publish_date>2000-10-01</publish_date>
    <description>An in-depth look at creating applications with XML.</description>
  </book>
  <!-- More book entries here -->
</catalog>
          `}
        </pre>
        <p>
          In the above example:
        </p>
        <ul>
          <li><span className='element'>Element</span> - <code>catalog</code>, <code>book</code>, <code>author</code>, <code>title</code>, <code>genre</code>, <code>price</code>, <code>publish_date</code>, <code>description</code></li>
          <li><span className='attribute'>Attribute</span> - <code>id="bk101"</code> in <code>book</code></li>
          <li><span className='text'>Text</span> - <code>Gambardella, Matthew</code>, <code>XML Developer's Guide</code>, <code>Computer</code>, <code>44.95</code>, <code>2000-10-01</code>, <code>An in-depth look at creating applications with XML.</code></li>
          <li><span className='child-node'>Child Node</span> - <code>author</code>, <code>title</code>, <code>genre</code>, <code>price</code>, <code>publish_date</code>, <code>description</code> are child nodes of <code>book</code></li>
        </ul>
      </section>
      <section>
        <h3>Additional Resources</h3>
        <p>For more information about XML, you can visit the following resources:</p>
        <ul>
          <li><a href="https://www.w3schools.com/xml/" target="_blank" rel="noopener noreferrer">W3Schools XML Tutorial</a></li>
          <li><a href="https://www.xml.com/" target="_blank" rel="noopener noreferrer">XML.com</a></li>
          <li><a href="https://developer.mozilla.org/en-US/docs/Web/XML" target="_blank" rel="noopener noreferrer">MDN Web Docs: XML</a></li>
        </ul>
      </section>
    </div>
  );
};

export default HelpGuide;
