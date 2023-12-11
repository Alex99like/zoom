import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui"
import { useNavigate } from "react-router-dom"

interface CreateMeetingButtonsProps {
  createMeeting: () => void
}

export const CreateMeetingButtons = ({
  createMeeting
}: CreateMeetingButtonsProps) => {
  const navigate = useNavigate()

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton 
          style={{ fontWeight: 600, color: '#fff' }} 
          color="danger" 
          fill 
          onClick={() => navigate('/')}
        >
          Cancel
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton 
          style={{ fontWeight: 600 }} 
          fill 
          onClick={createMeeting}
        >
          Submit
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
