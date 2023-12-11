import { EuiComboBox, EuiFormRow } from "@elastic/eui"

interface MeetingUsersFieldProps {
  label: string
  options: any
  onChange: any
  selectedOptions: any
  isClearable: boolean
  placeholder: string
  singleSelection: any
  isInvalid: boolean
  error: Array<string>
}

export const MeetingUsersField = ({
  label,
  options,
  onChange,
  selectedOptions,
  isClearable,
  placeholder,
  error,
  isInvalid,
  singleSelection = false
}: MeetingUsersFieldProps) => {
  return (
    <EuiFormRow 
      label={label}
      isInvalid={isInvalid}
      error={error}
    >
      <EuiComboBox
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        placeholder={placeholder}
        isClearable={isClearable}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  )
}
