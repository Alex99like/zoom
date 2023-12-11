import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { useEffect, useState } from "react"
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem, EuiHeader, EuiText, EuiTextColor } from "@elastic/eui"
import { signOut } from "firebase/auth"
import { firebaseAuth } from "../../utils/FirebaseConfig"
import { getCreateMeetingBreadCrumbs, getMeetingsBreadcrumbs, getMyMeetingsBreadcrumbs, getOneOnOneMeetingBreadCrumbs, getVideoConferenceMeetingBreadCrumbs } from "../../utils/breadCrumps"

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
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
      setBreadCrumbs(getCreateMeetingBreadCrumbs(navigate))
    else if (pathname === '/create1on1')
      setBreadCrumbs(getOneOnOneMeetingBreadCrumbs(navigate))
    else if (pathname === '/createvideoconference')
      setBreadCrumbs(getVideoConferenceMeetingBreadCrumbs(navigate))
    else if (pathname === '/mymeetings')
      setBreadCrumbs(getMyMeetingsBreadcrumbs(navigate))
    else if (pathname === '/meetings')
      setBreadCrumbs(getMeetingsBreadcrumbs(navigate))
  }, [location, navigate])

//   const invertTheme = () => {
//     const theme = localStorage.getItem('zoom-theme')
//     localStorage.setItem('zoom-theme', theme === 'light' ? 'DARK' : 'light')
//     dispatch(changeTheme({ isDarkTheme: !isDarkTheme }))
//   }

  const section = [
    {
      items: [
        <Link to={'/'}>
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
        <Link to={'/'}>
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
