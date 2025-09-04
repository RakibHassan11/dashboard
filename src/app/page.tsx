// app/page.tsx (if using App Router in Next.js 13+)
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/users');
}
