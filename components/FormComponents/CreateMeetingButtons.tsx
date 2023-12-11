import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui"
import { useRouter } from "next/navigation"

interface CreateMeetingButtonsProps {
  createMeeting: () => void
  isEdit?: boolean
  closeFlyout?: () => void
}

export const CreateMeetingButtons = ({
  createMeeting, closeFlyout, isEdit
}: CreateMeetingButtonsProps) => {
  const { push } = useRouter()

  return (
    <EuiFlexGroup>
      <EuiFlexItem grow={false}>
        <EuiButton 
          style={{ fontWeight: 600, color: '#fff' }} 
          color="danger" 
          fill 
          onClick={() => (isEdit ? closeFlyout!() : push('/'))}
        >
          Отменить
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton 
          style={{ fontWeight: 600 }} 
          fill 
          onClick={createMeeting}
        >
          Сохранить
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  )
}
