# AddLog Intersection Bug Reproduction

> [!NOTE]
> All steps are individually committed to preserve historical context and further prove linear progress

## Creation

1. Create repo: `sqd init intersection-bug-repro -t evm`
2. Add [ABIs](abi) for erc721, erc1155, and marketplace
3. Generate types for those abis `sqd typegen`
4. Create [constants.ts](src/constants.ts) containing the marketplace address and all event topics
5. Set `RPC_ETH_HTTP` and `SQD_DEBUG` in [.env](.env).
6. Configure [processor.ts](src/processor.ts) with 1 block finality, soneium gateway, a condensed block range, more fields, addLog for marketplace topics from an address array, addLog for nft transfer topics with no address restriction, and wrap it all in a self executing function to check for `SHOW_EXAMPLE` env var to toggle state between without addTransaction() and with it.
7. Install filesystem store dependency and remove migration from process command.
8. Configure [main.ts](src/main.ts) to save nothing, log to info each event read, skip bad transactions, and use a filesystem store for a simple example. 
9. Add this document.

## Reproduction

1. Pull the repository - `git pull https://github.com/dirtycajunrice/subsquid-log-intersection-bug-repro`
2. Change directory to the project - `cd subsquid-log-intersection-bug-repro`
3. Install dependencies - `npm install`
4. Build - `sqd build`
5. Run normally - `sqd process`
6. Run with addTransaction({}) - add `SHOW_EXAMPLE=true` to [.env](.env) then `sqd process`
7. Observe difference in logs.
8. ???
9. Profit
