'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'
import dashboard1 from '../assets/notes.png'
import dashboard2 from '../assets/timetable.png'
import dashboard3 from '../assets/schedule.png'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/Header'

const Dashboard = () => {
  useAuth()
  const { push } = useRouter()

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
              icon={<EuiImage size={'5rem'} alt="icon" src={dashboard1.src} />}
              title={'Создать Мит'}
              description='Создайте новый мит и пригласите людей'
              onClick={() => push('/create')}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size={'100%'} alt="icon" src={dashboard2.src} />}
              title={'Мои Миты'}
              description='Просмотр созданных вами митов'
              onClick={() => push('/mymeetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiCard 
              icon={<EuiImage size={'5rem'} alt="icon" src={dashboard3.src} />}
              title={'Миты'}
              description='Просмотрите миты, на которые вас пригласили.'
              onClick={() => push('/meetings')}
              paddingSize="xl"
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </>
  )
}

export default Dashboard