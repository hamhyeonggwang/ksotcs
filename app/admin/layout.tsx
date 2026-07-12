import type { Metadata } from 'next'
import AdminGuard from '@/components/admin/AdminGuard'

export const metadata: Metadata = {
  title: '관리자 대시보드 | 대한아동학교작업치료학회',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>
}
