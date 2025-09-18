# Complete CI/CD Setup Guide for Next.js on AWS

This guide documents the complete process of setting up a CI/CD pipeline for a Next.js application using AWS services, including all the challenges faced and how they were resolved.

## 🎯 Project Overview

**Goal:** Deploy a Next.js application to AWS using a fully automated CI/CD pipeline

**Final Architecture:**
- **Source:** GitHub Repository
- **CI/CD:** AWS CodePipeline + CodeBuild
- **Container Registry:** Amazon ECR
- **Compute:** Amazon ECS with Fargate
- **Load Balancing:** Application Load Balancer
- **Networking:** VPC with Target Groups

---

## 📋 Prerequisites

- AWS Account with appropriate permissions
- GitHub repository with Next.js application
- Basic understanding of Docker and containerization
- AWS CLI installed (optional but helpful)

---

## 🛠️ AWS Services Used

### 1. **Amazon ECR (Elastic Container Registry)**
**What it is:** A fully managed Docker container registry
**Why we need it:** Store and manage Docker images securely in AWS
**Role in our setup:** Stores the containerized Next.js application

### 2. **AWS CodePipeline**
**What it is:** A continuous integration and continuous delivery service
**Why we need it:** Automates the build, test, and deploy phases
**Role in our setup:** Orchestrates the entire CI/CD workflow

### 3. **AWS CodeBuild**
**What it is:** A fully managed continuous integration service
**Why we need it:** Compiles source code, runs tests, and builds Docker images
**Role in our setup:** Builds the Docker image and pushes it to ECR

### 4. **Amazon ECS (Elastic Container Service)**
**What it is:** A fully managed container orchestration service
**Why we need it:** Runs and manages Docker containers at scale
**Role in our setup:** Hosts and runs the Next.js application containers

### 5. **AWS Fargate**
**What it is:** A serverless compute engine for containers
**Why we need it:** Run containers without managing servers
**Role in our setup:** Provides the compute resources for ECS tasks

### 6. **Application Load Balancer (ALB)**
**What it is:** A load balancer that operates at the application layer
**Why we need it:** Distributes incoming traffic and provides a public endpoint
**Role in our setup:** Routes traffic to ECS tasks and provides public access

### 7. **Target Groups**
**What it is:** A logical grouping of targets for load balancer routing
**Why we need it:** Defines where the load balancer should send traffic
**Role in our setup:** Groups ECS tasks for the load balancer to route traffic to

---

## 🚀 Step-by-Step Implementation

### Phase 1: Initial Setup and Docker Configuration

#### Step 1: Create Dockerfile
```dockerfile
FROM public.ecr.aws/docker/library/node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Key Points:**
- Used `public.ecr.aws/docker/library/node:18-alpine` for better AWS compatibility
- Optimized for production builds
- Exposes port 3000 for Next.js

#### Step 2: Create buildspec.yml
```yaml
version: 0.2

phases:
  pre_build:
    commands:
      - echo Logging in to Amazon ECR...
      - aws --version
      - aws ecr get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com
      - REPOSITORY_URI=$AWS_ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com/$IMAGE_REPO_NAME
      - COMMIT_HASH=$(echo $CODEBUILD_RESOLVED_SOURCE_VERSION | cut -c 1-7)
      - IMAGE_TAG=${COMMIT_HASH:=latest}
  build:
    commands:
      - echo Build started on `date`
      - echo Building the Docker image...
      - docker build --platform linux/amd64 -t $REPOSITORY_URI:latest .
      - docker tag $REPOSITORY_URI:latest $REPOSITORY_URI:$IMAGE_TAG
  post_build:
    commands:
      - echo Build completed on `date`
      - echo Pushing the Docker images...
      - docker push $REPOSITORY_URI:latest
      - docker push $REPOSITORY_URI:$IMAGE_TAG
      - echo Writing image definitions file...
      - printf '[{"name":"switch-nextjs-container","imageUri":"%s"}]' $REPOSITORY_URI:$IMAGE_TAG > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json
