import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "../hooks"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "../../utils/FirebaseConfig"
import { setUser } from "../slices/AuthSlice"

export const useAuth = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) navigate('/login')
      else {
        dispatch(
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            name: currentUser.displayName
          })
        )
      }
    })
    return () => unsubscribe()
  }, [dispatch, navigate])
}
