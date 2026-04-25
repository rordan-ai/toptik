export interface SourceProduct {
  catalogNumber: string;
  title: string;
  description: string | null;
  imageUrls: string[];
  sourceUrl: string;
}

export interface CatalogSourceProvider {
  fetchByCatalogNumber(catalogNumber: string): Promise<SourceProduct>;
}
