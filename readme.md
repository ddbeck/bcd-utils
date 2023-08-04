## Generate a TSV from BCD

```
git clone -b tsv-export git@github.com:ddbeck/bcd-utils.git bcd-utils-tsv-export
cd bcd-utils-tsv-export
npm install
node ./examples/features-to-csv.mjs > bcd-features-list.tsv
```

Caveats:

- It uses a very naive method to determine version added dates.
  Let me know if you need something smart or more specific.
- I don't intend to maintain this long-term.
