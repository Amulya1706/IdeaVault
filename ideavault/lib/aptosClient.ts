// lib/aptosClient.ts
import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";

export const NODE_URL =
  process.env.NEXT_PUBLIC_APTOS_NODE_URL ??
  process.env.APTOS_NODE_URL ??
  "https://fullnode.testnet.aptoslabs.com/v1";

export const MODULE = (
  process.env.NEXT_PUBLIC_IDEAVAULT_MODULE ??
  process.env.IDEAVAULT_MODULE ??
  ""
) as string;

export function getAptosClient() {
  const config = new AptosConfig({
    network: Network.TESTNET,
    fullnode: NODE_URL,
  });
  return new Aptos(config);
}
