import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import TagsList from './TagsList';
import './Tags.css';

const Tags = () => {
    const tagsList = [{
        id: 1,
        tagName: "Javascript",
        tagDesc: "For question regarding programming in ECMAScript(JavaScript/JS) and its various dialects/implementations(executing ActionScript), Please include all relevent tags on your question.",
    },{
    id: 2,
    tagName: "python",
    tagDesc: "python is a multi-paradigm, dynamically typed, multipurpose programming languase. It is designed to be quick to learn, understand, and use, and enforces a clean and uniform syntax",
},{
    id: 3,
    tagName: "C#",
    tagDesc: "C#(pronounced 'see sharp') is a high level statically typed, multipurpose programming languase developed by microsoft",
},{
    id: 4,
    tagName: "Java",
    tagDesc: "Java is a high-level object oriented programming language. Use this tag when you'r having problems using or understanding the language itself.",
},{
    id: 5,
    tagName: "PHP",
    tagDesc: "PHP is a widely used, open source, general-purpose, multi-paradigm, dynamically typed and interpreted scripting languase originally designed for server-side web development",
},{
    id: 6,
    tagName: "HTML",
    tagDesc: "HTML(HyperText Markup Language) is the markup language for creating web pages and other information to be displayed in a web server.",
},{
    id: 7,
    tagName: "android",
    tagDesc: "Android is Google's mobile operating system, used for programming or developing digital devices(smartphones, Tablets, Automobiles, TVs, Wear, Glass, IoT).",
},{
    id: 8,
    tagName: "css",
    tagDesc: "CSS is a representaition style sheet language used for describing the look and formatting of HTML, XML documents and SVG elements including colors, layout, fonts and animations",
},{
    id: 9,
    tagName: "reactJs",
    tagDesc: "React is a javascript library for building user interfaces. it uses a declarative, component-based paradigm and aims to be both efficient and flexible.",
},{
    id: 9,
    tagName: "node.js",
    tagDesc: "Node.js is an event-based, non-blocking, asynchronous I/O runtime that uses Google's v8 Javascript engine and libuv library.",
}]

  return (
    <div className='home-container-1'> 
      <LeftSidebar/>
      <div className='home-container-2'>
        <h1 className='tags-h1'>Tags</h1>
        <p className='tags-p'>A tag is a keyword or lable that categorizes your question with others, similar questions. </p>
     <p className='tags-p' >Using the right tags makes it easier for others to find and answer your question.</p>
     <div className='tags-list-container'>
        {
            tagsList.map((tag) => (
                <TagsList tag ={tag} key={tagsList.id}/>
            ))
        }
     </div>
      </div>
    </div>
  )
}

export default Tags
