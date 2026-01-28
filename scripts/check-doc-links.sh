#!/usr/bin/env bash

echo "=== Checking Documentation Links ==="
echo

MISSING_FILES=0
TOTAL_LINKS=0

# Check all .md links in README.md
while IFS= read -r line; do
    # Extract markdown links pointing to docs/
    if echo "$line" | grep -q "\.md)"; then
        # Extract the file path
        FILE=$(echo "$line" | grep -o "docs/[^)]*\.md" | head -1)
        
        if [ ! -z "$FILE" ]; then
            TOTAL_LINKS=$((TOTAL_LINKS + 1))
            
            if [ -f "$FILE" ]; then
                echo "✓ $FILE"
            else
                echo "✗ $FILE (MISSING)"
                MISSING_FILES=$((MISSING_FILES + 1))
            fi
        fi
    fi
done < README.md

echo
echo "=== Summary ==="
echo "Total links checked: $TOTAL_LINKS"
echo "Missing files: $MISSING_FILES"

if [ $MISSING_FILES -eq 0 ]; then
    echo "🎉 All documentation links are valid!"
    exit 0
else
    echo "❌ Found $MISSING_FILES broken link(s)"
    exit 1
fi