"use client";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export default function WalletConnectButton() {
  const { connect, disconnect, connected, account, wallets } = useWallet();

  const addr =
    typeof account?.address === "string"
      ? account.address
      : account?.address?.toString?.() ?? "";

  const tryConnect = async () => {
    // 1) Adapter path (preferred)
    if (wallets.length) {
      await connect(wallets[0].name);
      return;
    }
    // 2) Petra fallback via window.aptos
    const w = (window as any).aptos;
    if (w?.connect) {
      await w.connect(); // Petra will pop here
      return;
    }
    // 3) No wallet detected
    window.open("https://petra.app", "_blank");
  };

  return connected && addr ? (
    <button onClick={() => disconnect()} className="text-xs border rounded px-2 py-1">
      {addr.slice(0, 6)}…{addr.slice(-4)} (Disconnect)
    </button>
  ) : (
    <button onClick={tryConnect} className="text-xs border rounded px-2 py-1">
      Connect Wallet
    </button>
  );
}
