@echo off
setlocal

:: Variables
set PROJECT_ID=senmizu
set REGION=us-east1
set IMAGE_NAME=senmizu-website
set IMAGE_TAG=gcr.io/%PROJECT_ID%/%IMAGE_NAME%:latest

:: 0. Git Operations
echo "Step 0: Checking for Git changes..."
git add .
:: Use a more descriptive commit message
set commit_msg="Deploy version 0.1.5 - Test small audio file"
:: Check if there are changes to commit
git diff --cached --quiet
if errorlevel 1 (
    echo "Committing changes..."
    git commit -m %commit_msg%
    echo "Creating git tag..."
    git tag -a v0.1.5 -m "Release version 0.1.5 - Test small audio file"
    echo "Pushing code and tags to repository..."
    git push origin master --tags
) else (
    echo "No changes to commit. Pushing tags if they don't exist..."
    git push origin master --tags
)

if errorlevel 1 (
    echo "Git operations failed."
    exit /b 1
)

:: 1. Build the Docker image
echo "Building Docker image..."
docker build -t %IMAGE_TAG% .
if errorlevel 1 (
    echo "Docker build failed."
    exit /b 1
)

:: 2. Push the Docker image to Google Container Registry
echo "Pushing Docker image to GCR..."
docker push %IMAGE_TAG%
if errorlevel 1 (
    echo "Docker push failed."
    exit /b 1
)

:: 3. Deploy the image to Google Cloud Run
echo "Deploying to Google Cloud Run..."
gcloud run deploy %IMAGE_NAME% ^
  --image %IMAGE_TAG% ^
  --platform managed ^
  --region %REGION% ^
  --port 8080 ^
  --allow-unauthenticated ^
  --project %PROJECT_ID%

if errorlevel 1 (
    echo "gcloud deploy failed."
    exit /b 1
)

echo "Deployment successful!"
endlocal