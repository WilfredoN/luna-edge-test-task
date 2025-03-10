export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface SelectOption {
  value: string;
  label: string;
  image?: string;
  imageUrl?: string;
  url?: string;
  uniqueId?: string; // Add uniqueId for React keys
}

export interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface PaginatedResponse<T> {
  results: T[];
  pagination: PaginationMeta;
}
