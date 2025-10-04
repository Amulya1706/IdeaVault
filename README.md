# 💡 IdeaVault – On-Chain Idea Proof (Aptos)

 🚀 Turn your ideas into immortal proofs.  
IdeaVault lets you *secure your creativity on the blockchain* with instant certificates, QR-based verification, and AI-powered summaries. No more fear of “idea theft” — your brainchild is now timestamped and verifiable forever.

---

## 🏆 Why IdeaVault?

- 💭 Got a brilliant idea at 2 AM? → Store it on-chain instantly.  
- 🛡 Protect your authorship with tamper-proof proof-of-existence.  
- 📜 Auto-generate a *certificate* (PDF + QR code).  
- 🔎 Verify anytime → Scan QR → Confirm ownership.  
- ⛓ Built for Aptos blockchain with Move smart contracts.  

⚡ Because your ideas deserve better than a dusty notebook.

---

## ✨ Features

✅ Submit ideas in seconds  
✅ Auto-summarized + tagged with AI  
✅ Generate sleek PDF certificates with QR  
✅ Verification portal for authenticity checks  
✅ Store idea hashes on Aptos chain via Move  

---

## 🏗 Architecture



🧑‍💻 User → 🌐 Frontend (Next.js)
→ ⚡ Backend (AI)
→ ⛓ Aptos Move (on-chain proofs)

`

- *Frontend* → Beautiful UI to submit & verify ideas  
- *Backend* → Certificate generation, AI summaries 
- *Move Module* → Blockchain anchor for ultimate proof  

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js & npm (or yarn)  
- Python 3.9+  
- Aptos CLI (for blockchain parts)  

### ▶ Run the Backend (API + AI)

bash
cd ideavault-ai
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
`

### ▶ Run the Frontend (Web)

bash
cd ideavault
npm install
npm run dev


👉 Open *[http://localhost:3000](http://localhost:3000)* in your browser.

---

## 📜 Certificates & Verification

* Every idea submission generates a *certificate (PDF)*.
* The certificate includes a *QR code* → Scan it to verify authenticity.
* Verification link shows idea hash + timestamp + owner ID.

📌 Example Flow:
Idea → Submit → PDF with QR → Verify → On-chain

---

## ⛓ Move Smart Contract

The move/IdeaVault module is designed to:

* 🔗 Store idea hashes
* ⏱ Timestamp authorship on Aptos
* 🔍 Enable on-chain verification

---

## 🎯 Roadmap

| Milestone                   | Status        |
| --------------------------- | ------------  |
| Idea submission & PDF certs | ✅ Done      |
| QR-based verification       | ✅ Done      |
| AI-powered summarization    | ✅ Done      |
| Aptos Move module           | 🏗 WIP       |
| User authentication         | 🏗 Planned   |

---

## 🖼 Screenshots (Coming Soon!)

-DashBoard
<img width="1265" height="706" alt="image" src="https://github.com/user-attachments/assets/a8da8fa5-1500-4575-a7ba-0df49db81cd2" />

Petra Wallet
![WhatsApp Image 2025-10-04 at 21 32 55_f0984b11](https://github.com/user-attachments/assets/44fb26ba-8eb2-4b3c-ad1f-0ec95785acc9)

Generated Certificate
![WhatsApp Image 2025-10-04 at 21 33 33_75fd21de](https://github.com/user-attachments/assets/b1cf12ba-7bb3-4ddb-9d2c-88fbc13669f1)

Verification portal
<img width="1180" height="656" alt="image" src="https://github.com/user-attachments/assets/ad4240dd-961e-4bca-8b75-e36b9d7edec6" />

---


## 🤝 Contributing

Contributions, bug reports, and crazy feature ideas are welcome!

1. Fork 🍴 the repo
2. Create your branch 🌿 (feature/amazing-idea)
3. Commit changes 💾
4. Open a PR 🚀

---


## ⭐ Support

If you like *IdeaVault, please **star 🌟 the repo* and share it!

> 💡 Every great invention started as just an idea. Don’t lose yours. Vault it!
