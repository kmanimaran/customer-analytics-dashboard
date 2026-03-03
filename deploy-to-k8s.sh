#!/bin/bash
set -e

echo "🚀 Deploying Customer Analytics Dashboard to Kubernetes"
echo "=========================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="customer-analytics-dashboard"
IMAGE_NAME="$APP_NAME:latest"
AWS_REGION="us-east-1"
AWS_ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text 2>/dev/null || echo "")

echo -e "${BLUE}Step 1: Checking prerequisites...${NC}"

# Check if kubectl is available
if ! command -v kubectl &> /dev/null; then
    echo "❌ kubectl not found. Please install kubectl"
    exit 1
fi

# Check if docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker"
    exit 1
fi

echo "✅ Prerequisites check passed"
echo ""

# Refresh AWS credentials if needed
echo -e "${BLUE}Step 2: Checking AWS credentials...${NC}"
if [ -z "$AWS_ACCOUNT_ID" ]; then
    echo -e "${YELLOW}⚠️  AWS credentials not found or expired${NC}"
    echo "Please run: aws sso login"
    echo "Then run this script again"
    exit 1
fi
echo "✅ AWS Account: $AWS_ACCOUNT_ID"
echo ""

# Build Docker image
echo -e "${BLUE}Step 3: Building Docker image...${NC}"
docker build -t $IMAGE_NAME .
echo "✅ Docker image built successfully"
echo ""

# Determine registry strategy
echo -e "${BLUE}Step 4: Preparing container registry...${NC}"

# Try ECR first
ECR_REPO="$AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$APP_NAME"

# Check if ECR repo exists, if not create it
if aws ecr describe-repositories --repository-names $APP_NAME --region $AWS_REGION &> /dev/null; then
    echo "✅ ECR repository exists: $ECR_REPO"
else
    echo "📦 Creating ECR repository..."
    aws ecr create-repository \
        --repository-name $APP_NAME \
        --region $AWS_REGION \
        --image-scanning-configuration scanOnPush=true \
        --encryption-configuration encryptionType=AES256 || {
        echo -e "${YELLOW}⚠️  Could not create ECR repository${NC}"
        echo "Using local image instead..."
        ECR_REPO=""
    }
fi

# Login to ECR and push if ECR is available
if [ -n "$ECR_REPO" ]; then
    echo "🔐 Logging into ECR..."
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $AWS_ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

    echo "📤 Tagging and pushing image to ECR..."
    docker tag $IMAGE_NAME $ECR_REPO:latest
    docker push $ECR_REPO:latest

    # Update deployment with ECR image
    sed -i.bak "s|image: customer-analytics-dashboard:latest|image: $ECR_REPO:latest|g" k8s/deployment.yaml
    echo "✅ Image pushed to ECR: $ECR_REPO:latest"
else
    echo "📦 Using local image"
fi
echo ""

# Deploy to Kubernetes
echo -e "${BLUE}Step 5: Deploying to Kubernetes...${NC}"

# Create namespace if needed
kubectl create namespace analytics --dry-run=client -o yaml | kubectl apply -f - || true

# Apply Kubernetes manifests
echo "📋 Applying Kubernetes manifests..."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "✅ Kubernetes resources created"
echo ""

# Wait for deployment
echo -e "${BLUE}Step 6: Waiting for deployment to be ready...${NC}"
kubectl rollout status deployment/$APP_NAME --timeout=300s

echo "✅ Deployment is ready"
echo ""

# Get public URL
echo -e "${GREEN}=========================================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}=========================================================${NC}"
echo ""

echo "Getting public URL (this may take a few minutes for LoadBalancer)..."
echo ""

# Wait for LoadBalancer to get external IP
MAX_RETRIES=30
RETRY_COUNT=0
EXTERNAL_IP=""

while [ -z "$EXTERNAL_IP" ] && [ $RETRY_COUNT -lt $MAX_RETRIES ]; do
    EXTERNAL_IP=$(kubectl get svc $APP_NAME -o jsonpath='{.status.loadBalancer.ingress[0].hostname}' 2>/dev/null || echo "")

    if [ -z "$EXTERNAL_IP" ]; then
        EXTERNAL_IP=$(kubectl get svc $APP_NAME -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "")
    fi

    if [ -z "$EXTERNAL_IP" ]; then
        echo -n "."
        sleep 5
        RETRY_COUNT=$((RETRY_COUNT + 1))
    fi
done

echo ""
echo ""

if [ -n "$EXTERNAL_IP" ]; then
    echo -e "${GREEN}✅ Dashboard is now live!${NC}"
    echo ""
    echo -e "📊 ${BLUE}Public URL: http://$EXTERNAL_IP${NC}"
    echo ""
    echo "You can also access it via:"
    echo "  kubectl port-forward svc/$APP_NAME 8080:80"
    echo "  Then visit: http://localhost:8080"
else
    echo -e "${YELLOW}⚠️  LoadBalancer external IP not ready yet${NC}"
    echo ""
    echo "Run this command to check status:"
    echo "  kubectl get svc $APP_NAME -w"
    echo ""
    echo "Or access via port-forward:"
    echo "  kubectl port-forward svc/$APP_NAME 8080:80"
    echo "  Then visit: http://localhost:8080"
fi

echo ""
echo "Useful commands:"
echo "  kubectl get pods                  # Check pod status"
echo "  kubectl logs -l app=$APP_NAME    # View logs"
echo "  kubectl get svc $APP_NAME        # Get service details"
echo ""
