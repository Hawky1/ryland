

# Update GHL API Key

## What Will Happen

Your existing GoHighLevel API key will be replaced with a new one. You'll be prompted to securely paste the new key.

## Steps

1. You'll be shown a secure input prompt to paste your new GHL API key
2. The key will be encrypted and stored as a backend secret (replacing the current one)
3. The backend function (`ghl-create-contact`) will automatically use the new key on next invocation -- no code changes needed

## Where to Find Your New Key

In GoHighLevel: **Settings > Business Profile > API Keys** (or **Settings > API Keys** depending on your account type)

