'use client'
import type { Idea } from '@/lib/types'
import Link from 'next/link'


export default function IdeaCard({ idea }: { idea: Idea }) {
return (
<div className="bg-white rounded-2xl shadow p-4">
<div className="flex items-center justify-between">
<h3 className="font-semibold">{idea.title}</h3>
<span className="text-xs opacity-60">{new Date(idea.timestamp).toLocaleString()}</span>
</div>
<p className="text-sm my-2">{idea.summary}</p>
<div className="flex gap-2 flex-wrap">
{idea.tags.map(t => <span key={t} className="text-xs bg-slate-100 rounded px-2 py-0.5">#{t}</span>)}
</div>
<div className="mt-2 text-xs opacity-70 break-all">Hash: {idea.hash}</div>
<div className="mt-1 text-xs opacity-70 break-all">Tx: {idea.txHash ?? '—'}</div>
<div className="mt-3">
<Link className="text-sm underline" href={`/verify?id=${idea.id}`}>Verify</Link>
</div>
</div>
)
}