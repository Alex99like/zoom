'use client'

import { useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/store/hooks"
import { useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { firebaseAuth } from "@/utils/FirebaseConfig"
import { setUser } from "@/store/slices/AuthSlice"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (!currentUser) push('/login')
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
  }, [dispatch, push])
}
