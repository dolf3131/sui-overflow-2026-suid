# SuID: Sui Overflow 2026 Demo Script

*Use this script as a guide when recording your 2~3 minute demo video for the hackathon submission.*

---

## 1. The Hook (0:00 - 0:30)
*(Screen: Show the SuID Landing Page)*

**Speaker:**
> "Hello judges! Welcome to SuID, the Web3 alternative to Credly, built for the Sui Overflow hackathon. 
> Today, verifying resumes and career credentials is fundamentally broken. Users upload unverified PDFs to LinkedIn, or they rely on centralized platforms like Credly that lock their data into walled gardens.
> 
> We wanted to solve this using Web3—but traditional NFT certificates require users to download wallet extensions, manage seed phrases, and pay gas fees. This creates a massive barrier to entry. 
> 
> SuID solves this by leveraging **Sui’s Object-Centric Model** and **zkLogin** to offer a completely seamless Web2-like experience, while ensuring absolute cryptographic authenticity."

---

## 2. Frictionless Onboarding (0:30 - 0:50)
*(Screen: Click "Connect Google" on the top right, show the login pop-up, and land on the `/app` Portfolio page)*

**Speaker:**
> "Let's see how easy it is. I'm a user wanting to view my credentials. I don't need a Sui wallet. I simply click 'Connect Google'. 
> 
> Under the hood, SuID uses `@mysten/zklogin` to instantly derive a deterministic Sui address from my Google JWT. I now have a secure Web3 identity without ever seeing a seed phrase."

---

## 3. The Issuer Portal & Gasless Experience (0:50 - 1:30)
*(Screen: Navigate to the `/app/issuer` page. Copy your zkLogin Sui Address, paste it into the Recipient input, type "Sui Hackathon Winner" in Event Name, and click "Issue Credential")*

**Speaker:**
> "Now, let's switch roles. I'm an event organizer or an educational institution. I want to issue a certificate to a user.
> 
> I go to the Issuer Portal, enter the user's Sui address, and type in the event name. When I click 'Issue Credential', our backend securely executes a transaction on the **Sui Testnet** using our deployed Move contract's AdminCap.
> 
> This is a **Zero-Gas experience for the user**. The institution pays the gas to mint the credential directly into the user's wallet. The user doesn't need a gas faucet or Sui tokens."

---

## 4. Viewing the Portfolio & Resume PDF (1:30 - 2:00)
*(Screen: Navigate back to the `/app` Portfolio page. Show the newly minted credential card. Then, go to `/app/resume` and click "Generate Premium PDF")*

**Speaker:**
> "Back as the user, I check my Portfolio. Our Next.js app queries the Sui Testnet using the `@mysten/sui` v2 JSON-RPC client and instantly displays my newly minted, user-owned credential.
> 
> But we didn't stop there. SuID dynamically generates a premium, verifiable PDF Resume based on the user's on-chain data. With one click, I can export this beautifully formatted PDF to apply for jobs."

---

## 5. Cryptographic Verification (2:00 - 2:30)
*(Screen: Copy the "Object ID" from one of the credentials in the portfolio. Navigate to the `/verify` page, paste the ID, and click "Verify On-Chain")*

**Speaker:**
> "Finally, how does an employer know this isn't photoshopped? 
> 
> Every credential issued is a distinct Move Object on the Sui blockchain. Anyone can take the Object ID, enter it into our public Verify portal, and the app will fetch the live data directly from the Sui Testnet, cryptographically proving its authenticity and origin.
> 
> SuID makes verifiable, user-owned career history accessible to everyone. Thank you for watching!"
