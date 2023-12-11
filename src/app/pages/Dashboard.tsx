import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { useAuth } from "../hooks/useAuth"
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from "@elastic/eui"
import dashboard1 from '../assets/notes.png'
import dashboard2 from '../assets/timetable.png'
import dashboard3 from '../assets/schedule.png'
import { Header } from "../components/Header"

export const Dashboard = () => {
  useAuth()
  const navigate = useNavigate()

  return (
    <>
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
              icon={<EuiImage size={'5rem'} alt="icon" src={dashboard1} />}
              title={'Создать Мит'}
              description='Создайте новый мит и пригласите людей'
              onClick={() => navigate('/create')}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size={'100%'} alt="icon" src={dashboard2} />}
              title={'Мои Миты'}
              description='Просмотр созданных вами митов'
              onClick={() => navigate('/mymeetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size={'5rem'} alt="icon" src={dashboard3} />}
              title={'Миты'}
              description='Просмотрите миты, на которые вас пригласили.'
              onClick={() => navigate('/meetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  )
}
