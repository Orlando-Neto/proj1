import Head from 'next/head'

export default function HeadHtml(props) {

    let titulo = <title>Página simples</title>

    if(props.title) {
        titulo = <title>{props.title}</title>
    }

    if(props.children) {
        if(props.children.length > 1) {

            props.children.map(child => {
                if(child.type ==='title') {
                    titulo = child
                }
            })
        } else {
            if(props.children.type == 'title') titulo = props.children
        }
    }

    const tituloHtml = titulo

    return (
        <>
            <Head>
                
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <meta name="author" content="Orlando Neto" />

                {tituloHtml}

                <link href="/css/font-face.css" rel="stylesheet" media="all" />
                <link href="/vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all" />
                <link href="/vendor/font-awesome-5/css/fontawesome-all.min.css" rel="stylesheet" media="all" />
                <link href="/vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all" />

                <link href="/vendor/bootstrap-4.1/bootstrap.min.css" rel="stylesheet" media="all" />

                <link href="/vendor/animsition/animsition.min.css" rel="stylesheet" media="all" />
                <link href="/vendor/bootstrap-progressbar/bootstrap-progressbar-3.3.4.min.css" rel="stylesheet" media="all" />
                <link href="/vendor/wow/animate.css" rel="stylesheet" media="all" />
                <link href="/vendor/css-hamburgers/hamburgers.min.css" rel="stylesheet" media="all" />
                <link href="/vendor/slick/slick.css" rel="stylesheet" media="all" />
                <link href="/vendor/select2/select2.min.css" rel="stylesheet" media="all" />
                <link href="/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" media="all" />

                <link href="/css/theme.css" rel="stylesheet" media="all" />

            </Head>
        </>
    )
}