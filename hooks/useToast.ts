import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { setToasts } from "@/store/slices/MeetingSlice"

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
