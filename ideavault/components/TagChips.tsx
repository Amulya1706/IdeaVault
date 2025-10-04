'use client'
export default function TagChips({ tags, active, onPick }: { tags: string[], active: string, onPick: (t:string)=>void }) {
return (
<div className="flex gap-2 text-xs">
{tags.map(t => (
<button key={t} onClick={()=>onPick(t)} className={`px-2 py-1 rounded-full border ${active===t? 'bg-black text-white' : 'bg-white'}`}>{t}</button>
))}
</div>
)
}