```

### Phase 2: AWS Infrastructure Setup

#### Step 3: Create ECR Repository
```bash
aws ecr create-repository --repository-name switch-nextjs --region us-east-1
```

**Result:** Repository URI: `831078700401.dkr.ecr.us-east-1.amazonaws.com/switch-nextjs`

#### Step 4: Set Up ECS Cluster and Service
1. Create ECS Cluster: `switch-nextjs-cluster`
2. Create Task Definition with:
   - Container name: `switch-nextjs-container`
   - Port mapping: 3000
   - Fargate launch type
3. Create ECS Service: `switch-nextjs-service`

#### Step 5: Create CodePipeline
1. **Source Stage:** GitHub integration
2. **Build Stage:** CodeBuild project
3. **Deploy Stage:** ECS deployment

---

## 🐛 Challenges Faced and Solutions

### Challenge 1: Docker Build Failures
**Problem:** Initial Dockerfile used standard Node.js image causing build issues
**Solution:** Switched to `public.ecr.aws/docker/library/node:18-alpine` for better AWS compatibility
**Lesson:** Always use AWS-optimized base images when possible

### Challenge 2: Repository Name Mismatch
**Problem:** CodeBuild failed with "repository does not exist" error
**Error:** `The repository with name 'next-switch-ev' does not exist`
**Root Cause:** buildspec.yml referenced `next-switch-ev` but ECR repository was named `switch-nextjs`
**Solution:** Updated `IMAGE_REPO_NAME` environment variable in CodeBuild to `switch-nextjs`
**Lesson:** Ensure consistent naming across all AWS resources

### Challenge 3: ECS Container Name Mismatch
**Problem:** Deploy stage failed with "Invalid action configuration"
**Error:** `The AWS ECS container next-switch-ev does not exist`
**Root Cause:** imagedefinitions.json referenced wrong container name
**Solution:** Updated buildspec.yml line 23 to use correct container name `switch-nextjs-container`
**Lesson:** Container names in buildspec.yml must match ECS Task Definition exactly

### Challenge 4: Load Balancer Not Working
**Problem:** Load balancer URL was not accessible
**Root Cause:** No target group configured for port 3000
**Solution:** Created new target group `switch-nextjs-tgn` with:
  - Target type: IP addresses (for Fargate)
  - Protocol: HTTP
  - Port: 3000
  - Health check path: `/`
**Lesson:** ECS Fargate requires IP-based target groups, not instance-based

### Challenge 5: Target Registration for Fargate
**Problem:** Confusion about manually registering IP addresses
**Solution:** Left target group empty during creation - ECS automatically registers Fargate task IPs
**Lesson:** Fargate tasks have dynamic IPs; let ECS handle registration automatically

---

## ✅ Final Configuration Summary

### CodeBuild Environment Variables
- `AWS_DEFAULT_REGION`: us-east-1
- `AWS_ACCOUNT_ID`: 831078700401
- `IMAGE_REPO_NAME`: switch-nextjs

### ECS Configuration
- **Cluster:** switch-nextjs-cluster
- **Service:** switch-nextjs-service
- **Container:** switch-nextjs-container
- **Launch Type:** Fargate
- **Port:** 3000

### Load Balancer Setup
- **Load Balancer:** bunswap-api-lbn
- **Target Group:** switch-nextjs-tgn
- **Target Type:** IP addresses
- **Health Check:** HTTP on port 3000, path `/`

### Access URL





---

## 🔄 Deployment Workflow

1. **Developer pushes code** to GitHub repository
2. **CodePipeline triggers** automatically
3. **CodeBuild:**
   - Pulls source code
   - Builds Docker image
   - Pushes to ECR
   - Creates imagedefinitions.json
4. **ECS Deploy:**
   - Updates service with new image
   - Performs rolling deployment
   - Registers new tasks with target group
5. **Load Balancer** routes traffic to healthy tasks
6. **Application accessible** via load balancer URL

---

## 🎯 Key Learnings

1. **Naming Consistency:** Ensure all resource names match across services
2. **Fargate vs EC2:** Fargate uses dynamic IPs, requires IP-based target groups
3. **Health Checks:** Configure proper health check paths for your application
4. **AWS Base Images:** Use AWS-optimized Docker base images
5. **Container Names:** buildspec.yml container names must match ECS Task Definition
6. **Target Groups:** Create target groups before updating ECS services
7. **Automatic Registration:** Let ECS handle Fargate IP registration automatically

---

## 🚀 Next Steps for Enhancement

- [ ] Add SSL/TLS certificate for HTTPS
- [ ] Implement blue-green deployments
- [ ] Add monitoring with CloudWatch
- [ ] Set up auto-scaling policies
- [ ] Add environment-specific configurations
- [ ] Implement proper logging strategy
- [ ] Add security scanning to pipeline

---

## 📞 Troubleshooting Guide

### Build Stage Fails
1. Check ECR repository exists and name matches
2. Verify AWS permissions for CodeBuild
3. Check Dockerfile syntax

### Deploy Stage Fails
1. Verify container name in buildspec.yml matches Task Definition
2. Check ECS service exists and is active
3. Ensure imagedefinitions.json format is correct

### Application Not Accessible
1. Check target group health status
2. Verify security group allows traffic on port 3000
3. Ensure load balancer listener routes to correct target group
4. Check ECS service has running tasks

---

*This guide represents a complete journey from initial setup to production deployment, including all the real-world challenges and solutions encountered during implementation.*

---













## 💰 Cost Management: Disable Services to Save Money

After setting up your CI/CD pipeline, you may want to temporarily disable services to avoid ongoing costs while preserving your configuration for future use.

### 📊 Cost Breakdown (Monthly)

| Service | Running Cost | Suspended Cost | Savings |
|---------|-------------|----------------|----------|
| **ECS Fargate Tasks** | $20-50 | $0 | $20-50 |
| **Application Load Balancer** | $18 | $18 | $0 |
| **CodePipeline** | $1 | $0 | $1 |
| **ECR Repository** | Free (500MB) | Free | $0 |
| **CodeBuild** | Pay per build | Pay per build | $0 |
| **Target Groups** | Free | Free | $0 |
| **ECS Cluster** | Free | Free | $0 |
| **Task Definition** | Free | Free | $0 |
| **Total** | **~$40-70** | **~$18-20** | **~$20-50** |

---

## 🛑 How to Suspend Services (Recommended Order)

### Step 1: Scale Down ECS Service (Biggest Savings: $20-50/month)

**Via AWS Console:**
1. Go to **AWS Console** → **ECS** → **Clusters**
2. Click **switch-nextjs-cluster**
3. Click **switch-nextjs-service**
4. Click **Update service**
5. Change **Desired tasks** from `1` to `0`
6. Click **Update**

**Via AWS CLI:**
```bash
aws ecs update-service \
  --cluster switch-nextjs-cluster \
  --service switch-nextjs-service \
  --desired-count 0 \
  --region us-east-1
