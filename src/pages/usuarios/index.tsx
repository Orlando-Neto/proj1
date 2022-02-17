import Head from '../../components/Layout/Head'
import Corpo from '../../components/Layout/Corpo'
import prisma from '../../lib/prisma'
import { useState } from 'react'
import Input from '../../components/Input'
import Usuario from '../../model/Usuario'
import Select from '../../components/Select'
import useAuth from '../../data/hook/useAuthData'
import Alerta from '../../components/Alert'
import useAppData from '../../data/hook/useAppData'
import { useRouter } from 'next/router'
import Table from '../../components/Table'

//Buscar de inicio os usuários para a tabela
export const getServerSideProps = async ({ req }) => {

  const data = await prisma.user.findMany({
    orderBy: {
      id: 'asc'
    }
  })

  function adicionaZero(numero) {

    if(numero <= 9) 
        return "0"+numero;
    else
        return numero;
  }

  data.map((v, i) => {
    let dt_nasc = new Date(v.dt_nascimento)

    let dia = adicionaZero(dt_nasc.getDate()+1)
    let mes = adicionaZero(dt_nasc.getMonth()+1)

    data[i].dt_nascimento = dt_nasc.getFullYear()+'-'+mes+'-'+dia
  })

  return { props: { data } }
}

// Display list of users (in /pages/index.tsx)
export default function UsuariosPage({data}) {

  //Pegando variáveis do Auth
  const { criptografar } = useAuth()
  const userAuth = useAuth().user
  const { salvarAviso, mostraData } = useAppData()
  //---
  
  //Declarando as variáveis de estado
  const [users, setUsers]     = useState(data)
  const [user, setUser]       = useState<Usuario>({nome: "", email: ""})
  const [btnDel, setBtnDel ]  = useState(true)
  const [inserir, setInsert]  = useState(true)
  const router = useRouter()
  //---

  //Funções
  const resetarForm = () => {
    
    setUser({nome: "", email: ""})
    setBtnDel(true)
    setInsert(true)
  }

  const salvar = async (user, e) => {

    e.preventDefault()
    let response

    if(user.id == undefined) {
      user.senha = criptografar(user.senha)

      response = await fetch('/api/users', {
        method: "POST",
        body: JSON.stringify(user)
      })
    } else {

      (user.senha == '')?user.senha = undefined:user.senha = criptografar(user.senha)

      response = await fetch('/api/users/'+user.id, {
        method: 'PUT',
        body: JSON.stringify(user)
      })
    }
  
    if(!response.ok) {
      let ret = await response.json()

      salvarAviso(ret, 'danger', 'usuario')
      router.push('/usuarios')
      return;
    }
    
    setBtnDel(true)
    setInsert(true)

    if(user.id == undefined) {
      let novoUser = await response.json()
      setUsers([...users, novoUser])
      salvarAviso('Usuário inserido com sucesso!', 'success', 'usuario')
    } else {

      let novoUsers = users.map(u => {
        return (u.id === user.id) ? user : u
      })
      
      setUsers(novoUsers)
      salvarAviso('Usuário alterado com sucesso!', 'success', 'usuario')
    }

    e.target.reset()
    setUser({nome: '', email: ''})
  }

  const remUser = async (id) => {

    let response = await fetch('/api/users/'+id, {
      method: "DELETE"
    })

    if(!response.ok) {
      let ret = await response.json()

      throw new Error(response.statusText)
    }
    setBtnDel(true)
    //Remove o usuário apagado do filtro
    const newUsers = users.filter(u => {
      if(u.id !== id) {
        return u
      }
    })

    setUsers(newUsers)
    resetarForm()
  }

  function editar(user) {

    user.senha = '';
    setUser(user)

    //Não deixar o usuário se apagar
    if(userAuth.id != user.id) {
      setBtnDel(false)
    } else {
      setBtnDel(true)
    }

    setInsert(false)
  }
  //---

  return (
    <>
      <Head />

      <Corpo>
        <Alerta id="usuario" />
        <div className="card">
          <div className="card-header">
            Cadastro de Usuário
          </div>
          <form onSubmit={(e) => salvar(user, e)} method="post" className="form-horizontal">
            
            <div className="card-body card-block">

                <Input 
                  type="text"
                  label="Nome"
                  id="nome"
                  name="nome"
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
                  required
                  value={user.email}
                  onchange={e => setUser({...user, email: e.target.value})}
                  placeholder="Digite seu email"
                />
                
                <Select 
                  label="Cargo"
                  id="cargo"
                  name="cargo"
                  value={user.cargo}
                  required
                  items = {[
                    {'': "Selecione um cargo"},
                    {'admin': 'Administrador'},
                    {'normal': 'Normal'},
                  ]}
                  onchange={e => {setUser({...user, cargo: e.target.value})}}
                />
                
                <Input 
                  type="password"
                  label="Senha"
                  id="senha"
                  name="senha"
                  required={inserir}
                  value={user.senha}
                  onchange={e => setUser({...user, senha: e.target.value})}
                  placeholder={(inserir)?'Insira sua senha':'Altere sua senha'}
                />
                
                <Input 
                  type="date"
                  label="Data Nascimento"
                  id="dt_nascimento"
                  name="dt_nascimento"
                  value={user.dt_nascimento}
                  onchange={e => setUser({...user, dt_nascimento: e.target.value})}
                />
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary btn-sm">
                <i className="fa fa-dot-circle-o"></i> Confirmar
              </button>
              &nbsp;
              <button type="reset" onClick={() => resetarForm()} className="btn btn-danger btn-sm">
                <i className="fa fa-ban"></i> Resetar
              </button>
              &nbsp;
              <button hidden={btnDel} type="button" onClick={() => remUser(user.id)} className="btn btn-danger btn-sm">
                <i className="fa fa-trash"></i> Remover
              </button>
            </div>
          </form>
        </div>

        <div className="table-responsive table--no-card m-b-30">
            <Table
              thead={[
                [
                  {text: "ID"},
                  {text: "Nome"},
                  {text: "Email"},
                  {text: "Cargo"},
                  {text: "Data Nascimento"}
                ]
              ]}
            >
              <tbody>
                {
                  users.map((user) => (
                    <tr key={user.id} onClick={() => editar(user)}>
                      <td>{user.id}</td>
                      <td>{user.nome}</td>
                      <td>{user.email}</td>
                      <td>{(user.cargo=='admin')?'Administrador':'Normal'}</td>
                      <td>{mostraData(user.dt_nascimento)}</td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
        </div>
      </Corpo>
    </>
  )
}