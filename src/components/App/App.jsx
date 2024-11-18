import css from "./App.module.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(16);
  const [totalResults, setTotalResults] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalAlt, setModalAlt] = useState("");

  const accessKey = "siUPmXWQjsZUTmUZyL9qGwIni_jF-Fn8uFhv33R3JPg";

  async function fetchImagesWithQuery(query, page, perPage) {
    const url = "https://api.unsplash.com/search/photos";
    try {
      const response = await axios.get(url, {
        params: { query, page, per_page: perPage },
        headers: { Authorization: `Client-ID ${accessKey}` },
      });
      setTotalResults(response.data.total);
      return response.data.results;
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  }

  async function handleSearch(newQuery) {
    try {
      setImages([]);
      setError(false);
      setLoading(true);
      setQuery(newQuery);
      setPage(1);
      const data = await fetchImagesWithQuery(newQuery, 1, perPage);
      if (data.length === 0) {
        setError(true);
        toast.error("No images found", { position: "top-right" });
      } else {
        setImages(data);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function loadMoreImages() {
    try {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchImagesWithQuery(query, nextPage, perPage);
      setImages((prevImages) => [...prevImages, ...data]);
      setPage(nextPage);
      if (images.length + data.length >= totalResults) {
        toast.success("You have reached the end of the collection!", {
          position: "bottom-center",
        });
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const canLoadMore = images.length < totalResults;

  function openModal(url, alt) {
    setModalImage(url);
    setModalAlt(alt);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

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
