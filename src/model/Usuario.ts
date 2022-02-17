export default interface Usuario {
    id?: number
    nome: string
    email: string
    senha?: string
    cargo?: string
    dt_nascimento?: Date|string
}