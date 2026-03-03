# Quick Deploy to Kubernetes - EKS Hackathon Cluster

## Current Status

✅ **Docker image built successfully**
✅ **Kubectl connected to hackathon cluster**
✅ **All code committed to GitHub**

❌ Need AWS credentials OR Docker Hub login to push image

---

## Option 1: Deploy via Docker Hub (Easiest - 3 commands)

### Step 1: Login to Docker Hub
```bash
docker login
# Username: kmanimaran
# Password: [your Docker Hub password]
```

### Step 2: Push the image
```bash
docker push kmanimaran/customer-analytics-dashboard:latest
```

### Step 3: Deploy to Kubernetes
```bash
# Update deployment to use Docker Hub image
kubectl apply -f - <<EOF
apiVersion: apps/v1
kind: Deployment
metadata:
  name: customer-analytics-dashboard
spec:
  replicas: 2
  selector:
    matchLabels:
      app: customer-analytics-dashboard
  template:
    metadata:
      labels:
        app: customer-analytics-dashboard
    spec:
      containers:
      - name: dashboard
        image: kmanimaran/customer-analytics-dashboard:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 3000
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: customer-analytics-dashboard
spec:
  type: LoadBalancer
  selector:
    app: customer-analytics-dashboard
  ports:
  - port: 80
    targetPort: 3000
EOF
```

### Step 4: Get your public URL
```bash
# Wait for LoadBalancer (takes 2-3 minutes)
kubectl get svc customer-analytics-dashboard -w

# Once EXTERNAL-IP appears (not <pending>), you're live!
# Your URL will be: http://[EXTERNAL-IP]
```

---

## Option 2: Deploy via AWS ECR (If you have AWS access)

### Step 1: Login to AWS
```bash
aws sso login
```

### Step 2: Run deployment script
```bash
./deploy-to-k8s.sh
```

That's it! The script handles everything.

---

## Option 3: Quick Local Access (While waiting for LoadBalancer)

If you want immediate access while the LoadBalancer is provisioning:

```bash
kubectl port-forward svc/customer-analytics-dashboard 8080:80
```

Then open: **http://localhost:8080**

---

## Verify Deployment

### Check pods are running
```bash
kubectl get pods -l app=customer-analytics-dashboard
```

Expected output:
```
NAME                                            READY   STATUS    RESTARTS   AGE
customer-analytics-dashboard-xxxxxxxxxx-xxxxx   1/1     Running   0          1m
customer-analytics-dashboard-xxxxxxxxxx-xxxxx   1/1     Running   0          1m
```

### Check service and get URL
```bash
kubectl get svc customer-analytics-dashboard
```

Example output:
```
NAME                           TYPE           EXTERNAL-IP                                    PORT(S)
customer-analytics-dashboard   LoadBalancer   abc123.us-east-1.elb.amazonaws.com            80:31234/TCP
```

### View logs
```bash
kubectl logs -l app=customer-analytics-dashboard --tail=50
```

---

## What's Deployed

- **Dashboard**: Full analytics dashboard with all 22 metrics
- **Replicas**: 2 pods for high availability
- **Resources**: 256Mi-512Mi memory, 250m-500m CPU per pod
- **Service**: LoadBalancer exposing port 80 → 3000
- **Health checks**: Liveness and readiness probes configured

---

## Your Dashboard Features

Once deployed, your public URL will show:

- 📊 **22 Customer Utilization Metrics** across 5 categories
- 🟢 **5 Live Metrics** with real data
- 🟡 **15 Mock Metrics** clearly marked with sample data
- 🚀 **Integration TODO Panel** with export functionality
- 📱 **Responsive Design** - works on all devices
- 🔍 **Search & Filter** capabilities
- 📈 **Multiple Visualizations** - charts, tables, KPIs

---

## Troubleshooting

### Pods not starting?
```bash
kubectl describe pod -l app=customer-analytics-dashboard
kubectl logs -l app=customer-analytics-dashboard
```

### LoadBalancer stuck on <pending>?
Wait 5 minutes. If still pending:
```bash
kubectl describe svc customer-analytics-dashboard
```

### Can't access the URL?
Try port-forward as a backup:
```bash
kubectl port-forward svc/customer-analytics-dashboard 8080:80
```

---

## Quick Commands Reference

```bash
# Get everything
kubectl get all -l app=customer-analytics-dashboard

# Scale up
kubectl scale deployment customer-analytics-dashboard --replicas=5

# Update image (after rebuilding)
kubectl rollout restart deployment customer-analytics-dashboard

# Delete everything
kubectl delete deployment customer-analytics-dashboard
kubectl delete service customer-analytics-dashboard
```

---

## Next Steps After Deployment

1. ✅ Open your public URL
2. ✅ Verify all 22 metrics are displaying
3. ✅ Test the Integration TODO panel
4. ✅ Click "Export TODO" to download requirements
5. ✅ Share the URL with your team!

---

**Dashboard already built and ready!** 🎉
Just need to push the image and deploy with one of the options above.

**Current Image**: `customer-analytics-dashboard:latest` (local)
**Target Image**: `kmanimaran/customer-analytics-dashboard:latest` (Docker Hub)
**Cluster**: `hackathon` (AWS EKS, us-east-1)
**GitHub**: https://github.com/kmanimaran/customer-analytics-dashboard
