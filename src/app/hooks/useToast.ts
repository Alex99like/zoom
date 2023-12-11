import { useAppDispatch, useAppSelector } from "../hooks"
import { setToasts } from "../slices/MeetingSlice"

export const useToast = () => {
  const toasts = useAppSelector(zoom => zoom.meetings.toasts)
  const dispatch = useAppDispatch()

  const createToast = ({ title, type }: { title: string, type: any }) => {
    dispatch(
      setToasts(
        toasts.concat({
          id: new Date().toISOString(),
          title,
          color: type
        })
      )
    )
  }

  return [createToast]
}