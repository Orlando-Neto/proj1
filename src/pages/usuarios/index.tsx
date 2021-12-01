import Head from '../../components/Layout/Head'
import Corpo from '../../components/Layout/Corpo'
import prisma from '../../lib/prisma'
import { useState } from 'react'
import Input from '../../components/Input'
import Usuario from '../../model/Usuario'
import Select from '../../components/Select'

export const getServerSideProps = async ({ req }) => {

  const data = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  let users = JSON.stringify(data);
  users = JSON.parse(users)

  return { props: { data: users } }
}

// Display list of users (in /pages/index.tsx)
export default function UsuariosPage({data}) {

  const [users, setUsers] = useState(data)
  const [user, setUser] = useState<Usuario>({nome: "", email: "", senha: ''})

  const salvar = async (user, e) => {

    e.preventDefault()
    let response

    if(user.senha == '') user.senha = undefined

    if(user.id == undefined) {

      response = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify(user)
      })
    } else {
      response = await fetch('/api/users/'+user.id, {
        method: 'PUT',
        body: JSON.stringify(user)
      })
    }
  
    if(!response.ok) {
      let ret = await response.json()

      throw new Error(response.statusText)
    }

    if(user.id == undefined) {
      let novoUser = await response.json()
      setUsers([...users, novoUser])
    } else {
      let novoUsers = users.map(u => {
        return (u.id === user.id) ? user : u
      })
      
      setUsers(novoUsers)
    }

    e.target.reset()
    setUser({nome: '', email: '', senha: ""})

    return await response.json()
  }

  function editar(user) {
    user.senha = '';
    setUser(user)
  }

  return (
    <>
      <Head>

      </Head>

      <Corpo>

        <div className="card">
          <div className="card-header">
            Cadastro Usuário
          </div>
          <form onSubmit={async (e) => {
              try { 
                  await salvar(user, e);
              } catch(err) {
                
              }
            }} method="post" className="form-horizontal">
            
            <div className="card-body card-block">

                <Input 
                  type="text"
                  label="Nome"
                  id="name"
                  name="name"
                  required
                  value={user.nome}
                  onchange={e => setUser({...user, nome: e.target.value})}
                  placeholder="Digite seu nome"
                />
                
                <Input 
                  type="email"
                  label="Email"
                  id="email"
                  name="email"
                  value={user.email}
                  onchange={e => setUser({...user, email: e.target.value})}
                  placeholder="Digite seu email"
                />
                
                <Select 
                  label="Cargo"
                  id="cargo"
                  name="cargo"
                  value={user.cargo}
                  items = {[
                    {0: 'Selecione uma opção'},
                    {1: '2'},
                    {2: '3'},
                    {'Admin2': 'Administração 2'},
                  ]
                  }
                  onchange={e => setUser({...user, cargo: e.target.value})}
                  placeholder="Digite seu cargo"
                />
                
                <Input 
                  type="password"
                  label="Senha"
                  id="senha"
                  name="senha"
                  value={user.senha}
                  onchange={e => setUser({...user, senha: e.target.value})}
                  placeholder="Altere sua senha"
                />
                
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                <i className="fa fa-dot-circle-o"></i> Confirmar
              </button>
              &nbsp;
              <button type="reset" onClick={() => setUser({nome: '', senha: '', email: ''})} className="btn btn-danger btn-sm">
                <i className="fa fa-ban"></i> Resetar
              </button>
            </div>
          </form>
        </div>

        <div className="table-responsive table--no-card m-b-30">
            <table className="table table-borderless table-striped table-earning">
                <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    users.map((user, i) => (
                      <tr key={user.id} onClick={() => editar(user)}>
                        <td>{user.id}</td>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>{user.cargo}</td>
                      </tr>
                    ))
                  }
                </tbody>
            </table>
        </div>
      </Corpo>
    </>
  )
}