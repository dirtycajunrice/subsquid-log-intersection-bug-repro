import { events as erc1155Events } from "./abi/erc1155";
import { events as erc721Events } from "./abi/erc721-thirdweb-drop";
import { events as erc721SeaDropEvents } from "./abi/erc721-sea-drop-partial";
import { events as marketplaceDirectListingEvents } from "./abi/marketplace-direct-listings-extension";
import { events as marketplaceEnglishAuctionEvents } from "./abi/marketplace-english-auctions-extension";
import { events as marketplaceOfferEvents } from "./abi/marketplace-offers-extension";

export const MARKETPLACE_ADDRESSES = ["0xFF4C94b6D2A89F5CA5FC46A49BE40A42f7352D18"]
export const watchedNftTopics = [
  erc721Events.Transfer.topic,
  erc721SeaDropEvents.ConsecutiveTransfer.topic,
  erc721Events.BatchMetadataUpdate.topic,
  erc1155Events.TransferSingle.topic,
  erc1155Events.TransferBatch.topic,
  erc1155Events.MetadataUpdate.topic,
  erc1155Events.BatchMetadataUpdate.topic
]
export const watchedMarketplaceTopics = [
  marketplaceEnglishAuctionEvents.NewAuction.topic,
  marketplaceEnglishAuctionEvents.AuctionClosed.topic,
  marketplaceEnglishAuctionEvents.CancelledAuction.topic,
  marketplaceEnglishAuctionEvents.NewBid.topic,
  marketplaceDirectListingEvents.NewListing.topic,
  marketplaceDirectListingEvents.UpdatedListing.topic,
  marketplaceDirectListingEvents.CancelledListing.topic,
  marketplaceDirectListingEvents.CurrencyApprovedForListing.topic,
  marketplaceDirectListingEvents.BuyerApprovedForListing.topic,
  marketplaceOfferEvents.NewOffer.topic,
  marketplaceOfferEvents.AcceptedOffer.topic,
  marketplaceOfferEvents.CancelledOffer.topic,
  marketplaceDirectListingEvents.NewSale.topic,
]
