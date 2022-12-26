import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface PhoneNumberInputI {
  value: string
  name: string
  onChange: (name: string, value: string) => void
}


const PhoneNumberInput: React.FC<PhoneNumberInputI> = (props): React.ReactElement => {
  const { name, value, onChange } = props
  return (
    <PhoneInput
      country={'IN'}
      value={value}
      onChange={phone => onChange(name, phone)}
    />
  )
}


export default PhoneNumberInput