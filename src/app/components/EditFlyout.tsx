import { useEffect, useState } from "react"
import { FieldErrorType, MeetingType, UserType } from "../../utils/Types"
import { useAuth } from "../hooks/useAuth"
import { useFetchUsers } from "../hooks/useFetchUsers"
import { useToast } from "../hooks/useToast"
import moment from "moment"
import { doc, updateDoc } from "firebase/firestore"
import { firebaseDB } from "../../utils/FirebaseConfig"
import { EuiFlyout, EuiFlyoutBody, EuiFlyoutHeader, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch, EuiTitle } from "@elastic/eui"
import { MeetingNameField } from "./FormComponents/MeetingNameField"
import { MeetingMaximumUserField } from "./FormComponents/MeetingMaximumUserField"
import { MeetingUsersField } from "./FormComponents/MeetingUsersField"
import { MeetingsDateField } from "./FormComponents/MeetingsDateField"
import { CreateMeetingButtons } from "./FormComponents/CreateMeetingButtons"

interface EditFlyoutProps {
  closeFlyout: any
  meetings: MeetingType | undefined
}

export const EditFlyout = ({
  closeFlyout, meetings
}: EditFlyoutProps) => {
  useAuth()
  const [users] = useFetchUsers()
  const [createToast] = useToast()

  const [meetingName, setMeetingName] = useState<string>(meetings?.meetingName || '')
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
  const [startDate, setStartDate] = useState(moment(meetings?.meetingDate))
  const [size, setSize] = useState(1)
  const [meetingType] = useState(meetings?.meetingType)
  const [status, setStatus] = useState(false)

  const [showErrors] = useState<{
    meetingName: FieldErrorType,
    meetingUser: FieldErrorType
  }>({
    meetingName: {
      show: false,
      message: []
    },
    meetingUser: {
      show: false,
      message: []
    }
  })

  useEffect(() => {
    if (users) {
      const foundUsers: Array<UserType> = []
      meetings?.invitedUsers.forEach((user) => {
        const findUser = users.find(
          (tempUser: UserType) => tempUser.uid === user
        )
        if (findUser) foundUsers.push(findUser)
      })
      setSelectedUsers(foundUsers)
    }
  }, [meetings, users])

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions)
  }

  const editMeeting = async () => {
    const editedMeeting = {
      ...meetings,
      meetingName,
      meetingType,
      invitedUsers: selectedUsers.map((user) => user.uid),
      maxUsers: size,
      meetingDate: startDate.format('L'),
      status: !status
    }
    delete editedMeeting.docId
    const docRef = doc(firebaseDB, 'meetings', meetings?.docId!)
    await updateDoc(docRef, editedMeeting)
    createToast({ title: 'Meeting updated successfully', type: 'success' })
    closeFlyout(true)
  }

  return (
    <EuiFlyout ownFocus onClose={() => closeFlyout()}>
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>{meetings?.meetingName}</h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiForm>
          <MeetingNameField
            label="Имя Мита"
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
            placeholder="Мит"
            value={meetingName}
            setMeetingName={setMeetingName}
          />
          {meetingType === 'anyone-can-join' ? (
            <MeetingMaximumUserField value={size} setValue={setSize} />
          ) : (
            <MeetingUsersField
              label="Пользовтели"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={
                meetingType === '1-on-1'? { asPlainText: true } : false
              }
              isClearable={false}
              placeholder="Выбрать пользователей"
            />
          )}
          <MeetingsDateField selected={startDate} setStartDate={setStartDate} />
          <EuiFormRow display="columnCompressedSwitch" label="Закрыть Мит">
            <EuiSwitch
              showLabel={false}
              label='Закрыть Мит'
              checked={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
          </EuiFormRow>
          <EuiSpacer />
          <CreateMeetingButtons
            createMeeting={editMeeting}
            isEdit
            closeFlyout={closeFlyout}
          />
        </EuiForm>
      </EuiFlyoutBody>
    </EuiFlyout>
  )
}
