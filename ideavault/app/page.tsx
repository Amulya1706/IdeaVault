'use client'
import { useEffect, useMemo, useState } from 'react'
import IdeaForm from '@/components/IdeaForm'
import Leaderboard from '@/components/Leaderboard'
import { seedIdeas, listIdeas } from '@/lib/aptos'
import demo from '@/data/demo.json'
import type { Idea } from '@/lib/types'


export default function HomePage() {
const [ideas, setIdeas] = useState<Idea[]>([])


useEffect(() => {
seedIdeas(demo as unknown as Idea[])
setIdeas(listIdeas())
}, [])


return (
<div className="grid md:grid-cols-2 gap-6">
<section>
<h1 className="text-2xl font-semibold mb-2">On‑Chain Idea Proof</h1>
<p className="text-sm opacity-80 mb-4">Submit your startup/project idea → AI summary & tags → hash → certificate (PDF/NFT‑style) → verify.</p>
<IdeaForm onNew={(i) => setIdeas([i, ...ideas].slice(0, 8))} />
</section>
<section>
<Leaderboard ideas={ideas} />
</section>
</div>
)
}