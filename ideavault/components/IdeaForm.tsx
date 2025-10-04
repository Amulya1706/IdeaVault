'use client'

import { useState } from 'react'
import { sha256Hex } from '@/lib/crypto'
import { persistIdea } from '@/lib/aptos'
import type { Idea } from '@/lib/types'
import { makeCertificatePDF } from '@/lib/pdf'
import { useWallet } from '@aptos-labs/wallet-adapter-react'
import { MODULE } from '@/lib/aptosClient'

export default function IdeaForm({ onNew }: { onNew: (i: Idea) => void }) {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)

  const { connected, signAndSubmitTransaction, wallets, connect } = useWallet()

  async function ensureConnected() {
    if (connected) return
    if (wallets?.length) {
      await connect(wallets[0].name)
      return
    }
    const w = (window as any).aptos
    if (w?.connect) {
      await w.connect()
      return
    }
    throw new Error('No wallet detected. Please install Petra and reload.')
  }

  async function submitOnChain(hashHexNo0x: string): Promise<string> {
  const functionId = `${MODULE}::store_proof`;

  // 1) Adapter-friendly payload (some adapters accept this)
  const adapterPayload = {
    data: {
      function: functionId,
      typeArguments: [] as string[],
      functionArguments: [hashHexNo0x],
    },
  };

  // 2) Wallet Standard payload (what Petra expects)
  const petraPayload = {
    type: "entry_function_payload",
    function: functionId,
    type_arguments: [] as string[],
    arguments: [hashHexNo0x],
  };

  // Explicit gas only for Petra (window.aptos)
  const now = Math.floor(Date.now() / 1000);
  const petraOpts = {
    gas_unit_price: "100",
    max_gas_amount: "200000",
    expiration_timestamp_secs: String(now + 600),
  };

  // Try adapter first with its usual shape
  if (connected && signAndSubmitTransaction) {
    try {
      const r1 = await signAndSubmitTransaction(adapterPayload as any);
      return (r1 as any).hash ?? (r1 as any).transactionHash ?? "";
    } catch (e1) {
      // Try again using wallet-standard payload (some adapter versions prefer this)
      try {
        const r2 = await signAndSubmitTransaction(petraPayload as any);
        return (r2 as any).hash ?? (r2 as any).transactionHash ?? "";
      } catch (e2) {
        console.warn("Adapter sign failed, falling back to Petra window API:", e2);
      }
    }
  }

  // Petra fallback: wallet-standard payload + explicit gas options
  const w = (window as any).aptos;
  if (w?.signAndSubmitTransaction) {
    if (!(await w.isConnected?.())) await w.connect();
    const r = await w.signAndSubmitTransaction(petraPayload, petraOpts);
    return r.hash ?? r.transactionHash ?? "";
  }

  throw new Error("Wallet signing not available.");
}


  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!text.trim()) return
    setBusy(true)
    try {
      // 1) AI summary + tags (Python)
      const aiRes = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const { summary, tags } = await aiRes.json()

      // 2) Hash
      const hashHexNo0x = sha256Hex(text)       // for on-chain
      const displayHash = '0x' + hashHexNo0x    // for UI/PDF
      const id = displayHash.slice(0, 16)
      const timestamp = Date.now()

      // 3) Ensure wallet and submit on-chain
      await ensureConnected()
      const txHash = await submitOnChain(hashHexNo0x)

      // 4) Persist for UI with REAL tx hash
      const idea: Idea = {
        id,
        title: title || 'Untitled Idea',
        text,
        summary,
        tags,
        hash: displayHash,
        timestamp,
        txHash,
      }
      persistIdea(idea)
      onNew(idea)

      // 5) Certificate (QR → /verify?id=<id>)
      const blob = await makeCertificatePDF(idea)
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `IdeaVault_${id}.pdf`
      a.click()
      URL.revokeObjectURL(url)

      setTitle('')
      setText('')
      alert(`Submitted on-chain! Tx: ${txHash}`)
    } catch (err: any) {
      console.error(err)
      alert(`Failed: ${err?.message ?? String(err)}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow p-4 space-y-3">
      <input
        className="w-full border rounded-lg px-3 py-2"
        placeholder="Idea title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded-lg px-3 py-2 h-36"
        placeholder="Describe your project/startup idea..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button disabled={busy} className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50">
        {busy ? 'Submitting…' : 'Submit & Get Certificate (on-chain)'}
      </button>
      <p className="text-xs opacity-70">
        We generate an AI summary + tags, compute a SHA-256 hash, and submit <code>store_proof</code> to Aptos.
      </p>
    </form>
  )
}

