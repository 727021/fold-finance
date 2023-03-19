import { useFormContext } from 'remix-validated-form'
import Button from '@mui/material/Button'
import type { ButtonProps } from '@mui/material/Button'
import type { ReactNode } from 'react'

type SubmitButtonProps = { submitting?: ReactNode } & Omit<ButtonProps, 'type' | 'disabled'>

const SubmitButton = ({ children, submitting, ...props }: SubmitButtonProps) => {
  const { isValid, isSubmitting } = useFormContext()

  return (
    <Button type="submit" disabled={isSubmitting || !isValid} {...props}>
      {isSubmitting ? (submitting ?? children) : children}
    </Button>
  )
}

export default SubmitButton
