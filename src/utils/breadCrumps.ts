import { NavigateFunction } from "react-router-dom"
import { BreadCrumbsType } from "./Types"

export const getCreateMeetingBreadCrumbs = (navigate: NavigateFunction): Array<BreadCrumbsType> => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Создать мит' }
]

export const getOneOnOneMeetingBreadCrumbs = (
  navigate: NavigateFunction
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Создать мит', href: '#', onClick: () => { navigate('/create') } },
  { text: 'Создать мит один на один' }
]

export const getVideoConferenceMeetingBreadCrumbs = (
  navigate: NavigateFunction
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Создать мит', href: '#', onClick: () => { navigate('/create') } },
  { text: 'Создат Конференцию' }
]

export const getMyMeetingsBreadcrumbs = (
  navigate: NavigateFunction
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Мои Миты' }
]

export const getMeetingsBreadcrumbs = (
  navigate: NavigateFunction
) => [
  { text: 'Главная', href: '#', onClick: () => { navigate('/') } },
  { text: 'Миты' }
]