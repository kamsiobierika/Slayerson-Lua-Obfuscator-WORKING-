# Slayerson-Lua-Obfuscator-WORKING-

Made by slayerson

# Prometheus Discord Bot - Setup Tutorial

A Discord bot for the Prometheus Lua Obfuscator that allows users to obfuscate Lua files directly through Discord.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Setup](#environment-setup)
- [Installation Methods](#installation-methods)
  - [Method 1: Local Development Setup](#method-1-local-development-setup)
  - [Method 2: Docker Setup](#method-2-docker-setup)
- [Discord Bot Setup](#discord-bot-setup)
- [Configuration](#configuration)
- [Running the Bot](#running-the-bot)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)
- [Project Structure](#project-structure)

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **LuaJIT** or **Lua 5.3** (for the obfuscation engine)
- **Discord Developer Account** - [Discord Developer Portal](https://discord.com/developers/applications)

### For Docker Setup (Alternative)
- **Docker** - [Download here](https://www.docker.com/get-started)
- **Docker Compose** (optional but recommended)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/UnknownCodersonLT4/Slayerson-Lua-Obfuscator-WORKING-/tree/main.git
cd Slayersons Lua Obfusctor-discord-bot
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:
- `discord.js` - Discord API wrapper
- `typescript` - TypeScript compiler
- `esbuild` - Fast JavaScript bundler
- `dotenv` - Environment variable loader
- And other necessary packages

## Environment Setup

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
touch .env
```

### 2. Add Environment Variables

Open the `.env` file and add your Discord bot token:

```env
DISCORD_TOKEN=your_discord_bot_token_here
```

**⚠️ Important:** Never commit your `.env` file to version control. It's already included in `.gitignore`.

## Installation Methods

Choose one of the following methods to set up and run the bot:

## Method 1: Local Development Setup

### Step 1: Build the Project

The project uses TypeScript and needs to be compiled to JavaScript:

```bash
npm run build
```

This command runs the esbuild configuration and compiles TypeScript files from the `src/` directory.

### Step 2: Verify Lua Installation

Make sure you have Lua installed and accessible:

```bash
# Check if lua is installed
lua -v
# or
luajit -v
```

The bot expects to find:
- `./bin/luajit.exe` (for Windows) or equivalent Lua binary
- `./lua/cli.lua` - The Lua obfuscation script

### Step 3: Set Up Lua Components

Ensure the following files are present:
- `bin/` directory with Lua binaries
- `lua/` directory with Lua scripts
- `lua/cli.lua` - Main obfuscation script

### Step 4: Run the Bot

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
```bash
npm start
```

Or for development with auto-rebuild:

```bash
npm run dev
```

## Method 2: Docker Setup

### Step 1: Build Docker Image

```bash
docker build -t prometheus-discord-bot .
```

### Step 2: Run with Docker

```bash
docker run -d \
  --name prometheus-bot \
  -e DISCORD_TOKEN=your_discord_bot_token_here \
  prometheus-discord-bot
```

### Step 3: Using Docker Compose (Recommended)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  prometheus-bot:
    build: .
    environment:
      - DISCORD_TOKEN=${DISCORD_TOKEN}
    restart: unless-stopped
    volumes:
      - ./logs:/usr/src/app/logs
```

Then run:

```bash
docker-compose up -d
```

## Discord Bot Setup

### 1. Create a Discord Application

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application"
3. Give your bot a name (e.g., "Prometheus Obfuscator")
4. Click "Create"

### 2. Create a Bot

1. Navigate to the "Bot" section in the left sidebar
2. Click "Add Bot"
3. Confirm by clicking "Yes, do it!"

### 3. Get Bot Token

1. In the Bot section, find the "Token" area
2. Click "Copy" to copy your bot token
3. Add this token to your `.env` file

### 4. Set Bot Permissions

In the "Bot" section, enable the following permissions:
- ✅ **Send Messages**
- ✅ **Use Slash Commands** (if planning to add them)
- ✅ **Read Message History**
- ✅ **Attach Files**
- ✅ **Read Messages/View Channels**

### 5. Invite Bot to Server

1. Go to the "OAuth2" > "URL Generator" section
2. Select "bot" in scopes
3. Select the permissions mentioned above
4. Copy the generated URL and open it in your browser
5. Select the server to add the bot to

## Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DISCORD_TOKEN` | Your Discord bot token | ✅ Yes | - |

### Bot Features

The bot supports three obfuscation presets:
- **Weak** - Basic obfuscation
- **Medium** - Moderate obfuscation  
- **Strong** - Heavy obfuscation

### File Limitations

- Maximum file size: **40KB**
- Supported file types: **`.lua` files**
- Files larger than 40KB will be rejected with a message suggesting the standalone version

## Running the Bot

### Development Mode

```bash
# Build and run with auto-restart
npm run dev
```

### Production Mode

```bash
# Build the project
npm run build

# Start the bot
npm start
```

### Check Bot Status

When the bot starts successfully, you should see:

```
[PROMETHEUS] Bot is starting ...
[PROMETHEUS] Logged in as YourBotName#1234
```

## Usage

### How to Use the Bot

1. **Upload a Lua File**: Send a `.lua` file as an attachment to any channel where the bot has access
2. **Select Preset**: The bot will respond with three buttons (Weak, Medium, Strong)
3. **Click Preset**: Choose your desired obfuscation level
4. **Download Result**: The bot will process your file and provide a download link

### Example Workflow

```
User: [Uploads script.lua]
Bot: For much more options, please use the standalone version.
     Select the Preset to use:
     [Weak] [Medium] [Strong]

User: [Clicks "Medium"]
Bot: ✅ Uploading your file ...
     ✅ Obfuscating your file using Medium Preset ...
     ✅ Downloading your file ...
     🔗 [Download](link_to_obfuscated_file)
```

## Troubleshooting

### Common Issues

#### Bot Not Responding
- ✅ Check if the bot is online in your Discord server
- ✅ Verify the `DISCORD_TOKEN` in your `.env` file
- ✅ Ensure the bot has proper permissions

#### "Upload failed" Error
- ✅ Check file size (must be under 40KB)
- ✅ Ensure file is a valid `.lua` file
- ✅ Check internet connection

#### "Obfuscation failed" Error
- ✅ Verify Lua installation and binaries in `bin/` directory
- ✅ Check if `lua/cli.lua` exists and is executable
- ✅ Ensure uploaded Lua file has valid syntax

#### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild the project
npm run build
```

### Logs and Debugging

The bot uses colored console output:
- 🟣 **[PROMETHEUS]** - General information
- 🟡 **[PROMETHEUS]** - Warnings
- 🔴 **[PROMETHEUS]** - Errors

### Docker Troubleshooting

```bash
# Check container logs
docker logs prometheus-bot

# Restart container
docker restart prometheus-bot

# Rebuild image
docker build --no-cache -t prometheus-discord-bot .
```

## Project Structure

```
Prometheus-discord-bot/
├── bin/                    # Lua binaries
│   └── luajit.exe         # LuaJIT executable
├── lua/                   # Lua scripts
│   └── cli.lua           # Main obfuscation script
├── src/                   # TypeScript source files
│   ├── index.ts          # Main bot logic
│   ├── logger.ts         # Logging utilities
│   └── obfuscate.ts      # Obfuscation wrapper
├── .env                   # Environment variables (create this)
├── .gitignore            # Git ignore rules
├── Dockerfile            # Docker configuration
├── esbuild.js            # Build configuration
├── index.js              # Compiled output (generated)
├── package.json          # Dependencies and scripts
├── README.md             # This file
└── tsconfig.json         # TypeScript configuration
```

### Key Files Explained

- **`src/index.ts`** - Main bot entry point with Discord.js logic
- **`bin/`** - Contains platform-specific Lua executables
- **`lua/cli.lua`** - Lua script that handles the actual obfuscation
- **`esbuild.js`** - Bundles TypeScript into a single JavaScript file
- **`.env`** - Contains sensitive environment variables (token)

## Additional Resources

- [Discord.js Documentation](https://discord.js.org/#/docs)
- [Discord Developer Portal](https://discord.com/developers/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)

## Support

If you encounter issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review the console logs for error messages
3. Ensure all prerequisites are properly installed
4. Verify your Discord bot token and permissions

---

**⚠️ Security Note:** Never share your Discord bot token publicly. Keep your `.env` file secure and never commit it to version control.
