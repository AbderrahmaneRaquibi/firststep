import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await db.execute('SELECT * FROM users');
        return NextResponse.json(rows);
      } catch (error) {
        console.error(error); // Use error here to log it
        return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
      }
}
