#!/bin/bash

# Step 1: Remove the existing ForstAIfe container (if it exists)
echo "Stopping and removing existing 'ForstAIfe' container (if running)..."
docker rm -f ForstAIfe 2>/dev/null || echo "No existing 'ForstAIfe' container to remove."

# Step 2: Remove the existing ForstAIfe image (if it exists)
echo "Removing existing 'ForstAIfe' image (if it exists)..."
docker rmi -f ForstAIfe 2>/dev/null || echo "No existing 'ForstAIfe' image to remove."

# Step 3: Build the Docker image
echo "Building Docker image 'ForstAIfe'..."
docker build -t ForstAIfe .

# Step 4: Run the Docker container
echo "Running Docker container 'ForstAIfe' on port 3000..."
docker run -d --restart=always -p 3000:3000 --name ForstAIfe ForstAIfe

echo "Container 'ForstAIfe' is now running on port 3000."
