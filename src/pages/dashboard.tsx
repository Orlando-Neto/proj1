import Head from '../components/Layout/Head'
import Corpo from '../components/Layout/Corpo'
import Table from '../components/Table'

// Display list of users (in /pages/index.tsx)
export default function DashBoardPage() {

    return (
        <>
            <Head />

            <Corpo>
                <Table
                    className="table table-borderless table-striped table-earning"
                    thead={[
                        [
                            {text: 'Olá'},
                            {text: 'tchau'}
                        ],
                        [
                            {text: 'olá 2', colspan: 2}
                        ]
                    ]}
                >
                </Table>
            </Corpo>
        </>
    )
}