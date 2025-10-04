import type { Idea } from './types'


let memory: Idea[] = []


export function seedIdeas(seed: Idea[]) {
if (memory.length === 0) memory = seed
}


export function listIdeas(): Idea[] {
return [...memory].sort((a, b) => b.timestamp - a.timestamp)
}


export function persistIdea(idea: Idea) {
memory.unshift(idea)
}


export function findIdea(idOrHash: string): Idea | undefined {
return memory.find(x => x.id === idOrHash || x.hash === idOrHash)
}