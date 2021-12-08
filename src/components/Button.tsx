export default function Input(props) {

    let type        = props.type
    let id          = props.id
    let onclick     = props?.onclick
    let value       = props?.value
    let children    = props?.children
    let className   = props?.className

    return (
        <button id={id} type={type} onClick={onclick} 
            className={className}>{(value) ?? children}</button>
    )
}