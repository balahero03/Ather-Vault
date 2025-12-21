# AetherVault

Zero-Knowledge Encrypted File Sharing Platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](YOUR_VERCEL_URL)
[![CI](https://github.com/Nivedhaasai/Zero-Trust-Share/actions/workflows/ci.yml/badge.svg)](https://github.com/Nivedhaasai/Zero-Trust-Share/actions)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A secure file sharing platform that encrypts everything client-side before upload. The server never sees your unencrypted files, file names, or passwords.

## Demo

Try it live: **[your-deployment-url](YOUR_VERCEL_URL)**

## Why AetherVault?

| Feature | Traditional Cloud | AetherVault |
|---------|------------------|-------------|
| Encryption | Server-side (they have keys) | Client-side (only you have keys) |
| File Names | Visible to provider | Encrypted |
| Passwords | Stored on server | Never leaves your browser |
| Server Breach | Your files exposed | Attackers get encrypted blobs |

## Features

- **End-to-End Encryption** - AES-256-GCM encryption happens in your browser
- **Zero-Knowledge** - Server stores only encrypted data, no keys
- **Burn After Read** - Optional auto-delete after first download
- **Expiry Controls** - Set files to expire after custom duration
- **Secure Sharing** - Share via passcode-protected links
- **SMS Verification** - Optional 2FA via Twilio
- **Dark Mode UI** - Modern, responsive interface

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS |
| Encryption | Web Crypto API, AES-256-GCM, PBKDF2 (100k iterations) |
| Backend | Next.js API Routes, Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Storage | AWS S3 with pre-signed URLs |
| SMS | Twilio (optional) |
| Deployment | Vercel |

## Architecture

```
+------------------+     +-------------------+     +------------------+
|                  |     |                   |     |                  |
|     Browser      |     |      Server       |     |     AWS S3       |
|                  |     |                   |     |                  |
+--------+---------+     +---------+---------+     +--------+---------+
         |                         |                        |
         |  1. Encrypt file        |                        |
         |     locally (AES-256)   |                        |
         |                         |                        |
         +------------------------>|  2. Request            |
         |                         |     pre-signed URL     |
         |                         +----------------------->|
         |                         |                        |
         |  3. Upload encrypted    |                        |
         |     blob directly       |                        |
         +------------------------------------------------->|
         |                         |                        |
         |  4. Store encrypted     |                        |
         |     metadata only       |                        |
         +------------------------>|                        |
         |                         |                        |
```

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account (free tier works)
- AWS S3 bucket

### Installation

```bash
# Clone the repo
git clone https://github.com/Nivedhaasai/Zero-Trust-Share.git
cd Zero-Trust-Share

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Docker (Alternative)

```bash
docker-compose up --build
```

## Environment Variables

See [.env.example](.env.example) for all required variables.

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Your Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key |
| AWS_S3_BUCKET | S3 bucket for file storage |
| TWILIO_* | Optional SMS verification |

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/prepare-upload` | Yes | Initialize file upload |
| GET | `/api/my-files` | Yes | List user's files |
| DELETE | `/api/revoke-file` | Yes | Revoke file access |
| GET | `/api/get-file-metadata/[id]` | No | Get file info |
| GET | `/api/get-file-download/[id]` | No | Get download URL |
| POST | `/api/record-download` | No | Log download event |

## Security Model

```
User Passcode
      |
      v
+-----+------+
|   PBKDF2   |  100,000 iterations
+-----+------+
      |
      v
+-----+------+
| AES-256-GCM|  File + Metadata Encryption
+-----+------+
      |
      v
+-----+------+
|  Encrypted |  Stored on S3
|    Blob    |  Server has no keys
+------------+
```

See [SECURITY.md](SECURITY.md) for full security documentation.

## Project Structure

```
src/
 app/
    api/              # API routes
       prepare-upload/
       my-files/
       revoke-file/
       get-file-*/
    auth/             # Auth pages
    dashboard/        # User dashboard
    share/            # Share pages
    upload/           # Upload flow
 components/           # React components
    AuthModal.tsx
    FileUploadProcess.tsx
    RecipientView.tsx
    DashboardView.tsx
 lib/
     encryption.ts     # Crypto operations
     storage.ts        # S3 operations
     supabase.ts       # Supabase client
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Encryption via [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- Database by [Supabase](https://supabase.com/)
- Storage by [AWS S3](https://aws.amazon.com/s3/)

---

**AetherVault** - Where privacy meets innovation in file sharing.
