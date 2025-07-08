import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const token = authHeader.split(' ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Token is just email in this demo
  const email = token;

  const db = await connectDB();
  const [users] = await db.execute('SELECT profile_pic FROM users WHERE email = ?', [email]);

  if (users.length === 0) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  return NextResponse.json({ image: users[0].profile_pic || '/images/default-avatar.png' });
}
