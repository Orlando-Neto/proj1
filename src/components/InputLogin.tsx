import useAppData from "../data/hook/useAppData"

export default function InputLogin(props) {

    let label       = props.label
    let type        = props.type
    let id          = props.id
    let required    = props?.required
    let value       = props?.value
    let name        = props?.name
    let onchange    = props?.onchange
    let placeholder = props?.placeholder

    const { avisos } = useAppData()

    return (
        <div className="form-group">
            <label>{label}</label>
            <input className="au-input au-input--full" 
                onChange={onchange} 
                type={type} name={name} 
                placeholder={placeholder} 
                value={value}
                required={(required)??false} />
            {(avisos.campo != undefined && avisos.campo[id] != undefined) ? (
                <span className={`alert alert-danger`}>{avisos.campo[id]}</span>
            ): (null)}
        </div>
    )
}