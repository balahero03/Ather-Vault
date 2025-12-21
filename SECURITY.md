# Security Policy

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

1. **Do NOT** open a public issue
2. Email the details to the maintainers privately
3. Include steps to reproduce the vulnerability
4. Allow up to 48 hours for initial response

## Security Features

This application implements several security measures:

### Encryption
- **AES-256-GCM** - Military-grade symmetric encryption
- **PBKDF2** - 100,000 iterations for key derivation
- **Web Crypto API** - Browser-native cryptographic operations

### Zero-Knowledge Architecture
- All encryption/decryption happens client-side
- Server never receives unencrypted data
- Passcodes never leave the browser
- File metadata is encrypted before storage

### Access Controls
- Passcode-protected file sharing
- Optional burn-after-read
- Configurable expiry times
- Download tracking and revocation

### Infrastructure
- Pre-signed URLs for direct S3 access
- No server-side file processing
- Supabase Row Level Security (RLS)

## Best Practices for Users

1. Use strong, unique passcodes for each shared file
2. Enable burn-after-read for sensitive files
3. Set short expiry times when possible
4. Verify recipient identity before sharing links

## Dependencies

We regularly update dependencies to patch known vulnerabilities. Run 
pm audit to check for issues.
