#!/usr/bin/bash

npm run typeorm -- migration:revert -d src/infra/libs/typeorm.ts
