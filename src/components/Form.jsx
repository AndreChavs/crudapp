import React from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import SendIcon from '@mui/icons-material/Send'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import { useFormik } from 'formik'
import { postUser, getUsers } from '../../functions/requests'

const Form = ({ setDados }) => {
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      genero: '',
      date: '',
      salary: '',
      status: ''
    },
    onSubmit: handleSubmit
  })
  function handleSubmit(values) {
    //no validation
    const { firstname, lastname, date, email, genero, salary, status } = values
    const formData = {
      name: `${firstname} ${lastname}`,
      email: email,
      genero: genero,
      date: date,
      salary: salary,
      status: status
    }
    async function postData() {
      await postUser(formData)
      const { users } = await getUsers()
      setDados(users)
    }
    postData()
    // postUser(formData)
    // getUsers().then((data) => setDados(data.users))
    formik.resetForm()
  }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '40ch' }
      }}
      autoComplete="off"
      onSubmit={formik.handleSubmit}
    >
      <div style={{ display: 'flex' }}>
        {/* Firstname */}
        <Box
          sx={{
            maxWidth: '100%'
          }}
        >
          <TextField
            fullWidth
            type={'text'}
            label="Primeiro Nome"
            id="fristname"
            name="fristname"
            {...formik.getFieldProps('firstname')}
          />
        </Box>
        {/* lastname */}
        <Box
          sx={{
            maxWidth: '100%'
          }}
        >
          <TextField
            fullWidth
            label="Sobrenome"
            id="lastname"
            name="lastname"
            {...formik.getFieldProps('lastname')}
          />
        </Box>
        {/* Email */}
        <Box
          sx={{
            maxWidth: '100%'
          }}
        >
          <TextField
            fullWidth
            type={'email'}
            label="Email"
            id="email"
            name="email"
            {...formik.getFieldProps('email')}
          />
        </Box>
      </div>
      {/* Genero */}
      <div style={{ paddingLeft: '10px' }}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Genero</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="genero"
            {...formik.getFieldProps('genero')}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              name="genero"
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              name="genero"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div style={{ display: 'flex' }}>
        {/* Date */}
        <TextField
          id="date"
          name="date"
          label="Birthday"
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
          {...formik.getFieldProps('date')}
        />
        {/* Salary */}
        <Box
          sx={{
            maxWidth: '100%'
          }}
        >
          <TextField
            fullWidth
            type={'number'}
            label="Salary R$"
            id="salary"
            name="salary"
            {...formik.getFieldProps('salary')}
          />
        </Box>
        {/* Status */}
        <FormControl style={{ marginLeft: '20px' }}>
          <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="status"
            {...formik.getFieldProps('status')}
          >
            <FormControlLabel
              value="active"
              control={<Radio />}
              label="Active"
              name="status"
            />
            <FormControlLabel
              value="inactive"
              control={<Radio />}
              label="Inactive"
              name="status"
            />
          </RadioGroup>
        </FormControl>
      </div>

      <Stack spacing={1} direction="row">
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          size="large"
        >
          Enviar
        </Button>
      </Stack>
    </Box>
  )
}

export default Form
