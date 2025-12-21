# AetherVault

Zero-Knowledge Encrypted File Sharing Platform

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://zero-trust-share.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

A secure file sharing platform that encrypts everything client-side before upload. The server never sees your unencrypted files, file names, or passwords.

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

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Encryption | Web Crypto API, AES-256-GCM, PBKDF2 (100k iterations) |
| Backend | Next.js API Routes, Supabase Auth |
| Database | Supabase (PostgreSQL) |
| Storage | AWS S3 with pre-signed URLs |
| SMS | Twilio (optional) |

## Architecture

```
Browser                         Server                        Storage
                                                                
     1. Encrypt file locally                                    
     >                                 
                                    2. Get pre-signed URL       
                                    >  
                                                                
     3. Upload encrypted blob directly to S3                     
     >   
                                                                
     4. Store encrypted metadata                                
     >                                 
```

## Quick Start

### Prerequisites

- Node.js 18+
- Supabase account
- AWS S3 bucket

### Installation

```bash
# Clone the repo
git clone https://github.com/Nivedhaasai/Zero-Trust-Share.git
cd Zero-Trust-Share

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and AWS credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# AWS S3
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name

# Twilio (optional)
TWILIO_ACCOUNT_SID=your_sid
TWILIO_AUTH_TOKEN=your_token
TWILIO_PHONE_NUMBER=your_phone
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/prepare-upload | Initialize file upload |
| GET | /api/my-files | Get user's uploaded files |
| DELETE | /api/revoke-file | Revoke file access |
| GET | /api/get-file-metadata/[id] | Get file info |
| GET | /api/get-file-download/[id] | Get download URL |
| POST | /api/record-download | Log download event |

## Security Model

1. **Key Derivation**: User passcode  PBKDF2 (100,000 iterations)  AES key
2. **Encryption**: File + metadata encrypted with AES-256-GCM
3. **Storage**: Only encrypted blobs stored on S3
4. **Sharing**: Recipient needs passcode to derive decryption key
5. **Zero Knowledge**: Server never handles unencrypted data or keys

## Project Structure

```
src/
 app/
    api/              # API routes
    auth/             # Auth pages
    dashboard/        # User dashboard
    share/            # Share file pages
    upload/           # Upload pages
 components/           # React components
 lib/
     encryption.ts     # Crypto operations
     storage.ts        # S3 operations
     supabase.ts       # Supabase client
```

## Contributing

1. Fork the repository
2. Create your feature branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feature/amazing-feature
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

Built with security-first mindset.
