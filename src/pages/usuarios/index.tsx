import Head from '../../components/Head'
import Corpo from '../../components/Corpo'
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

  const salvar = async (user, e) => {
    e.preventDefault()
  
    const response = await fetch('/api/users', {
      method: "POST",
      body: JSON.stringify(user)
    })
  
    if(!response.ok) {
      throw new Error(response.statusText)
    }

    setUsers([...users, user])

    return await response.json()
  }

  let user: iUser = {name: '', job: "", email: ''};

  return (
    <>
      <Head>

      </Head>

      <Corpo>

        <div className="card">
          <div className="card-header">
            <strong>Horizontal</strong> Form
          </div>
          <form onSubmit={async (e) => {
              try { 
                  await salvar(user, e);
                  e.target.reset()
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
                    <input type="text" id="nome" required name="nome" onChange={e => user.name = e.target.value} placeholder="Digite seu nome" className="form-control" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col col-md-3">
                    <label htmlFor="email" className=" form-control-label">Email:</label>
                  </div>
                  <div className="col-12 col-md-9">
                    <input type="email" id="email" required name="email" onChange={e => user.email = e.target.value} placeholder="Digite seu Email" className="form-control" />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col col-md-3">
                    <label htmlFor="cargo" className=" form-control-label">Cargo:</label>
                  </div>
                  <div className="col-12 col-md-9">
                    <input type="text" id="cargo" name="cargo" onChange={e => user.job = e.target.value} placeholder="Digite seu Cargo" className="form-control" />
                  </div>
                </div>

            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                <i className="fa fa-dot-circle-o"></i> Confirmar
              </button>
              &nbsp;
              <button type="reset" className="btn btn-danger btn-sm">
                <i className="fa fa-ban"></i> Resetar
              </button>
            </div>
            </form>
        </div>

        <div className="table-responsive table--no-card m-b-30">
            <table className="table table-borderless table-striped table-earning">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => (
                      <tr key={user.id}>
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