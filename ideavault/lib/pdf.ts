import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import type { Idea } from './types'


export async function makeCertificatePDF(idea: Idea): Promise<Blob> {
const doc = new jsPDF()
doc.setFontSize(18)
doc.text('IdeaVault – Proof of Idea', 20, 20)


doc.setFontSize(12)
doc.text(`Title: ${idea.title}`, 20, 35)
doc.text(`Hash: ${idea.hash}`, 20, 45)
doc.text(`Timestamp: ${new Date(idea.timestamp).toISOString()}`, 20, 55)
doc.text(`Summary: ${idea.summary}`, 20, 70, { maxWidth: 170 })
if (idea.tags?.length) doc.text(`Tags: ${idea.tags.join(', ')}`, 20, 95, { maxWidth: 170 })


const verifyUrl = `${globalThis?.location?.origin ?? ''}/verify?id=${idea.id}`
const qrDataUrl = await QRCode.toDataURL(verifyUrl)
doc.text('Scan to verify:', 20, 115)
doc.addImage(qrDataUrl, 'PNG', 20, 120, 50, 50)


return new Blob([doc.output('arraybuffer')], { type: 'application/pdf' })
}


