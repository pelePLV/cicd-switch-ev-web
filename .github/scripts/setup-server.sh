#!/bin/bash

# Setup script for Alibaba Cloud ECS server
# This script should be run once on the server to set up the environment

set -e

echo "🚀 Setting up Switch EV server environment..."

# Update system
echo "📦 Updating system packages..."
yum update -y

# Install Docker if not installed
if ! command -v docker &> /dev/null; then
    echo "🐳 Installing Docker..."
    yum install -y docker
    systemctl start docker
    systemctl enable docker
fi

# Install Git if not installed
if ! command -v git &> /dev/null; then
    echo "📋 Installing Git..."
    yum install -y git
fi

# Create application directory
echo "📁 Creating application directory..."
mkdir -p /opt/switch-ev
cd /opt/switch-ev

# Clone repository (if not exists)
if [ ! -d ".git" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/creativeteam/next-switch-ev.git .
    git checkout dev
fi

# Create systemd service file
echo "⚙️ Creating systemd service..."
cat > /etc/systemd/system/switch-ev.service << 'EOF'
[Unit]
Description=Switch EV Next.js Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=true
ExecStart=/usr/bin/docker start switch-ev-container
ExecStop=/usr/bin/docker stop switch-ev-container
StandardOutput=journal
StandardError=journal
User=root

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd
systemctl daemon-reload

# Enable the service
systemctl enable switch-ev

# Create log directory
mkdir -p /var/log/switch-ev

echo "✅ Server setup completed!"
echo "📌 Next steps:"
echo "   1. Configure GitHub Secrets in your repository"
echo "   2. Push code to trigger deployment"
echo "   3. Check service status with: systemctl status switch-ev"
