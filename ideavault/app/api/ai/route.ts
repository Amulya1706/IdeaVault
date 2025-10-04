import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
const { text } = await req.json()
const url = process.env.AI_BASE_URL ?? 'http://127.0.0.1:8000'
const r = await fetch(url + '/summarize', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) })
const data = await r.json()
return NextResponse.json(data)
}