'use client'

import { EuiFlexGroup, EuiForm, EuiFormRow, EuiSpacer, EuiSwitch } from "@elastic/eui"
import { useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useFetchUsers } from "@/hooks/useFetchUsers"
import moment from "moment"
import { FieldErrorType, UserType } from "../../utils/Types"
import { addDoc } from "firebase/firestore"
import { meetingsRef } from "../../utils/FirebaseConfig"
import { generateMeetingId } from "../../utils/generateMeetingId"
import { useAppSelector } from "@/store/hooks"
import { useToast } from "@/hooks/useToast"
import { MeetingNameField } from "@/components/FormComponents/MeetingNameField"
import { Header } from "@/components/Header"
import { MeetingMaximumUserField } from "@/components/FormComponents/MeetingMaximumUserField"
import { MeetingUsersField } from "@/components/FormComponents/MeetingUsersField"
import { MeetingsDateField } from "@/components/FormComponents/MeetingsDateField"
import { CreateMeetingButtons } from "@/components/FormComponents/CreateMeetingButtons"
import { useRouter } from "next/navigation"

const VideoConference = () => {
  useAuth()
  const [users] = useFetchUsers()
  const [createToast] = useToast()
  const { push } = useRouter()

  const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid)

  const [meetingName, setMeetingName] = useState('')
  const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([])
  const [startDate, setStartDate] = useState(moment())
  const [size, setSize] = useState(1)
  const [anyoneCanJoin, setAnyoneCanJoin] = useState(false)
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
      clonedShowErrors.meetingName.message = ['Введите имя']
      errors = true
    } else {
      clonedShowErrors.meetingName.show = false
      clonedShowErrors.meetingName.message = []
    }

    if (!selectedUsers.length) {
      clonedShowErrors.meetingUser.show = true
      clonedShowErrors.meetingUser.message = ['Выберите пользователей']
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
        meetingType: anyoneCanJoin ? 'anyone-can-join' : 'video-conference',
        invitedUsers: anyoneCanJoin
          ? []
          : selectedUsers.map((user: UserType) => user.uid),
        meetingDate: startDate.format('L'),
        maxUsers: anyoneCanJoin ? 100 : size,
        status: true
      })
      createToast({
        title: anyoneCanJoin 
          ? 'Видеоконферения создана для всех' 
          : 'Видеоконферения создана успешная',
        type: 'success'
      })
      push('/')
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
          <EuiFormRow display="columnCompressedSwitch" label='Каждый может присоединиться'>
            <EuiSwitch 
              showLabel={false}
              label='Каждый может присоединиться'
              checked={anyoneCanJoin}
              onChange={(e) => setAnyoneCanJoin(e.target.checked)}
              compressed
            />
          </EuiFormRow>
          <MeetingNameField 
            label='Имя Мита'
            placeholder='Мит'
            value={meetingName}
            setMeetingName={setMeetingName}
            isInvalid={showErrors.meetingName.show}
            error={showErrors.meetingName.message}
          />
          {anyoneCanJoin ? (
            <MeetingMaximumUserField
              value={size}
              setValue={setSize}
            />
          ) : (
            <MeetingUsersField
              label="Пригласить"
              options={users}
              onChange={onUserChange}
              selectedOptions={selectedUsers}
              singleSelection={false}
              isClearable={false}
              placeholder="Выбрать пользователей"
              isInvalid={showErrors.meetingUser.show}
              error={showErrors.meetingUser.message}
            />
          )}
          
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

export default VideoConference