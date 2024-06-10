import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'

import { StoreProvider } from '@/app/providers/store-provider'
import { CredentialWrapper } from '@/widgets/page-wrapper'

import '@/app/styles/index.scss'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <StoreProvider>
      <CredentialWrapper className={inter.className}>
        <Component {...pageProps} />
      </CredentialWrapper>
    </StoreProvider>
  )
}

export default App
