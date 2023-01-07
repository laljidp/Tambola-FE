import React, { createContext, useContext, useState } from 'react'

export type AlertColor = 'success' | 'info' | 'warning' | 'error'

export interface SnackbarI {
  show: boolean
  type: AlertColor | undefined
  message: string
}

export interface SnackbarContextI {
  snackbar: SnackbarI
  hideSnackbar: () => void,
  showError: (message: string) => void,
  showSuccessMsg: (message: string) => void
}

const SnackBarContext = createContext<SnackbarContextI>({
  snackbar: {
    show: false,
    type: 'error',
    message: ''
  },
  hideSnackbar: () => { },
  showError: (message: string) => { },
  showSuccessMsg: (message: string) => { }
})

export const SnackBarProvider: React.FC<{ children: React.ReactNode }> = (props: any): React.ReactElement => {

  const snackbar = useProvideSnackbar()
  return (
    <SnackBarContext.Provider value={snackbar}>
      {props.children}
    </SnackBarContext.Provider>
  )
}

export const useSnackbar = () => {
  return useContext(SnackBarContext)
}

function useProvideSnackbar(): any {
  const [snackbar, setSnackbar] = useState<SnackbarI>({
    show: false,
    type: 'error',
    message: ''
  })

  const hideSnackbar = () => {
    setSnackbar({
      show: false,
      type: undefined,
      message: ''
    })
  }

  const showError = (message: string) => {
    setSnackbar({
      show: true,
      type: 'error',
      message
    })
  }

  const showSuccessMsg = (message: string) => {
    setSnackbar({
      show: true,
      type: 'success',
      message
    })
  }

  return {
    snackbar,
    hideSnackbar,
    showError,
    showSuccessMsg
  }
}