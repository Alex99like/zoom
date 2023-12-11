import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui"
import { Header } from "../components/Header"
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router-dom"
import meeting from '../assets/couple.png'
import meeting2 from '../assets/online-communication.png'

export const CreateMeeting = () => {
  useAuth()
  const navigate = useNavigate()

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
        style={{ margin: '5vh 10vw' }}
      >
        <EuiFlexItem>
          <EuiCard 
            icon={<EuiImage size={'100%'} alt={'icon'} src={meeting} />}
            title={'Создать Мит 1 на 1'}
            description='Создайте мит с одним человеком.'
            onClick={() => navigate('/create1on1')}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard 
            icon={<EuiImage size={'100%'} alt={'icon'} src={meeting2} />}
            title={'Создать Видео Конференцию'}
            description='Пригласить на собрание несколько человек.'
            onClick={() => navigate('/createvideoconference')}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}
