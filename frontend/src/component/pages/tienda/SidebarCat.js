import React from 'react';
import { Link } from 'react-router-dom';
import { FetchConsumer } from '../../../context/FetchContext';

const SidebarCat = () => {

    return (
      <FetchConsumer>
            {(value) => { 

            const { categoriasGet } = value;   

    return (
         <React.Fragment>
            <div className="sidebar-cat">
                <ul>
                    <li><Link to={`/tienda`}>Ver todos</Link></li>
                    {categoriasGet.map((cat, index) => 
                        <li key={cat.id}><Link to={`/categoria/${cat.id}`}>{cat.name}</Link></li>
                    )}
                </ul>
            </div>
        </React.Fragment>
        )}}
        </FetchConsumer>
    )
}

export default SidebarCat
