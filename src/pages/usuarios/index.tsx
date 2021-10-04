import Head from '../../components/Layout/Head'
import Corpo from '../../components/Layout/Corpo'
import prisma from '../../lib/prisma'
import { useState } from 'react'

interface iUser {
  id?: number,
  name: string,
  email: string,
  job: string
}

export const getServerSideProps = async ({ req }) => {

  const data = await prisma.user.findMany()

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

  function editar(id) {

    let data = users.map((user) => user)
      .filter((user) => (user.id === id))
    
    if(data.length > 0) {
      setUser(data[0])
    }
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
                  console.log(err)
              }
            }} method="post" className="form-horizontal">
            
            <div className="card-body card-block">

                <div className="row form-group">
                  <div className="col col-md-3">
                    <label htmlFor="nome" className=" form-control-label">Nome:</label>
                  </div>
                  <div className="col-12 col-md-9">
                    <input type="text" id="nome" required name="nome" onChange={e => setUser({...user, name: e.target.value})} value={user.name} placeholder="Digite seu nome" className="form-control" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col col-md-3">
                    <label htmlFor="email" className=" form-control-label">Email:</label>
                  </div>
                  <div className="col-12 col-md-9">
                    <input type="email" id="email" required name="email" onChange={e => setUser({...user, email: e.target.value})} value={user.email} placeholder="Digite seu Email" className="form-control" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col col-md-3">
                    <label htmlFor="cargo" className=" form-control-label">Cargo:</label>
                  </div>
                  <div className="col-12 col-md-9">
                    <input type="text" id="cargo" name="cargo" onChange={e => setUser({...user, job: e.target.value})} value={user.job} placeholder="Digite seu Cargo" className="form-control" />
                  </div>
                </div>

            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                <i className="fa fa-dot-circle-o"></i> Confirmar
              </button>
              &nbsp;
              <button type="button" onClick={(() => {setUser({name: '', job: '', email: ''})})} className="btn btn-danger btn-sm">
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
                      <tr key={user.id} onClick={() => editar(user.id)}>
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