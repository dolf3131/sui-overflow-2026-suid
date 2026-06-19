# 🏆 SuID: The Web3 Alternative to Credly

**Built for the Sui Overflow 2026 Hackathon**

SuID is a fully on-chain, hybrid-event credential system that acts as a decentralized alternative to traditional Web2 certification platforms (like Credly). By leveraging **Sui's Object-Centric Model** and **zkLogin**, SuID completely abstracts away the complexities of Web3, offering a seamless Web2-like experience for end-users while ensuring absolute cryptographic authenticity.

## 🚀 Key Features

1. **Seamless Onboarding (zkLogin)**
   - No seed phrases, no wallet extensions. 
   - Users simply click "Connect Google", and SuID instantly derives a deterministic Sui Address using `@mysten/zklogin`.

2. **Zero-Gas User Experience**
   - End-users only read their on-chain objects. All credential minting (`issue_credential`) is executed securely by authorized Event Organizers (Issuers) on the Sui Testnet.
   - Users get instant access to their Web3 credentials without ever needing a gas faucet.

3. **Dynamic Premium Resumes**
   - Automatically queries the user's `Credential` objects from the Sui Testnet.
   - Dynamically generates a premium, verifiable PDF Resume without charging any fees.

4. **Public Verifiability**
   - Each credential is a distinct Move Object.
   - Anyone can enter the Sui Object ID on the `/verify` portal to query the Testnet and instantly cryptographically verify the credential's authenticity.

---

## 🏗 Architecture Diagram

```mermaid
sequenceDiagram
    participant U as User (Web2)
    participant S as SuID Next.js App
    participant G as Google OAuth
    participant I as Issuer (Admin)
    participant T as Sui Testnet (Move)

    U->>S: Click "Connect Google"
    S->>G: Request JWT
    G-->>S: Return OpenID JWT
    S->>S: @mysten/zklogin jwtToAddress() -> Sui Address
    Note right of S: User gets a deterministic<br/>Web3 Identity instantly.

    I->>S: Go to Issuer Portal
    I->>T: Execute `issue_credential` TX (AdminCap)
    T-->>S: Move Object Minted to User's Address

    U->>S: View Portfolio
    S->>T: SuiClient getOwnedObjects(User Address)
    T-->>U: Display Credentials & Issue Resume PDF
```

---

## 💻 Tech Stack

- **Frontend Framework**: Next.js 14 (App Router), React, Tailwind CSS
- **Sui Integration**: `@mysten/sui` (Client RPC), `@mysten/zklogin` (Auth)
- **Smart Contracts**: Sui Move (`suid::credential`)
- **Deployment**: Vercel (Frontend), Sui Testnet (Move Package)

---

## 🛠 Getting Started (Local Development)

### 1. Clone the repository
```bash
git clone https://github.com/dolf3131/sui-overflow-2026-suid.git
cd sui-overflow-2026-suid
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID="<YOUR_GOOGLE_OAUTH_CLIENT_ID>"
ZKLOGIN_SALT_SECRET="your-secure-salt-secret"
ZKLOGIN_PROVER_URL="https://prover-dev.mystenlabs.com/v1"
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📘 Project Structure

- `contracts/suid/`: Contains the Sui Move smart contract (`credential.move`).
- `src/app/`: Next.js App Router pages (Landing, Portfolio, Issuer, Resume, Verify).
- `src/components/auth/`: Contains the `ZkLoginProvider` that seamlessly maps Google JWTs to Sui Addresses.
- `src/components/ui/`: Reusable Tailwind CSS UI components.

## 📄 License
MIT
