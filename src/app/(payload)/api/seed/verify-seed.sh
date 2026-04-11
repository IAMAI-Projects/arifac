#!/bin/bash
# Verification script for seed endpoint
# Run after: pnpm dev (with DATABASE_URI configured)

BASE_URL="${1:-http://localhost:3000}"
PASS=0
FAIL=0

echo "=== Seed Endpoint Verification ==="
echo "Base URL: $BASE_URL"
echo ""

# 1. Run seed
echo "--- Running seed endpoint ---"
SEED_RESULT=$(curl -s "$BASE_URL/api/seed")
if echo "$SEED_RESULT" | grep -q '"success":true'; then
  echo "PASS: Seed returned success:true"
  PASS=$((PASS+1))
else
  echo "FAIL: Seed did not return success:true"
  echo "Response: $SEED_RESULT"
  FAIL=$((FAIL+1))
fi
echo ""

# 2. Verify all pages return HTTP 200
echo "--- Verifying page status codes ---"
for slug in about contact membership member-benefits members meetings gallery training-leads sectoral-nodal-officers resources help faqs privacy terms-of-use disclaimer; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$slug")
  if [ "$STATUS" = "200" ]; then
    echo "PASS: /$slug -> $STATUS"
    PASS=$((PASS+1))
  else
    echo "FAIL: /$slug -> $STATUS (expected 200)"
    FAIL=$((FAIL+1))
  fi
done

# 3. Verify special pages
echo ""
echo "--- Verifying special pages ---"
for path in "" certifications programmes updates; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$path")
  if [ "$STATUS" = "200" ]; then
    echo "PASS: /$path -> $STATUS"
    PASS=$((PASS+1))
  else
    echo "FAIL: /$path -> $STATUS (expected 200)"
    FAIL=$((FAIL+1))
  fi
done

# 4. Verify about page CMS content
echo ""
echo "--- Verifying CMS content rendering ---"
ABOUT_HTML=$(curl -s "$BASE_URL/about")
if echo "$ABOUT_HTML" | grep -q "Cyber fraud"; then
  echo "PASS: About page contains 'Cyber fraud' (CMS whySection)"
  PASS=$((PASS+1))
else
  echo "FAIL: About page missing 'Cyber fraud'"
  FAIL=$((FAIL+1))
fi

echo ""
echo "=== Results: $PASS passed, $FAIL failed ==="
if [ "$FAIL" -eq 0 ]; then
  echo "ALL CHECKS PASSED"
  exit 0
else
  echo "SOME CHECKS FAILED"
  exit 1
fi
