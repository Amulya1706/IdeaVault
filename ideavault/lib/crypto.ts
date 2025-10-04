import { sha256 } from 'js-sha256'


export function sha256Hex(input: string): string {
return sha256.create().update(input).hex()
}