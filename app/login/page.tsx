'use client'

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui'
import logo from '@/assets/logo.png'
import animation from '@/assets/animation.png'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { firebaseAuth, userRef } from '../../utils/FirebaseConfig'
import { addDoc, getDocs, query, where } from 'firebase/firestore'
import { useAppDispatch } from '@/store/hooks'
import { setUser } from '@/store/slices/AuthSlice'
import { useRouter } from 'next/navigation'

const Login = () => {
  const { push } = useRouter()
  const dispatch = useAppDispatch()

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) push('/')
  })

  const login = async () => {
    const provider = new GoogleAuthProvider()
    const {
      user: { displayName, email, uid }
    } = await signInWithPopup(firebaseAuth, provider)
    if (email) {
      const firestoreQuery = query(userRef, where('uid', '==', uid))
      const fetchedUsers = await getDocs(firestoreQuery)
      if (fetchedUsers.docs.length === 0) {
        await addDoc(userRef, {
          uid,
          name: displayName,
          email
        })
      }
    }
    dispatch(setUser({ uid, name: displayName, email }))
    push('/')
  }

  return (
    <EuiProvider colorMode='dark'>
      <EuiFlexGroup 
        alignItems='center' 
        justifyContent='center' 
        style={{ width: '100vw', height: '100vh' }}
      >
        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize='xl'>
            <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiFlexItem>
            <EuiImage src={animation.src} alt='logo' />
             </EuiFlexItem>
              <EuiFlexItem>
                <EuiImage src={logo.src} alt='logo' size={'260px'} />
                <EuiSpacer size='xs' />
                <EuiText textAlign='center' grow={false}>
                  <h3>
                    <EuiTextColor>Platform Number One</EuiTextColor>
                    <EuiTextColor color='#0b5cff'> connect</EuiTextColor>
                  </h3>
                </EuiText>
                <EuiSpacer size='l'></EuiSpacer>
                <EuiButton fill onClick={login}>
                  Login with Google
                </EuiButton>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiProvider>
  )
}

export default Login