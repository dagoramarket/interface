import { ENABLED_TOKENS } from "@/constants";
import { parseUnits } from "ethers/lib/utils";

export function buildListing(
  title: string,
  description: string,
  image: string,
  category: string,
  tags: string[],
  tokens: string[],
  price: string,
  priceToken: string
) {
  return {
    version: 1,
    title: title,
    description: description,
    categories: [category],
    tags: tags,
    images: [`ipfs://${image}`],
    allowed_tokens: tokens
      .sort((x, y) => (x == priceToken ? -1 : y == priceToken ? 1 : 0))
      .map((token) => ENABLED_TOKENS[token].address),
    price: parseUnits(price, ENABLED_TOKENS[priceToken].decimals).toString(),
  };
}
