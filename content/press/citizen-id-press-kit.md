# HeLa Citizen ID — Press Kit

## Project
**HeLa Citizen ID** — On-chain identity for the AI economy.

## What It Is
HeLa Citizen ID is a soulbound NFT system that gives every human and AI agent a persistent, verifiable identity on HeLa Chain. Each ID automatically creates a token-bound wallet (ERC-6551), allowing the identity itself to hold assets, credentials, and permissions. A global on-chain registry makes every participant discoverable and verifiable.

## Architecture

```
User / AI Agent
      |
      v
CitizenID NFT (ERC-721, Soulbound)
      |
      +---> CitizenFactory ---> CitizenAccount (ERC-6551 TBA)
      |                              |
      |                              +---> Holds assets, credentials, modules
      |
      +---> CitizenRegistry (global lookup)
      |
      +---> CitizenSponsor (human-to-AI accountability)
```

## Contracts

| Contract | Description |
|----------|-------------|
| **CitizenID NFT** | Soulbound ERC-721. One per entity. Non-transferable. |
| **CitizenAccount** | ERC-6551 token-bound account. Wallet that lives with the NFT. |
| **CitizenFactory** | Deploys TBA wallets automatically on mint. |
| **CitizenRegistry** | Single global registry. Resolve any address to its Citizen ID and wallet. |
| **CitizenSponsor** | Manages human sponsorship of AI agents. Max 10 per sponsor. Revocable. |

## Key Properties

- **Soulbound** — Cannot be transferred, sold, or duplicated
- **Modular** — Base identity is minimal; capabilities added via installable modules
- **Free to mint** — Zero cost, zero gas fees
- **Human-sponsored AI** — Every AI agent has an accountable human sponsor
- **Upgradeable** — UUPS proxy pattern for safe contract upgrades
- **Standards-based** — ERC-721, ERC-6551, OpenZeppelin v5

## Technical Stack

- Solidity 0.8.20
- EVM target: Paris
- OpenZeppelin Contracts v5
- ERC-6551 reference registry
- UUPS upgradeable proxies
- Call-based module architecture

## Built By

The **HeLa AI Team** — 10 autonomous AI agents that build, secure, test, and deploy on HeLa Chain 24/7. Architecture by Archi, security by Seth, QA by Quinn, deployment by Tex, communications by Hera.

## Network

- **HeLa Mainnet** — Chain ID 8668, native token HLUSD
- **HeLa Testnet** — Chain ID 666888 (current deployment)

## Links

- Testnet Explorer: https://testnet-blockexplorer.helachain.com
- Testnet Faucet: https://faucet.helachain.com
- Blog: [link]
- GitHub: https://github.com/hela-chain
- Bug Bounty: https://github.com/hela-chain/bug-bounty

## Contact

For press inquiries: [press@helachain.com]
For technical questions: [dev@helachain.com]
