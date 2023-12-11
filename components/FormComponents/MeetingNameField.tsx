import { EuiFieldText, EuiFormRow } from "@elastic/eui"
import { Dispatch, SetStateAction } from "react"


interface MeetingNameFieldProps {
  label: string
  placeholder: string
  value: string
  setMeetingName: Dispatch<SetStateAction<string>>
  isInvalid: boolean
  error: Array<string>
}

export const MeetingNameField = ({ 
  label, 
  placeholder, 
  setMeetingName, 
  value, 
  error, 
  isInvalid 
}: MeetingNameFieldProps) => {
  return (
    <EuiFormRow 
      label={label} 
      css={{ color: 'white' }} 
      isInvalid={isInvalid} 
      error={error}
    >
      <EuiFieldText 
        placeholder={placeholder}
        value={value}
        onChange={(e) => setMeetingName(e.target.value)}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  )
}
