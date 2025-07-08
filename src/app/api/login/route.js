import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();
  const db = await connectDB();

  const [users] = await db.execute('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);

  if (users.length === 0) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  // For demo, use email as token directly (replace with JWT in prod)
  const token = email;

  return NextResponse.json({ token });
}
