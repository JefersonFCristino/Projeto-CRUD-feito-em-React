import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

// Switch (tradução = "escolha") = onde colocamos todas as nossas rotas
// Route = a rota de fato
// Redirect = para caso coloque uma url que não tem nada a ver com os componentes ele vai redirecionar para o componente principal da nossa aplicação que no caso é o Home

import Home from '../components/home/Home'
import UserCrud from '../components/user/UserCrud'

export default props => 
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/users' component={UserCrud} />
        <Redirect from='*' to='/' />
    </Switch>

// exact = ele só vai navegar para a home se for exatamente o "/", já que users também tem o "/"