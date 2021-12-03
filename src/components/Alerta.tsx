import useAppData from "../data/hook/useAppData"

export default function Alerta(props) {

    let id = props.id
    const { avisos } = useAppData()

    return (avisos[id] != undefined && avisos.campo == undefined) ? (
        <div className={`alert alert-${avisos[id].className}`}>{avisos[id].msg}</div>
    ): (null)
}