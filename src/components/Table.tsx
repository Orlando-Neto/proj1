interface thProps {
    text: string
}

export default function Table(props) {

    let thead = props?.thead
    let tbody = props?.tbody
    let tfoot = props?.tfoot
    let className = props?.className

    function renderTHead() {

        let theadHtml = []

        console.log(thead)
        thead.map((v, i) => {

        })

        return theadHtml
    }

    return (
        <table className={className}>
            {(thead) ? <thead>{renderTHead()}</thead> : null}
        </table>
    )
}