import useAppData from "../data/hook/useAppData"

export default function Alerta(props) {

    let id = props.id
    const { avisos } = useAppData()

    console.log(avisos)

    return (avisos[id] != undefined && avisos.campo != null) ? (
        <div className={`alert alert-${avisos[id].className}`}>{avisos[id].msg}</div>
    ): (null)
}