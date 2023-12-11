import { getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { meetingsRef } from "../../utils/FirebaseConfig"
import { useAppSelector } from "../hooks"
import { MeetingType } from "../../utils/Types"
import { useAuth } from "../hooks/useAuth"
import { Header } from "../components/Header"
import { EuiBadge, EuiBasicTable, EuiButton, EuiButtonIcon, EuiCopy, EuiFlexGroup, EuiFlexItem, EuiPanel } from "@elastic/eui"
import { Link } from "react-router-dom"
import moment from "moment"
import { EditFlyout } from "../components/EditFlyout"

export const Meetings = () => {
  useAuth()
  const [meetings, setMeeting] = useState<any>([])
  const userInfo = useAppSelector(zoom => zoom.auth.userInfo)

  useEffect(() => {  
    if (userInfo) {
      const getUserMeetings = async () => {
        const firestoreQuery = query(meetingsRef)
        const fetchedMeeting = await getDocs(firestoreQuery)
        if (fetchedMeeting.docs.length) {
          const myMeetings: Array<MeetingType> = []
          fetchedMeeting.forEach(meeting => {
            const data = meeting.data() as MeetingType
            if (data.createdBy === userInfo?.uid) myMeetings.push(data)
            else if (data.meetingType === 'anyone-can-join') myMeetings.push(data)
            else {
              const index = data.invitedUsers.findIndex(
                (user) => user === userInfo.uid
              )
              if (index !== -1) {
                myMeetings.push(data)
              }
            }
          })
          setMeeting(myMeetings)
        }
      }
      getUserMeetings()
    }
  }, [userInfo])

  const columns = [
    {
      field: 'meetingName',
      name: 'Имя'
    },
    {
      field: 'meetingType',
      name: 'Тип'
    },
    {
      field: 'meetingDate',
      name: 'Дата'
    },
    {
      field: '',
      name: 'Статус',
      render: (meeting: MeetingType) => {
        if (meeting.status) {
          if (meeting.meetingDate === moment().format('L')) {
            return <EuiBadge color="success">
              <Link
                style={{ color: 'black' }}
                to={`/join/${meeting.meetingId}`}
              >
                Присоединится
              </Link>
            </EuiBadge>
          } else if (moment(meeting.meetingDate).isBefore(moment().format('L'))) {
            return <EuiBadge color="default">Ended</EuiBadge>
          } else {
            return <EuiBadge color={'primary'}>Upcoming</EuiBadge>
          }
        } else return <EuiBadge color="danger">Cancelled</EuiBadge>
      } 
    },
    {
      field: 'meetingId',
      name: 'Копировать',
      render: (meetingId: string) => {
        return (
          <EuiCopy textToCopy={`${process.env.REACT_APP_HOST}/join/${meetingId}`}>
            {(copy) => (
              <EuiButtonIcon 
                iconType={'copy'}
                onClick={copy}
                display="base"
                aria-label="Meeting-copy"
              />
            )}
          </EuiCopy>
        )
      }
    }
  ]

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
        style={{ margin: '1rem' }}
      >
        <EuiFlexItem>
          <EuiPanel>
            <EuiBasicTable items={meetings} columns={columns} />
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}
