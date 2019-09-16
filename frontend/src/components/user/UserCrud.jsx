import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir!'
}

/* Estado Inicial (quando houver cancelamento no formulário possa voltar para esse estado) */

const baseUrl = 'https://jfc-api-crud-react.herokuapp.com/users'

const initialState = {
    user: { name:'', email: '' },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    // Função que vai ser chamada quando o componente for ser exibido na tela. Dentro dessa função vamos fazer uma chamada pro nosso backend para obtermos a lista daquilo que está cadastrado.
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    // vamos limpar só o user escrito naquele formlário e não a lista, os outros users que nós temos
    clear() {
        this.setState({ user: initialState.user })
    }

    // tanto para salvar um novo usuário quanto para alterar um já existente. (quando queremos incluir quer dizer que o usuário não tem "id" e quando queremos alterar quer dizer que o usuário já tem um "id" setado)
    save() {
        const user = this.state.user
        
        if (user.name === '' || user.email ==='') return alert('Infome Usuário e Email, por favor')

        const method = user.id ? 'put' : 'post'

        /* Nossa url vai variar. Caso "put", vamos passar a url padrão + o id so usuário */
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)

                /* depois qeu alteramos ou salvamos o usuário vamos limpar o formulário e salvar no "list" */
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    // tanto o "name" quanto o "email"
    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="from-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" onChange={e => this.updateField(e)} value={this.state.user.name} placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="from-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control" name="email" onChange={e => this.updateField(e)}  value={this.state.user.email} placeholder="Digite o e-mail..." />
                        </div>
                    </div>
                </div>

                <hr/>

                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // na tabela que vamos renderizar nossa lista de usuários vamos precisar de duas funções. Uma função é para quando clicarmos no ícone de "caneta" (para editar) ele carregar o usuário e a outra vai ser o ícone de "lixo" para excluir o usuário

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            // atualizando a lista para remover o usuário da lista local
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    // Função para renderizar a tabela

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <i className="fa fa-pencil"></i>
                        </button>

                        <button className="btn btn-danger" onClick={() => this.remove(user)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main { ...headerProps }>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}