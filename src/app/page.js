// src/app/page.js or page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/signup');
}
