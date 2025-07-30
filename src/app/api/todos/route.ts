import pool from '../../../../db';
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const result = await pool.query('SELECT * FROM todos');
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('GET /api/todos error: ', error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { title, completed, deadline, created_at, notes } = body;

    if (!title || title.trim() === '') {
        return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    try {
        const result = await pool.query(
            'INSERT INTO todos (title, completed, deadline, created_at, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [
                title.trim(),
                completed ?? false,
                deadline || null,
                created_at || new Date(),
                notes || null
            ]
        );
        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (err) {
        console.error("POST /api/todos error", err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}