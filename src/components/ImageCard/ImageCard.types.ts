export interface ImageCardProps {
  small: string;
  regular: string;
  alt_description: string;
  onModalOpen: (url: string, alt: string) => void;
}
