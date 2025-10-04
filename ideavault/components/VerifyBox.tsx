'use client'
import { useEffect, useMemo, useState } from 'react'
import { findIdea, listIdeas } from '@/lib/aptos'
import type { Idea } from '@/lib/types'


export default function VerifyBox() {
const [q, setQ] = useState('')
const [idea, setIdea] = useState<Idea | null>(null)
const [all, setAll] = useState<Idea[]>([])


useEffect(() => { setAll(listIdeas()) }, [])


useEffect(() => {
const url = new URL(window.location.href)
const id = url.searchParams.get('id')
if (id) { setQ(id); const i = findIdea(id); if (i) setIdea(i) }
}, [])


const onCheck = () => {
const i = findIdea(q.trim())
setIdea(i ?? null)
}


const hint = useMemo(() => all[0]?.id ?? '', [all])


return (
<div className="bg-white rounded-2xl shadow p-4">
<div className="flex gap-2">
<input value={q} onChange={e=>setQ(e.target.value)} placeholder={`Idea ID or Hash e.g. ${hint}`} className="flex-1 border rounded px-3 py-2" />
<button onClick={onCheck} className="px-3 py-2 rounded bg-black text-white">Verify</button>
</div>
{idea ? (
<div className="mt-4 text-sm">
<div><b>Title:</b> {idea.title}</div>
<div className="mt-1"><b>Summary:</b> {idea.summary}</div>
<div className="mt-1"><b>Tags:</b> {idea.tags.join(', ')}</div>
<div className="mt-1 break-all"><b>Hash:</b> {idea.hash}</div>
<div className="mt-1"><b>Timestamp:</b> {new Date(idea.timestamp).toLocaleString()}</div>
<div className="mt-1 break-all"><b>Tx:</b> {idea.txHash ?? '—'}</div>
</div>
) : (
<p className="mt-4 text-sm opacity-70">No match. Try a valid Idea ID from the home page.</p>
)}
</div>
)
}