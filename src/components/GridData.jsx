import React from 'react'
import { getUsers, updateUser, deleteUser } from '../../functions/requests'
import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'

export default function GridData({ dados, setDados }) {
  const columns = [
    {
      field: 'name',
      headerName: 'Full Name',
      width: 160,
      editable: true
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 190,
      editable: true
    },
    {
      field: 'date',
      headerName: 'Data',
      type: 'date',
      width: 100,
      editable: true
    },
    {
      field: 'salary',
      headerName: 'Salario',
      sortable: false,
      editable: true,
      width: 100
    },
    {
      field: 'genero',
      headerName: 'Genero',
      editable: true,
      sortable: false,
      width: 100
    },
    {
      field: 'status',
      headerName: 'Status',
      editable: true,
      sortable: false,
      width: 100
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => {
        function handleEdit() {
          const { name, email, genero, date, salary, status } = params.row
          const formData = {
            name,
            email,
            genero,
            date,
            salary,
            status
          }

          updateUser(params.id, formData)
          getUsers().then((data) => setDados(data.users))
        }
        function handleDelete() {
          deleteUser(params.id)
          getUsers().then((data) => setDados(data.users))
        }
        return (
          <>
            <Button onClick={handleEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )
      },
      width: 150
    }
  ]

  function handleCellClick(params) {
    if (params.hasFocus) {
      console.log(params)
    }
  }
  React.useEffect(() => {
    getUsers().then(({ users }) => {
      setDados(users)
    })
  }, [])

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      {dados && (
        <DataGrid
          rows={dados}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          onCellClick={handleCellClick}
          experimentalFeatures={{ newEditingApi: true }}
        />
      )}
    </Box>
  )
}
