import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Image, ApiResponse } from "./App.types";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(16);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [modalAlt, setModalAlt] = useState<string>("");

  const accessKey = "siUPmXWQjsZUTmUZyL9qGwIni_jF-Fn8uFhv33R3JPg";

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(false);

      const url = "https://api.unsplash.com/search/photos";

      try {
        const response = await axios.get<ApiResponse>(url, {
          params: { query, page, per_page: perPage },
          headers: { Authorization: `Client-ID ${accessKey}` },
        });
        setTotalResults(response.data.total);

        if (response.data.total === 0) {
          setImages([]);
          toast.error("No images found", { position: "top-right" });
          return;
        }

        if (page === 1) {
          setImages(response.data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...response.data.results]);
        }

        const totalLoadedImages =
          (page - 1) * perPage + response.data.results.length;
        if (totalLoadedImages >= response.data.total) {
          toast.success("You have reached the end of the collection!", {
            position: "bottom-center",
          });
        }
      } catch (error) {
        setError(true);
        setErrorMessage(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [query, page]);

  const handleSearch = (newQuery: string): void => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const loadMoreImages = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const canLoadMore = images.length < totalResults;

  const openModal = (url: string, alt: string): void => {
    setModalImage(url);
    setModalAlt(alt);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Toaster />
      {error ? (
        <div className={css.errorMessageWrapper}>
          <ErrorMessage errorMessage={errorMessage} />
        </div>
      ) : (
        images.length > 0 && (
          <>
            <ImageGallery items={images} onImageClick={openModal} />
            {!loading && canLoadMore && (
              <LoadMoreBtn onClick={loadMoreImages} />
            )}
          </>
        )
      )}
      {loading && <Loader />}
      <ImageModal
        modalIsOpen={isModalOpen}
        closeModal={closeModal}
        modalImage={modalImage}
        modalAlt={modalAlt}
      />
    </div>
  );
}
