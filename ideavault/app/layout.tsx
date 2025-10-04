import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import WalletProvider from "@/components/WalletProvider";
import WalletConnectButton from "@/components/WalletConnectButton";

export const metadata = {
  title: "IdeaVault",
  description: "On-Chain Idea Proof (Aptos)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <WalletProvider>
          <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
            <div className="mx-auto max-w-5xl px-4 py-3 flex items-center gap-3">
              <Image src="/logo.svg" width={28} height={28} alt="logo" />
              <Link href="/" className="font-semibold">
                IdeaVault
              </Link>
              <nav className="ml-auto flex gap-4 text-sm">
                <Link href="/">Home</Link>
                <Link href="/verify">Verify</Link>
                <a
                  href="https://aptos.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="opacity-70"
                >
                  Aptos
                </a>
              </nav>
              <div className="ml-4">
                <WalletConnectButton />
              </div>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
          <footer className="mx-auto max-w-5xl px-4 py-10 text-xs opacity-60">
            © 2025 IdeaVault
          </footer>
        </WalletProvider>
      </body>
    </html>
  );
}
