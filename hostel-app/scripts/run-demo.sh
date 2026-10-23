#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
if [ ! -f backend/target/hostel-1.0.0.jar ]; then bash scripts/build.sh; fi
cd backend
exec java -jar target/hostel-1.0.0.jar --spring.profiles.active=demo
