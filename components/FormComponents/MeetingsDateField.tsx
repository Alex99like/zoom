import { EuiDatePicker, EuiFormRow } from "@elastic/eui"
import moment from "moment"
import { Dispatch, SetStateAction } from "react"

interface MeetingsDateFieldProps {
  selected: moment.Moment
  setStartDate: Dispatch<SetStateAction<moment.Moment>>
}

export const MeetingsDateField = ({
  selected,
  setStartDate
}: MeetingsDateFieldProps) => {
  return (
    <EuiFormRow>
      <EuiDatePicker
        selected={selected}
        onChange={(date) => setStartDate(date!)}
      />
    </EuiFormRow>
  )
}
