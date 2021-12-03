export default function Select(props) {

    let label       = props.label
    let id          = props.id
    let required    = props?.required
    let name        = props?.name
    let value       = props?.value
    let onchange    = props?.onchange
    let disabled    = props?.disabled
    let options     = (props.items)??['Não há opção']

    function renderOptions() {

        return options.map((item, i) => {

            if(typeof item === 'object') {

                let key = Object.keys(item)[0]
    
                return (key == value) ? (
                    <option key={key} selected value={key}>{item[key]}</option>
                ) : (
                    <option key={key} value={key}>{item[key]}</option>
                )
            } else {
                
                return (i == value) ? (
                    <option key={i} selected value={i}>{item}</option>
                ) : (
                    <option key={i} value={i}>{item}</option>
                )
            }
        })
    }

    return (
        <div className="row form-group">
            <div className="col col-md-3">
                <label htmlFor={id} className="form-control-label">{label}</label>
            </div>
            <div className="col-12 col-md-9">
                <select name={name} id={id} 
                    required={(required)??false} 
                    onChange={onchange} 
                    disabled={disabled}
                    className="form-control">
                    {renderOptions()}
                </select>
            </div>
        </div>
    )
}