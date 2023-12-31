//import { Link, useLocation, useNavigate } from ""
import { useEffect, useState } from "react"
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from "@elastic/eui"
import { signOut } from "firebase/auth"
import { firebaseAuth } from "@/utils/FirebaseConfig"
import { 
  getCreateMeetingBreadCrumbs, 
  getMeetingsBreadcrumbs, 
  getMyMeetingsBreadcrumbs, 
  getOneOnOneMeetingBreadCrumbs, 
  getVideoConferenceMeetingBreadCrumbs 
} from "@/utils/breadCrumps"
import { useAppSelector } from "@/store/hooks"
import { useRouter } from "next/navigation"
import Link from "next/link"

export const Header = () => {
  const { push } = useRouter()
  //const location = useLocation()
  const username = useAppSelector(zoom => zoom.auth.userInfo?.name)
  //const isDarkTheme = useAppSelector((zoom) => zoom.auth.isDarkTheme)
  const [breadCrumbs, setBreadCrumbs] = useState([{ text: 'Главная' }])
  const [isResponsive, setIsResponsive] = useState(false)
  // const dispatch = useDispatch()
  const logout = () => {
    signOut(firebaseAuth)
  }

  useEffect(() => {
    const { pathname } = location
    if (pathname === '/create') 
      setBreadCrumbs(getCreateMeetingBreadCrumbs(push))
    else if (pathname === '/create1on1')
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(push))
    else if (pathname === '/createvideoconference')
      setBreadCrumbs(getVideoConferenceMeetingBreadCrumbs(push))
    else if (pathname === '/mymeetings')
      setBreadCrumbs(getMyMeetingsBreadcrumbs(push))
    else if (pathname === '/meetings')
      setBreadCrumbs(getMeetingsBreadcrumbs(push))
  }, [push])

//   const invertTheme = () => {
//     const theme = localStorage.getItem('zoom-theme')
//     localStorage.setItem('zoom-theme', theme === 'light' ? 'DARK' : 'light')
//     dispatch(changeTheme({ isDarkTheme: !isDarkTheme }))
//   }

  const section = [
    {
      items: [
        <Link href={'/'}>
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">
                VC
              </EuiTextColor>
            </h2>
          </EuiText>
        </Link>
      ]
    },
    {
      items: [
        <>
          {username ? (
            <EuiText>
              <h3>
                <EuiTextColor color="white">{username}</EuiTextColor>
                {/* <EuiTextColor color="#0b5cff">{username}</EuiTextColor> */}
              </h3>
            </EuiText>
          ) : null}
        </>
      ]
    },
    {
      items: [
        <EuiFlexGroup
          justifyContent="center"
          alignItems="center"
          direction="row"
          style={{ gap: '2vw' }}
        >
          <EuiFlexItem grow={false} style={{ flexBasis: 'fit-content' }}>
            <EuiButtonIcon
              onClick={logout}
              iconType={'lock'}
              display="fill"
              size="s"
              aria-label="logout-button"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      ]
    }
  ]
  const responsiveSection = [
    {
      items: [
        <Link href={'/'}>
          <EuiText>
            <h2 style={{ padding: '0 1vw' }}>
              <EuiTextColor color="#0b5cff">
                Zoom
              </EuiTextColor>
            </h2>
          </EuiText>
        </Link>
      ]
    },
  ]

  useEffect(() => {
    if (window.innerWidth < 480) setIsResponsive(true)
  }, [])

  return (
    <>
      <EuiHeader
        style={{ minHeight: '8vh' }}
        theme="dark"
        sections={isResponsive ? responsiveSection : section}
      />
      <EuiHeader style={{ minHeight: '8vh' }} 
        sections={[{ breadcrumbs: breadCrumbs }]}
      />

    </>
  )
}
