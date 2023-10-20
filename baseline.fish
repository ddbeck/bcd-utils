#!/usr/bin/env fish

set feature $argv[1]
set browser $argv[2]

function query
    yq '.compat_features[]' $feature
end

function baseline
    query | xargs npx ts-node -T --esm ./examples/baseline.ts $browser
end

query

echo -----

baseline
