import { CatalogSourceProvider } from "@/lib/catalog-source/types";
import { MandarinaDuckScraperProvider } from "@/lib/catalog-source/mandarina-scraper";

export function createCatalogSourceProvider(): CatalogSourceProvider {
  return new MandarinaDuckScraperProvider();
}
