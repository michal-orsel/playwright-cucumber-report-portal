#!/bin/bash

echo "Initializing Test Stack..."
echo "Note: Prerequisites required. Read README.md for more details."

echo "Step 1: Navigating to test-stack folder..."
cd test-stack

echo "Step 2: Starting all services..."
docker compose up -d

echo "Step 3: Navigating back to project root..."
cd ..

echo "Step 4: Install node modules..."
npm run npm ci

echo "Step 5: Install Playwright browsers..."
npm npx playwright install

echo "Step 6: Running automation to get Report Portal API key..."
npm run report-portal:setup-api-key

echo "Step 7: Running automation to complete WordPress installation..."
npm run tag-install

echo "Test Stack Initialization Complete!"
echo "Access WordPress at http://localhost:8099"
echo "Access Report Portal at http://localhost:8080"
