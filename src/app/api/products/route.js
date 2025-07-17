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
    return new Response(JSON.stringify({
      error: error.message, // 👈 shows real error
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
