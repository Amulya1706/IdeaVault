import { NextRequest, NextResponse } from 'next/server'
import { sha256Hex } from '@/lib/crypto'


export async function POST(req: NextRequest) {
const { text } = await req.json()
return NextResponse.json({ hash: '0x' + sha256Hex(text), timestamp: Date.now() })
}