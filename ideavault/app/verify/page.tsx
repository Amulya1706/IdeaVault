'use client'
import { useEffect, useState } from 'react'
import VerifyBox from '@/components/VerifyBox'
import { seedIdeas } from '@/lib/aptos'
import demo from '@/data/demo.json'


export default function VerifyPage() {
useEffect(() => { seedIdeas(demo as any) }, [])
return (
<div className="max-w-xl mx-auto">
<h1 className="text-2xl font-semibold mb-2">Verification Portal</h1>
<p className="text-sm opacity-80 mb-4">Paste the <b>Idea ID</b> or <b>Hash</b> (or scan QR on a certificate).</p>
<VerifyBox />
</div>
)
}