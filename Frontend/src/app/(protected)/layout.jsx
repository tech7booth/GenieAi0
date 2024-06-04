import AuthProvider from '@/components/auth/AuthProvider'

const Layout = ({children}) => {
  return (
    <AuthProvider>
        {children}
   </AuthProvider>
  )
}

export default Layout