```

### Step 2: Disable CodePipeline Triggers (Saves: $1/month)

1. Go to **AWS Console** → **CodePipeline**
2. Click **next-switch-ev-pipeline**
3. Click **Edit**
4. Click **Edit triggers** (under Git Triggers section)
5. **Uncheck** "Start your pipeline on push and pull request events"
6. Click **Save**
7. Click **Save** in the main pipeline editor

### Step 3: Optional - Delete Load Balancer (Saves: $18/month)

⚠️ **Warning:** Only delete if you're comfortable recreating the complex configuration

1. Go to **AWS Console** → **EC2** → **Load Balancers**
2. Select **bunswap-api-lbn** (or your load balancer name)
3. **Actions** → **Delete**
4. Type "delete" to confirm
5. Click **Delete**

**Before deletion, document:**
- Listener configurations (ports, protocols, SSL certificates)
- Target group settings
- Security group rules
- Subnet configurations

---

## 🔄 How to Re-enable Services

### Step 1: Scale Up ECS Service

**Via AWS Console:**
1. Go to **ECS** → **Clusters** → **switch-nextjs-cluster**
2. Click **switch-nextjs-service**
3. Click **Update service**
4. Change **Desired tasks** from `0` to `1`
5. Click **Update**
6. Wait 2-3 minutes for task to start

**Via AWS CLI:**
```bash
aws ecs update-service \
  --cluster switch-nextjs-cluster \
  --service switch-nextjs-service \
  --desired-count 1 \
  --region us-east-1
