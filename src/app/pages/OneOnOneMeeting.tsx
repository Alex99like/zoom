import { EuiFlexGroup, EuiForm, EuiSpacer } from "@elastic/eui"
import { Header } from "../components/Header"
import { MeetingNameField } from "../components/FormComponents/MeetingNameField"
import { useState } from "react"
import { MeetingUsersField } from "../components/FormComponents/MeetingUsersField"
import { useAuth } from "../hooks/useAuth"
import { useFetchUsers } from "../hooks/useFetchUsers"
import moment from "moment"
import { MeetingsDateField } from "../components/FormComponents/MeetingsDateField"
import { CreateMeetingButtons } from "../components/FormComponents/CreateMeetingButtons"
import { FieldErrorType, UserType } from "../../utils/Types"
import { addDoc } from "firebase/firestore"
import { meetingsRef } from "../../utils/FirebaseConfig"
import { generateMeetingId } from "../../utils/generateMeetingId"
import { useAppSelector } from "../hooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "../hooks/useToast"

export const OneOnOneMeeting = () => {
  useAuth()
  const [users] = useFetchUsers()
  const [createToast] = useToast()
  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid)
  const navigate = useNavigate()

  const [meetingName, setMeetingName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
  const [startDate, setStartDate] = useState(moment())
  const [showErrors, setShowErrors] = useState<{
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

  const onUserChange = (selectedOptions: any) => {
    setSelectedUsers(selectedOptions)
  }

  const validateForm = () => {
    let errors = false
    const clonedShowErrors = { ...showErrors }

    if (!meetingName.length) {
      clonedShowErrors.meetingName.show = true
      clonedShowErrors.meetingName.message = ['Введите Имя']
      errors = true
    } else {
      clonedShowErrors.meetingName.show = false
      clonedShowErrors.meetingName.message = []
    }

    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true
      clonedShowErrors.meetingUser.message = ['Выберете пользователей']
      errors = true
    } else {
      clonedShowErrors.meetingUser.show = false
      clonedShowErrors.meetingUser.message = []
    }

    setShowErrors(clonedShowErrors)
    return errors
  }

  const createMeeting = async () => {
    if (!validateForm()) {
      const meetingId = generateMeetingId()
      await addDoc(meetingsRef, {
        createdBy: uid,
        meetingId,
        meetingName,
        meetingType: '1-on-1',
        invitedUsers: [selectedUsers[0].uid],
        meetingDate: startDate.format('L'),
        maxUsers: 1,
        status: true
      })
      createToast({
        title: 'Мит один на один создан успешно',
        type: 'success'
      })
      navigate('/')
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        flexDirection: 'column'
      }}
    >
      <Header />
      <EuiFlexGroup
        justifyContent="center"
        alignItems="center"
      >
        <EuiForm>
          <MeetingNameField 
            label='Имя Мита'
            placeholder='Мит'
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          <MeetingUsersField
            label="Пригласить"
            options={users}
            onChange={onUserChange}
            selectedOptions={selectedUsers}
            singleSelection={{ asPlainText: true }}
            isClearable={false}
            placeholder="Выбрать пользователей"
            isInvalid={showErrors.meetingUser.show}
            error={showErrors.meetingUser.message}
          />
          <MeetingsDateField
            selected={startDate}
            setStartDate={setStartDate}
          />
          <EuiSpacer />
          <CreateMeetingButtons 
            createMeeting={createMeeting}
          />
        </EuiForm>
      </EuiFlexGroup>
    </div>
  )
}
