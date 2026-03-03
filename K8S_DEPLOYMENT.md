# Kubernetes Deployment Guide

## Quick Deploy to EKS Hackathon Cluster

### Prerequisites

Your AWS SSO token has expired. First, refresh your credentials:

```bash
aws sso login
```

### Deploy in One Command

Once authenticated, deploy the dashboard:

```bash
./deploy-to-k8s.sh
```

This script will:
1. ✅ Check prerequisites (kubectl, docker, AWS credentials)
2. 🏗️  Build Docker image
3. 📦 Create ECR repository (if needed)
4. 📤 Push image to Amazon ECR
5. 🚀 Deploy to Kubernetes cluster
6. ⏳ Wait for deployment to be ready
7. 🌐 Display public URL

### Expected Output

```
🚀 Deploying Customer Analytics Dashboard to Kubernetes
==========================================================

Step 1: Checking prerequisites...
✅ Prerequisites check passed

Step 2: Checking AWS credentials...
✅ AWS Account: 506940538415

Step 3: Building Docker image...
✅ Docker image built successfully

Step 4: Preparing container registry...
✅ ECR repository exists
📤 Pushing image to ECR...

Step 5: Deploying to Kubernetes...
✅ Kubernetes resources created

Step 6: Waiting for deployment to be ready...
✅ Deployment is ready

=========================================================
🎉 Deployment Complete!
=========================================================

✅ Dashboard is now live!

📊 Public URL: http://abc123-xyz.us-east-1.elb.amazonaws.com
```

---

## Manual Deployment Steps

If you prefer manual deployment:

### 1. Refresh AWS Credentials

```bash
aws sso login
```

### 2. Build Docker Image

```bash
docker build -t customer-analytics-dashboard:latest .
```

### 3. Create ECR Repository (if not exists)

```bash
aws ecr create-repository \
    --repository-name customer-analytics-dashboard \
    --region us-east-1
```

### 4. Push to ECR

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  506940538415.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag customer-analytics-dashboard:latest \
  506940538415.dkr.ecr.us-east-1.amazonaws.com/customer-analytics-dashboard:latest