```

### Step 2: Re-enable CodePipeline Triggers

1. Go to **CodePipeline** → **next-switch-ev-pipeline**
2. Click **Edit**
3. Click **Edit triggers**
4. **Check** "Start your pipeline on push and pull request events"
5. Click **Save**
6. Click **Save** in pipeline editor

### Step 3: Recreate Load Balancer (If Deleted)

**This is complex - refer to the original setup steps:**
1. Create Application Load Balancer
2. Configure listeners (HTTP/HTTPS)
3. Create target group for port 3000
4. Update ECS service to use target group
5. Configure security groups
6. Set up health checks

---

## 🎯 Quick Reference Commands

### Suspend Everything (Maximum Savings)
```bash
# Scale down ECS service
aws ecs update-service --cluster switch-nextjs-cluster --service switch-nextjs-service --desired-count 0 --region us-east-1

# Check status
aws ecs describe-services --cluster switch-nextjs-cluster --services switch-nextjs-service --region us-east-1
```

### Reactivate Everything
```bash
# Scale up ECS service
aws ecs update-service --cluster switch-nextjs-cluster --service switch-nextjs-service --desired-count 1 --region us-east-1

# Check status
aws ecs describe-services --cluster switch-nextjs-cluster --services switch-nextjs-service --region us-east-1
```

### Check Current Status
```bash
# Check ECS service status
aws ecs describe-services --cluster switch-nextjs-cluster --services switch-nextjs-service --query 'services[0].{Status:status,Running:runningCount,Desired:desiredCount}' --region us-east-1

# Check target group health
aws elbv2 describe-target-health --target-group-arn arn:aws:elasticloadbalancing:us-east-1:831078700401:targetgroup/switch-nextjs-tgn/[TARGET-GROUP-ID] --region us-east-1
```

---

## 💡 Cost Optimization Tips

### Recommended Approach
1. **Always suspend ECS service first** (biggest savings)
2. **Keep Load Balancer running** (easier to restart)
3. **Disable CodePipeline triggers** (prevents accidental builds)
4. **Monitor AWS billing** to track actual costs

### When to Delete Load Balancer
- **Delete if:** You won't use the application for months
- **Keep if:** You plan to restart within weeks
- **Consider:** Complexity of recreation vs $18/month cost

### Automation Ideas
```bash
# Create a suspend script
#!/bin/bash
echo "Suspending Next.js CI/CD infrastructure..."
aws ecs update-service --cluster switch-nextjs-cluster --service switch-nextjs-service --desired-count 0 --region us-east-1
echo "ECS service scaled down to 0 tasks"
echo "Monthly savings: ~$20-50"
echo "To reactivate: aws ecs update-service --cluster switch-nextjs-cluster --service switch-nextjs-service --desired-count 1 --region us-east-1"
```

---

## 🚨 Important Notes

### What Gets Preserved
- ✅ **All configurations** (Task Definitions, Services, Clusters)
- ✅ **Docker images** in ECR
- ✅ **Pipeline configuration**
- ✅ **Load Balancer settings** (if not deleted)
- ✅ **Target Groups**
- ✅ **Security Groups**

### What You Lose
- ❌ **Running application** (until reactivated)
- ❌ **Public accessibility** (until ECS tasks restart)
- ❌ **Automatic deployments** (until triggers re-enabled)

### Reactivation Time
- **ECS Service:** 2-3 minutes
- **CodePipeline:** Immediate
- **Load Balancer:** 5-10 minutes (if recreated)

---

*Remember: The goal is to preserve your hard work while minimizing costs during inactive periods. Always test the reactivation process to ensure smooth restarts when needed.*