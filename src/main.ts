import { Database, LocalDest } from "@subsquid/file-store";
import { Column, Table, Types } from "@subsquid/file-store-csv";
import { events as erc1155Events } from "./abi/erc1155";
import { events as erc721SeaDropEvents } from "./abi/erc721-sea-drop-partial";
import { events as erc721Events } from "./abi/erc721-thirdweb-drop";
import { events as marketplaceDirectListingEvents } from "./abi/marketplace-direct-listings-extension";
import { events as marketplaceEnglishAuctionEvents } from "./abi/marketplace-english-auctions-extension";
import { events as marketplaceOfferEvents } from "./abi/marketplace-offers-extension";
import { watchedMarketplaceTopics, watchedNftTopics } from "./constants";
import { processor } from "./processor";

const dbOptions = {
  tables: { ExampleTable: new Table("example.csv", { placeholder: Column(Types.String()) }) },
  dest: new LocalDest("./data"),
  chunkSizeMb: 10
};

processor.run(new Database(dbOptions), async (ctx) => {

  for (let c of ctx.blocks) {
    for (let tx of c.transactions) {

      if (tx.status !== 1) {
        ctx.log.info(`Transaction Status ${tx.status}!=1, skipping...`);
        continue;
      }

      for (let log of tx.logs) {
        if (![...watchedNftTopics, ...watchedMarketplaceTopics].some(topic => topic === log.topics[0])) {
          ctx.log.warn(`Log topic ${log.topics[0]} is not watched...`);
          continue;
        }

        switch (log.topics[0]) {
          case erc721SeaDropEvents.ConsecutiveTransfer.topic: {
            ctx.log.info("ERC721 ConsecutiveTransfer called");
            break;
          }
          case erc721Events.Transfer.topic: {
            ctx.log.info("ERC721 Transfer called");
            break;
          }
          case erc721Events.BatchMetadataUpdate.topic: {
            ctx.log.info("ERC721 BatchMetadataUpdate called");
            break;
          }
          case erc1155Events.TransferSingle.topic: {
            ctx.log.info("ERC1155 TransferSingle called");
            break;
          }
          case erc1155Events.TransferBatch.topic: {
            ctx.log.info("ERC1155 TransferBatch called");
            break;
          }
          case erc1155Events.MetadataUpdate.topic: {
            ctx.log.info("ERC1155 MetadataUpdate called");
            break;
          }
          case erc1155Events.BatchMetadataUpdate.topic: {
            ctx.log.info("ERC1155 BatchMetadataUpdate called");
            break;
          }
          case marketplaceEnglishAuctionEvents.NewAuction.topic: {
            ctx.log.info("Marketplace NewAuction called");
            break;
          }
          case marketplaceEnglishAuctionEvents.AuctionClosed.topic: {
            ctx.log.info("Marketplace AuctionClosed called");
            break;
          }
          case marketplaceEnglishAuctionEvents.CancelledAuction.topic: {
            ctx.log.info("Marketplace CancelledAuction called");
            break;
          }
          case marketplaceEnglishAuctionEvents.NewBid.topic: {
            ctx.log.info("Marketplace NewBid called");
            break;
          }
          case marketplaceDirectListingEvents.NewListing.topic: {
            ctx.log.info("Marketplace NewListing called");
            break;
          }
          case marketplaceDirectListingEvents.UpdatedListing.topic: {
            ctx.log.info("Marketplace UpdatedListing called");
            break;
          }
          case marketplaceDirectListingEvents.CancelledListing.topic: {
            ctx.log.info("Marketplace CancelledListing called");
            break;
          }
          case marketplaceDirectListingEvents.NewSale.topic: {
            ctx.log.info("Marketplace NewSale called");
            break;
          }
          case marketplaceDirectListingEvents.CurrencyApprovedForListing.topic: {
            ctx.log.info("Marketplace CurrencyApprovedForListing called");
            break;
          }
          case marketplaceDirectListingEvents.BuyerApprovedForListing.topic: {
            ctx.log.info("Marketplace BuyerApprovedForListing called");
            break;
          }
          case marketplaceOfferEvents.NewOffer.topic: {
            ctx.log.info("Marketplace NewOffer called");
            break;
          }
          case marketplaceOfferEvents.AcceptedOffer.topic: {
            ctx.log.info("Marketplace AcceptedOffer called");
            break;
          }
          case marketplaceOfferEvents.CancelledOffer.topic: {
            ctx.log.info("Marketplace CancelledOffer called");
            break;
          }
          default: {
            ctx.log.warn(`Unhandled log topics!\naddress: ${log.address}\ntxHash: ${tx.hash}\ntopics:\n  ${log.topics.join("\n  ")}`);
          }
        }
      }
    }
  }
});
