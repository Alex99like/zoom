'use client'

import { useRouter } from 'next/navigation'
import meeting from '@/assets/couple.png'
import meeting2 from '@/assets/online-communication.png'

import { useAuth } from "@/hooks/useAuth"
import { Header } from '@/components/Header'
import { EuiCard, EuiFlexGroup, EuiFlexItem, EuiImage } from '@elastic/eui'

const CreateMeeting = () => {
  useAuth()
  const { push } = useRouter()

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
            icon={<EuiImage size={'100%'} alt={'icon'} src={meeting.src} />}
            title={'Создать Мит 1 на 1'}
            description='Создайте мит с одним человеком.'
            onClick={() => push('/create1on1')}
            paddingSize="xl"
          />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiCard 
            icon={<EuiImage size={'100%'} alt={'icon'} src={meeting2.src} />}
            title={'Создать Видео Конференцию'}
            description='Пригласить на собрание несколько человек.'
            onClick={() => push('/createvideoconference')}
            paddingSize="xl"
          />
        </EuiFlexItem>
      </EuiFlexGroup>
    </div>
  )
}

export default CreateMeeting