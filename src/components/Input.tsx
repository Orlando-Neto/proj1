import useAppData from "../data/hook/useAppData"

export default function Input(props) {

    let label       = props.label
    let type        = props.type
    let id          = props.id
    let required    = props?.required
    let name        = props?.name
    let onchange    = props?.onchange
    let value       = props?.value
    let placeholder = props?.placeholder
    let className   = props?.className ?? "form-control"

    const { avisos } = useAppData()

    if(avisos.campo != undefined && avisos.campo[id] != undefined) {
        className += ' is-invalid'
    }

    return (
        <div className="row form-group">
            <div className="col col-md-3">
                <label htmlFor={id} className=" form-control-label">{label}:</label>
            </div>
            <div className="col-12 col-md-9">
                <input type={type} id={id} name={name} required={(required)??false}
                    onChange={onchange} value={value} placeholder={placeholder} 
                    className={className} />
                {(avisos.campo != undefined && avisos.campo[id] != undefined) ? (
                    <p className={`small text-red`}>{avisos.campo[id]}</p>
                ): (null)}
            </div>
        </div>
    )
}