import dynamic from 'next/dynamic'

const NoSSR = dynamic(
  () => import('./JoinMeeting'),
  { ssr: false }
)


export default function PageConference() {
  return <NoSSR />
}