# Push image
docker push 506940538415.dkr.ecr.us-east-1.amazonaws.com/customer-analytics-dashboard:latest
```

### 5. Update Deployment Manifest

Update `k8s/deployment.yaml` with your ECR image URL:

```yaml
image: 506940538415.dkr.ecr.us-east-1.amazonaws.com/customer-analytics-dashboard:latest
```

### 6. Deploy to Kubernetes

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

### 7. Wait for Deployment

```bash
kubectl rollout status deployment/customer-analytics-dashboard
```

### 8. Get Public URL

```bash
kubectl get svc customer-analytics-dashboard
```

Look for the `EXTERNAL-IP` column. It may take 2-3 minutes for AWS to provision the LoadBalancer.

---

## Accessing the Dashboard

### Via LoadBalancer (Public URL)

Once the LoadBalancer is ready:

```bash
# Get external URL
EXTERNAL_URL=$(kubectl get svc customer-analytics-dashboard \
  -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')

echo "Dashboard URL: http://$EXTERNAL_URL"

# Open in browser
open "http://$EXTERNAL_URL"
```

### Via Port Forward (Local Access)

If LoadBalancer is not ready yet:

```bash
kubectl port-forward svc/customer-analytics-dashboard 8080:80
```

Then visit: http://localhost:8080

---

## Verify Deployment

### Check Pods

```bash
kubectl get pods -l app=customer-analytics-dashboard
```

Expected output:
```
NAME                                            READY   STATUS    RESTARTS   AGE
customer-analytics-dashboard-xxxxxxxxxx-xxxxx   1/1     Running   0          2m
customer-analytics-dashboard-xxxxxxxxxx-xxxxx   1/1     Running   0          2m
```

### Check Service

```bash
kubectl get svc customer-analytics-dashboard
```

Expected output:
```
NAME                           TYPE           CLUSTER-IP      EXTERNAL-IP                                                              PORT(S)        AGE
customer-analytics-dashboard   LoadBalancer   10.100.xxx.xxx  abc123-xyz.us-east-1.elb.amazonaws.com                                  80:32xxx/TCP   3m
```

### View Logs

```bash
# All pods
kubectl logs -l app=customer-analytics-dashboard --tail=50

# Specific pod
kubectl logs customer-analytics-dashboard-xxxxxxxxxx-xxxxx

# Follow logs
kubectl logs -f -l app=customer-analytics-dashboard
```

---

## Troubleshooting

### Issue: AWS SSO Token Expired

**Error:**
```
Error when retrieving token from sso: Token has expired and refresh failed
```

**Solution:**
```bash
aws sso login
```

### Issue: Image Pull Error

**Error:**
```
ErrImagePull or ImagePullBackOff
```

**Solution:**
1. Verify ECR permissions:
   ```bash
   aws ecr get-login-password --region us-east-1
   ```

2. Check if image exists in ECR:
   ```bash
   aws ecr describe-images \
     --repository-name customer-analytics-dashboard \
     --region us-east-1
   ```

3. Verify EKS node IAM role has ECR pull permissions

### Issue: LoadBalancer Pending

**Status:**
```
EXTERNAL-IP   <pending>
```

**Solution:**

Wait 2-5 minutes. If still pending after 5 minutes:

```bash
# Check service events
kubectl describe svc customer-analytics-dashboard

# Check AWS LoadBalancer Controller logs (if installed)
kubectl logs -n kube-system -l app.kubernetes.io/name=aws-load-balancer-controller
```

### Issue: Pods Not Starting

**Check pod status:**
```bash
kubectl describe pod -l app=customer-analytics-dashboard
```

Common issues:
- **Insufficient resources**: Scale down or increase cluster capacity
- **Image pull errors**: Check ECR permissions
- **Configuration errors**: Review deployment.yaml

---

## Updating the Dashboard

### Update Code and Redeploy

```bash
# Make your changes, then:

# Rebuild image
docker build -t customer-analytics-dashboard:latest .

# Re-tag with timestamp for new version
TAG=$(date +%Y%m%d-%H%M%S)
docker tag customer-analytics-dashboard:latest \
  506940538415.dkr.ecr.us-east-1.amazonaws.com/customer-analytics-dashboard:$TAG

# Push new version
docker push 506940538415.dkr.ecr.us-east-1.amazonaws.com/customer-analytics-dashboard:$TAG

# Update deployment
kubectl set image deployment/customer-analytics-dashboard \
  dashboard=506940538415.dkr.ecr.us-east-1.amazonaws.com/customer-analytics-dashboard:$TAG

# Or re-run the deploy script
./deploy-to-k8s.sh
```

### Rollback to Previous Version

```bash
kubectl rollout undo deployment/customer-analytics-dashboard

# Or to specific revision
kubectl rollout undo deployment/customer-analytics-dashboard --to-revision=2
```

---

## Scaling

### Scale Replicas

```bash
# Scale to 5 replicas
kubectl scale deployment customer-analytics-dashboard --replicas=5

# Auto-scale based on CPU
kubectl autoscale deployment customer-analytics-dashboard \
  --cpu-percent=70 \
  --min=2 \
  --max=10
```

---

## Monitoring

### Resource Usage

```bash
# Pod resource usage
kubectl top pods -l app=customer-analytics-dashboard

# Node resource usage
kubectl top nodes
```

### Dashboard Metrics

Visit your dashboard and check:
- Load time (should be < 2 seconds)
- All 22 metrics displaying correctly
- Integration TODO panel working
- Export functionality working

---

## Cleanup

### Remove Dashboard

```bash
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
```

### Remove ECR Repository

```bash
aws ecr delete-repository \
  --repository-name customer-analytics-dashboard \
  --region us-east-1 \
  --force
```

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  AWS EKS Cluster                    │
│                   (us-east-1)                       │
│                                                     │
│  ┌─────────────────────────────────────────────┐  │
│  │         LoadBalancer Service                │  │
│  │  (Public URL: http://xxx.elb.amazonaws.com) │  │
│  └──────────────────┬──────────────────────────┘  │
│                     │                              │
│  ┌──────────────────▼─────────────────────────┐   │
│  │          Deployment (2 replicas)            │   │
│  │                                              │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  │   │
│  │  │   Pod 1         │  │   Pod 2         │  │   │
│  │  │  Next.js App    │  │  Next.js App    │  │   │
│  │  │  Port: 3000     │  │  Port: 3000     │  │   │
│  │  └─────────────────┘  └─────────────────┘  │   │
│  └──────────────────────────────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
                     │
                     ▼
            ┌─────────────────┐
            │   Amazon ECR    │
            │  Container      │
            │   Registry      │
            └─────────────────┘
```

---

## Support

For issues:
1. Check pod logs: `kubectl logs -l app=customer-analytics-dashboard`
2. Check service: `kubectl describe svc customer-analytics-dashboard`
3. Verify AWS credentials: `aws sts get-caller-identity`
4. Review this guide's troubleshooting section

---

**Last Updated**: March 2, 2026
**Cluster**: hackathon (EKS, us-east-1)
**AWS Account**: 506940538415
