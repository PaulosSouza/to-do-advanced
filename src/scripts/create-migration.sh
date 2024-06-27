#!/usr/bin/bash

npm run typeorm -- migration:create src/infra/databases/typeorm/migrations/${1}
