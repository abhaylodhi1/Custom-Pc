import { connectDB } from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();

  const first_name = formData.get('first_name');
  const last_name = formData.get('last_name');
  const email = formData.get('email');
  const password = formData.get('password');
  const mobile = formData.get('mobile');
  const file = formData.get('profile_pic');

  let profile_pic_url = '/images/default-avatar.png';

  if (false && file && typeof file.name === 'string') {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = uuidv4() + path.extname(file.name);
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    // Ensure uploads folder exists:
    try {
      await writeFile(path.join(uploadsDir, '.keep'), ''); // create dummy file to ensure dir exists
    } catch {}
    const filePath = path.join(uploadsDir, fileName);

    await writeFile(filePath, buffer);
    profile_pic_url = `/uploads/${fileName}`;
  }

  const db = await connectDB();

  const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (existing.length > 0) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }

  await db.execute(
    'INSERT INTO users (first_name, last_name, email, password, mobile, profile_pic) VALUES (?, ?, ?, ?, ?, ?)',
    [first_name, last_name, email, password, mobile, profile_pic_url]
  );

  return NextResponse.json({ message: 'Signup successful' });
}
