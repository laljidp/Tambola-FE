import React, { createContext, useContext, useState } from 'react'

const SnackBarContext = createContext({
  snackbar: {
    show: false,
    type: '',
    message: ''
  },
  hideSnackbar: () => { },
  showError: (message: string) => {}
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

function useProvideSnackbar() {
  const [snackbar, setSnackbar] = useState({
    show: false,
    type: '',
    message: ''
  })

  const hideSnackbar = () => {
    setSnackbar({
      show: false,
      type: '',
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

  return {
    snackbar,
    hideSnackbar,
    showError
  }
}