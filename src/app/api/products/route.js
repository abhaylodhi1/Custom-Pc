// /app/api/products/route.js
import { connectDB } from '@/lib/db';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  try {
    const db = await connectDB();
    const [rows] = await db.execute(
      'SELECT * FROM products WHERE category = ?',
      [category]
    );

    return new Response(JSON.stringify(rows), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('DB Error:', error.message);
    return new Response(JSON.stringify({ error: 'Database error' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
