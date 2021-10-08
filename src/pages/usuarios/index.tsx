import Head from '../../components/Layout/Head'
import Corpo from '../../components/Layout/Corpo'
import prisma from '../../lib/prisma'
import { useState } from 'react'
import Input from '../../components/Input'

interface iUser {
  id?: number,
  name: string,
  email: string,
  job: string
}

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
export default function Usuarios({data}) {

  const [users, setUsers] = useState(data)
  const [user, setUser] = useState<iUser>({name: "", email: "", job: ""})

  const salvar = async (user, e) => {
    e.preventDefault()
    let response

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
    setUser({name: '', job: '', email: ''})

    return await response.json()
  }

  function editar(user) {
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
                  value={user.name}
                  onchange={e => setUser({...user, name: e.target.value})}
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
                
                <Input 
                  type="text"
                  label="Cargo"
                  id="cargo"
                  name="cargo"
                  value={user.job}
                  onchange={e => setUser({...user, job: e.target.value})}
                  placeholder="Digite seu cargo"
                />
                
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                <i className="fa fa-dot-circle-o"></i> Confirmar
              </button>
              &nbsp;
              <button type="button" onClick={() => setUser({name: '', job: '', email: ''})} className="btn btn-danger btn-sm">
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
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.job}</td>
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