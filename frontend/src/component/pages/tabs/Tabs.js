import React, { useState } from 'react';

const Tabs = (props) => {

    const [estado, setEstado] = useState(props.selected || 0);


    let handleChange
    handleChange = index => {
        setEstado(index)
    }

    return (
        <React.Fragment>
        <div className="flex-tab">
      <ul className="inline">
        {props.children.map((elem,index)=>{
         return <li key={index} onClick={() => handleChange(index)}>{elem.props.title}</li>
        })}
      </ul>
      </div>
      <div className="tab">{props.children[estado]}</div>
      </React.Fragment>
    )
}

export default Tabs
