import { EuiFieldNumber, EuiFormRow } from "@elastic/eui"
import { Dispatch, SetStateAction } from "react"

interface MeetingMaximumUserFieldProps {
  value: number
  setValue: Dispatch<SetStateAction<number>>
}

export const MeetingMaximumUserField = ({
  setValue,
  value
}: MeetingMaximumUserFieldProps) => {
  return (
    <EuiFormRow label='Максимум людей'>
      <EuiFieldNumber
        placeholder="Максимум людей"
        min={1}
        max={50}
        value={value}
        onChange={(e) => {
          if (!e.target.value.length || +e.target.value === 0) setValue(1)
          else if (+e.target.value > 50) setValue(50)
          else setValue(+e.target.value)
        }}
      />
    </EuiFormRow>
  )
}
