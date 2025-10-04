'use client'
import { useMemo, useState } from 'react'
import type { Idea } from '@/lib/types'
import IdeaCard from './IdeaCard'
import TagChips from './TagChips'


export default function Leaderboard({ ideas }: { ideas: Idea[] }) {
const [tag, setTag] = useState<string>('all')
const tags = useMemo(() => ['all', ...Array.from(new Set(ideas.flatMap(i => i.tags)))], [ideas])
const shown = useMemo(() => tag==='all'? ideas : ideas.filter(i => i.tags.includes(tag)), [tag, ideas])


return (
<div>
<div className="flex items-center justify-between mb-2">
<h2 className="text-lg font-semibold">Recent Ideas</h2>
<TagChips tags={tags} active={tag} onPick={setTag} />
</div>
<div className="space-y-3">
{shown.map(i => <IdeaCard key={i.id} idea={i} />)}
{shown.length===0 && <p className="text-sm opacity-60">No ideas for this tag yet.</p>}
</div>
</div>
)
}