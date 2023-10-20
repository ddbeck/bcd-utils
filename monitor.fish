#!/usr/bin/env fish

set feature $argv[1]
set browser $argv[2]

find $feature | entr -r ./baseline.fish $feature $browser
