export const getCreateMeetingBreadCrumbs = (navigate: (href: string) => void) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Создать мит' }
]

export const getOneOnOneMeetingBreadCrumbs = (
  navigate: (href: string) => void
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Создать мит', href: '#', onClick: () => { navigate('/create') } },
  { text: 'Создать мит один на один' }
]

export const getVideoConferenceMeetingBreadCrumbs = (
  navigate: (href: string) => void
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Создать мит', href: '#', onClick: () => { navigate('/create') } },
  { text: 'Создат Конференцию' }
]

export const getMyMeetingsBreadcrumbs = (
  navigate: (href: string) => void
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Мои Миты' }
]

export const getMeetingsBreadcrumbs = (
  navigate: (href: string) => void
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Миты' }
]