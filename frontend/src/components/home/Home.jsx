import React from 'react'
import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Início" subtitle="Segundo Projeto do capítulo de React">
        <div className="display-4">Bem Vindo!</div>
        <hr />
        <p className="mb-0">Sistema para exemplificar a construção de um cadastro desenvolvido em React! Nosso Front-end feito em React vai consumir nosso Back-end com uma base de dados servido pelo JSON-Server e que foi subido ao ar com a utilização do Heroku</p>
    </Main>