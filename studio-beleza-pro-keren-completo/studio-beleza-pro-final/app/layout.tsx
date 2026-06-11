import './globals.css'
import type { Metadata } from 'next'
import { Sidebar } from '@/components/common/Sidebar'
import { Header } from '@/components/common/Header'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Studio Beleza Pro - Gestão Profissional',
  description: 'Sistema completo de gestão para Studio de Beleza',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="flex h-screen bg-dark-50">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-7xl mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>

        <Toaster position="top-right" />
      </body>
    </html>
  )
}
