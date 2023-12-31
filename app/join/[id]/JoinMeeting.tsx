'use client'

import { useToast } from "@/hooks/useToast"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth, meetingsRef } from "@/utils/FirebaseConfig"
import { getDocs, query, where } from "firebase/firestore"
import moment from "moment"
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt'
import { generateMeetingId } from "@/utils/generateMeetingId"
import { useParams, useRouter } from "next/navigation"

const JoinMeeting = () => {
  const params = useParams()
  const { push } = useRouter()
  const [createToast] = useToast()
  const [isAllowed, setIsAllowed] = useState(false)
  const [user, setUser] = useState<any>(undefined)
  const [userLoaded, setUserLoaded] = useState(false)

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setUser(currentUser)
    }
    setUserLoaded(true)
  })

  useEffect(() => {
    const getMeetingData = async () => {
      if (params.id && userLoaded) {
        const firestoreQuery = query(
          meetingsRef,
          where('meetingId', '==', params.id)
        )
        const fetchedMeeting = await getDocs(firestoreQuery)
        if (fetchedMeeting.docs.length) {
          const meeting = fetchedMeeting.docs[0].data()
          const isCreator = meeting.createdBy === user?.uid
          if (meeting.meetingType === '1-on-1') {
            if (meeting.invitedUsers[0] === user?.uid || isCreator) {
              if (meeting.meetingDate === moment().format('L')) {
                setIsAllowed(true)
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format('L'))
              ) {
                createToast({ title: 'Meeting has ended', type: 'danger' })
                push(user ? '/' : '/login')
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: 'warning'
                })
                push(user ? '/' : '/login')
              }
            } else push(user ? '/' : '/login')
          } else if (meeting.meetingType === 'video-conference') {
            const index = meeting.invitedUsers.findIndex(
              (invitedUser: string) => invitedUser === user?.uid
            )
            if (index !== -1 || isCreator) {
              if (meeting.meetingDate === moment().format('L')) {
                setIsAllowed(true)
              } else if (
                moment(meeting.meetingDate).isBefore(moment().format('L'))
              ) {
                createToast({ title: 'Meeting has ended', type: 'danger' })
                push(user ? '/' : '/login')
              } else if (moment(meeting.meetingDate).isAfter()) {
                createToast({
                  title: `Meeting is on ${meeting.meetingDate}`,
                  type: 'warning'
                })
              }
            } else {
              createToast({
                title: 'You are not invited to the meeting',
                type: 'danger'
              })
              push(user ? '/' : '/login')
            }
          } else {
            setIsAllowed(true)
          }
        } else push('/')
      } 
    }
    getMeetingData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLoaded])

  const appId = 1069017457
  const serverSecret = 'f1591066c5f4ce9fbc6a8fc6381e86ed'

  const myMeeting = async (element: any) => {
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      params.id as string,
      user.uid ? user.uid : generateMeetingId(),
      user.displayName ? user.displayName : generateMeetingId()
    )
    const zp = ZegoUIKitPrebuilt.create(kitToken)
    zp.joinRoom({
      container: element,
      maxUsers: 50,
      sharedLinks: [
        {
          name: 'Personal Link',
          url: window.location.origin
        }
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference
      },
    })
  }

  return (
    <div>
      {isAllowed && (
        <div 
          className="myCallContainer" 
          ref={myMeeting} 
          style={{ width: '100%', height: '100vh' }}
        >
        </div>
      )}
    </div>
  )
}

export default JoinMeeting