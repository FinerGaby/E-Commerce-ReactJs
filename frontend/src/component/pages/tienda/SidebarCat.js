import React from 'react';
import { Link } from 'react-router-dom';
import { FetchConsumer } from '../../../context/FetchContext';

const SidebarCat = () => {

    return (
      <FetchConsumer>
            {(value) => { 

            const { categoriasGet, data } = value;   

    return (
         <React.Fragment>
            <div className="sidebar-cat">
                <ul>
                    <li class="filtros-name"><i className="material-icons">filter_list</i>Filtro</li>
                    <li><Link to={`/tienda`}>Ver todo</Link></li>
                    {categoriasGet.map((cat, index) => {
                        const cateNumber = data.filter(e => e.categoria === cat._id)
                        return (
                            <li key={cat._id}><Link to={`/categoria/${cat._id}`}>{cat.name}<span>{cateNumber.length}</span></Link></li>

                        )
                    }
                    )}
                </ul>
            </div>
        </React.Fragment>
        )}}
        </FetchConsumer>
    )
}

export default SidebarCat
