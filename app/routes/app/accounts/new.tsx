import type { ActionFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { db } from '~/services/db.server'
import { getCurrentUser } from '~/services/auth.server'
import { AccountType } from '@prisma/client'
import { withZod } from '@remix-validated-form/with-zod'
import { z } from 'zod'
import { validationError, ValidatedForm } from 'remix-validated-form'
import TextField from '~/components/TextField'
import SubmitButton from '~/components/SubmitButton'
import MenuItem from '@mui/material/MenuItem'
import { capitalize } from '~/utils/capitalize'
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog'
import { useNavigate } from '@remix-run/react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

export const validator = withZod(
  z.object({
    name: z.string().min(1, { message: 'Account name is required' }),
    type: z.nativeEnum(AccountType),
    balance: z.coerce.number()
  })
)

export const action: ActionFunction = async ({ request }) => {
  const user = await getCurrentUser(request)

  const data = await validator.validate(
    await request.formData()
  )

  if (data.error) {
    return validationError(data.error, data.submittedData)
  }

  const { balance, name, type } = data.data

  try {
    await db.account.create({
      data: {
        name,
        type,
        balance,
        ownerId: user.id
      }
    })

    return redirect('/app/accounts')
  } catch {
    return json({ error: 'There was an error' }, { status: 500 })
  }
}

const NewAccount = () => {
  const navigate = useNavigate()

  const handleClose = () => navigate('/app/accounts')

  return (
    <Dialog open onClose={handleClose} scroll="paper">
      <DialogTitle>New Account</DialogTitle>
      <ValidatedForm
        validator={validator}
        method="post"
        defaultValues={{
          type: AccountType.CHECKING
        }}
      >
      <DialogContent dividers>
        <Stack gap={2}>
          <TextField
            name="name"
            type="text"
            label="Account Name"
            variant="outlined"
            placeholder="My Account"
            autoFocus
          />
          <TextField name="type" select label="Account Type" variant="outlined">
            {Object.keys(AccountType).map(accountType => (
              <MenuItem key={accountType} value={accountType}>
                {capitalize(accountType)}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            name="balance"
            type="number"
            label="Starting Balance"
            variant="outlined"
            placeholder="0.00"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              )
            }}
            inputProps={{
              step: '0.01'
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <SubmitButton submitting="Submitting..." variant="outlined">Submit</SubmitButton>
      </DialogActions>
        </ValidatedForm>
    </Dialog>
  )
}

export default NewAccount
