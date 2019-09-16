// Esse arquivo vai fazer referência ao Header que vai mudar de acordo com o componete que estamos naquele momento
// o Main vai ter duas partes: o Header e o Content

import React from 'react'
import './Main.css'
import Header from './Header'

export default props => 
    <React.Fragment>
        <Header {...props} />

        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </React.Fragment>