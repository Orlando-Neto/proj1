interface thProps {
    text: string
    colspan?: number
}

interface tdProps {
    text: string
    colspan?: number
}

interface tableProps {
    thead?: thProps[][]
    tbody?: tdProps[][]
    tfoot?: any
    className?: string
    children?: any
}

export default function Table(props: tableProps) {

    let thead = props?.thead
    let tbody = props?.tbody
    let tfoot = props?.tfoot
    let className = props?.className

    function renderTHead() {

        let theadHtml = []

        let tr = []
        if(thead != undefined && thead.length > 0) {
            thead.map((v, i) => {
                
                let th = []
            
                if(v.length > 1) {
                    v.map((v2, i2) => {
                        th.push(<th key={i+'_'+i2} colSpan={(v2.colspan)??1}>{v2.text}</th>)
                    })
                } else {
                    th.push(<th key={i+'_'+0} colSpan={(v[0].colspan)??1}>{v[0].text}</th>)
                }
                
                tr.push(<tr key={'tr'+i}>{th}</tr>)
            })
        }
        
        theadHtml.push(<thead key={'thead'}>{tr}</thead>)

        return (
            theadHtml
        )
    }
    
    function renderTBody() {

        let tbodyHtml = []

        let tr = []
        if(tbody != undefined && tbody.length > 0) {

            tbody.map((v, i) => {
                
                let td = []
            
                if(v.length > 1) {
                    v.map((v2, i2) => {
                        td.push(<td key={i+'_'+i2} colSpan={(v2.colspan)??1}>{v2.text}</td>)
                    })
                } else {
                    td.push(<td key={i+'_'+0} colSpan={(v[0].colspan)??1}>{v[0].text}</td>)
                }
                
                tr.push(<tr key={'tr'+i}>{td}</tr>)
            })
        }

        tbodyHtml.push(<tbody key={'tbody'}>{tr}</tbody>)

        return (
            tbodyHtml
        )
    }

    function renderTFoot() {

        let tfootHtml = []

        let tr = []
        if(tfoot != undefined && tfoot.length > 0) {

            tfoot.map((v, i) => {
                
                let td = []
            
                if(v.length > 1) {
                    v.map((v2, i2) => {
                        td.push(<td key={i+'_'+i2} colSpan={(v2.colspan)??1}>{v2.text}</td>)
                    })
                } else {
                    td.push(<td key={i+'_'+0} colSpan={(v[0].colspan)??1}>{v[0].text}</td>)
                }
                
                tr.push(<tr key={'tr'+i}>{td}</tr>)
            })
        }

        tfootHtml.push(<tfoot key={'tfoot'}>{tr}</tfoot>)

        return (
            tfootHtml
        )
    }

    return (
        <table className={className}>
            {renderTHead()}

            {(tbody)?renderTBody():<>{props.children}</>}

            {renderTFoot()}
        </table>
    )
}