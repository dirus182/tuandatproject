#!/bin/bash
set -e

DUMP_FILE="/docker-entrypoint-initdb.d/doannnn.dump"

if [ -f "$DUMP_FILE" ]; then
  echo "Restoring PostgreSQL custom dump into database $POSTGRES_DB"
  pg_restore \
    --username "$POSTGRES_USER" \
    --dbname "$POSTGRES_DB" \
    --no-owner \
    --no-privileges \
    --clean \
    --if-exists \
    "$DUMP_FILE"
fi
