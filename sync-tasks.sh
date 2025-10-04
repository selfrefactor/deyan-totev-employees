#!/bin/bash

# Define the template repository URL
TEMPLATE_REPO="https://github.com/selfrefactor/react-starter"

# Define the temporary directory to clone the template repository
TEMP_DIR=$(mktemp -d)

# Clone the template repository
git clone $TEMPLATE_REPO $TEMP_DIR --depth 1

# Remove the existing scripts/tasks directory
rm -rf scripts/tasks

# Copy the scripts/tasks folder from the template repository to the current repository
cp -r $TEMP_DIR/scripts/tasks scripts/

# Remove the existing eslint.config.mjs file
rm -f eslint.config.mjs

# Copy the eslint.config.mjs file from the template repository to the current repository
cp $TEMP_DIR/eslint.config.mjs .

# Clean up the temporary directory
rm -rf $TEMP_DIR

echo "scripts/tasks folder and eslint.config.mjs file have been synced from the template repository."