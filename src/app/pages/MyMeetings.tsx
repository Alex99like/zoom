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

export const MyMeetings = () => {
  useAuth()
  const [meetings, setMeeting] = useState<any>([])
  const userInfo = useAppSelector(zoom => zoom.auth.userInfo)

  const getMyMeetings = async () => {
    const firestoreQuery = query(meetingsRef, where('createdBy', '==', userInfo?.uid))
    const fetchedMeetings = await getDocs(firestoreQuery)
  
    if (fetchedMeetings.docs.length) {
      const myMeetings: Array<MeetingType> = []
      fetchedMeetings.forEach((meeting) => {
        myMeetings.push({
          docId: meeting.id,
          ...(meeting.data() as MeetingType)
        })
      })
      setMeeting(myMeetings)
    } 
  }

  useEffect(() => {  
    getMyMeetings()
  }, [userInfo])

  const [showEditFlyout, setShowEditFlyout] = useState(false)
  const [editMeeting, setEditMeeting] = useState<MeetingType>()

  const openEditFlyout = (meeting: MeetingType) => {
    setShowEditFlyout(true)
    setEditMeeting(meeting)
  }

  const closeEditFlyout = (dataChanged = false) => {
    setShowEditFlyout(false)
    setEditMeeting(undefined)
    if (dataChanged) getMyMeetings()
  }

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
                Присоединиться
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
      field: '',
      name: 'Изменить',
      render: (meeting: MeetingType) => {
        return <EuiButtonIcon 
          aria-label="meeting-edit" 
          iconType={'indexEdit'} 
          color='danger' 
          display="base" 
          isDisabled={!meeting.status || moment(meeting.meetingDate).isBefore(moment().format('L'))}
          onClick={() => openEditFlyout(meeting)} 
        />
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
      {showEditFlyout && (
        <EditFlyout closeFlyout={closeEditFlyout} meetings={editMeeting} />
      )}
    </div>
  )
}
