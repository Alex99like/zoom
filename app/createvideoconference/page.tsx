import dynamic from 'next/dynamic'

const NoSSR = dynamic(
  () => import('./VideoConference'),
  { ssr: false }
)


export default function PageConference() {
  return <NoSSR />
}