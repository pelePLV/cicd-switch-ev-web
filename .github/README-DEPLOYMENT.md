# 🚀 Alibaba Cloud ECS Auto Deployment Guide

Guide to setup GitHub Actions for auto deployment to Alibaba Cloud ECS

## 📋 Setup Steps

### 1. 🔧 Setup Server (One-time)

SSH to the server and run this script:

```bash
ssh -i ~/.ssh/id_ed25519_switch_server root@47.87.66.188

# Download and run setup script
curl -sSL https://raw.githubusercontent.com/creativeteam/next-switch-ev/dev/switch/.github/scripts/setup-server.sh | bash
```

Or copy script and run manually:
```bash
chmod +x /path/to/setup-server.sh
./setup-server.sh
```

### 2. 🔐 Setup GitHub Secrets

Go to GitHub repository → Settings → Secrets and variables → Actions

Create the following Secrets:

#### About SSH Key (`id_ed25519_switch_server`)

**🚨 Important!** You need to add the SSH key to GitHub Secrets as follows:

1. **ALIBABA_SSH_KEY**:
   ```bash
   # On your machine, copy SSH private key:
   cat ~/.ssh/id_ed25519_switch_server
   
   # Copy everything from -----BEGIN OPENSSH PRIVATE KEY----- 
   # to -----END OPENSSH PRIVATE KEY-----
   ```

2. **ALIBABA_SSH_PASSPHRASE**: 
   - Enter the passphrase of the SSH key
   - (Same as what you type during manual SSH)

3. **ALIBABA_HOST**: `47.87.66.188`

4. **ALIBABA_USERNAME**: `root`

### 3. 📝 Complete Secrets Details

| Secret Name | Value | Description |
|-------------|-------|------------|
| `ALIBABA_HOST` | `47.87.66.188` | IP address of ECS server |
| `ALIBABA_USERNAME` | `root` | SSH username |
| `ALIBABA_SSH_KEY` | `<private-key-content>` | Private key from `~/.ssh/id_ed25519_switch_server` |
| `ALIBABA_SSH_PASSPHRASE` | `<your-passphrase>` | Passphrase of SSH key |

### 4. 🚀 Usage

After setup is complete:

1. **Auto Deployment will be triggered when:**
   - Push to `main` branch
   - Push to `dev` branch  
   - Create Pull Request to `main` or `dev`

2. **The Deploy process will:**
   - Build Next.js application
   - Build Docker image
   - SSH to server
   - Stop old service
   - Update source code
   - Start new service
   - Test if application is running

### 5. 🔍 Monitoring

**In GitHub Actions:**
- Go to Actions tab to view deployment status

**On Server:**
```bash
# Check systemd service
sudo systemctl status switch-ev

# Check Docker containers
sudo docker ps | grep switch-ev

# Check application logs
sudo docker logs switch-ev-container

# Test application
curl http://localhost:3000
```

### 6. 🛠 Troubleshooting

**If deployment fails:**

1. Check GitHub Actions logs
2. SSH to server and check:
   ```bash
   sudo systemctl status switch-ev
   sudo docker logs switch-ev-container
   sudo journalctl -u switch-ev -f
   ```

**Manual restart if needed:**
```bash
ssh -i ~/.ssh/id_ed25519_switch_server root@47.87.66.188
sudo systemctl restart switch-ev
```

## 🎯 Difference from Manual Deployment

| Manual | GitHub Actions |
|--------|----------------|
| SSH and restart service | Auto trigger from Git push |
| `systemctl restart switch-ev` | Full deployment pipeline |
| No centralized logs | View logs in GitHub |

## 📚 Files Created

1. `.github/workflows/deploy-alibaba.yml` - GitHub Actions workflow
2. `.github/systemd/switch-ev.service` - systemd service template
3. `.github/scripts/setup-server.sh` - Server setup script
4. `.github/README-DEPLOYMENT.md` - Documentation (this file)

---

## ⚠️ Important Notes

- SSH key must be kept secure
- Don't put passphrase in code
- Server must have Docker and Git installed
- Must have internet access to download dependencies
