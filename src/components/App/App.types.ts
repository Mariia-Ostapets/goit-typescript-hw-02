export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}

export interface ApiResponse {
  total: number;
  results: Image[];
}
