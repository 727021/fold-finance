import { useField } from 'remix-validated-form'
import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'

type TextFieldProps = Omit<MuiTextFieldProps, 'name' | 'disabled'> & { name: string }

const TextField = ({ name, children, ...props }: TextFieldProps) => {
  const { error, getInputProps } = useField(name)

  return (
    <MuiTextField {...(error ? { error: true, helperText: error } : {})} {...getInputProps()} {...props}>
      {children}
    </MuiTextField>
  )
}

export default TextField
