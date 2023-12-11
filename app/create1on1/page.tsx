import dynamic from 'next/dynamic'

const NoSSR = dynamic(
  () => import('./OneOnOneMeeting'),
  { ssr: false }
)


export default function PageCreate() {
  return <NoSSR />
}