// /app/api/pc-parts/route.js
import { connectDB } from '@/lib/db';

export async function GET() {
  try {
    const db = await connectDB();

    const categories = ['motherboard', 'processor', 'ram', 'storage', 'gpu'];
    const result = {};

    for (const category of categories) {
      const [rows] = await db.execute(
        'SELECT id, name, image, price, brand, stock,specification FROM pc_parts WHERE category = ?',
        [category]
      );
      result[category] = rows;
    }

    return new Response(JSON.stringify(result), {
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
