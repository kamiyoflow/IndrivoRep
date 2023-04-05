import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'userName', headerName: 'UserName', width: 600 },
    { field: 'age', headerName: 'Age', width: 300 },
    { field: 'email', headerName: 'Email', width: 600 }
]


const AdminPage = () => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch("https://localhost:7156/api/users")
            .then((data) => data.json())
            .then((data) => setTableData(data))

    }, [])

    console.log(tableData)

    return (
        <><ResponsiveAppBar></ResponsiveAppBar>
        <div style={{ height: 700, width: '100%' }}>
            <DataGrid
                rows={tableData}
                columns={columns} />
        </div>
        </>
    )
}

export default AdminPage