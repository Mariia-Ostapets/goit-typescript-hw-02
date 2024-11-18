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
import {Image, ApiResponse} from "./App.types"

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

  async function fetchImagesWithQuery(query:string, page:number, perPage:number): Promise<Image[]> {
    const url = "https://api.unsplash.com/search/photos";
    try {
      const response = await axios.get<ApiResponse>(url, {
        params: { query, page, per_page: perPage },
        headers: { Authorization: `Client-ID ${accessKey}` },
      });
      setTotalResults(response.data.total);
      return response.data.results;
    } catch (error: any) {
      setError(true);
      setErrorMessage(error.message);
      return [];
    }
  }

  async function handleSearch(newQuery: string):Promise<void> {
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

  async function loadMoreImages(): Promise<void> {
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

  function openModal(url:string, alt:string):void {
    setModalImage(url);
    setModalAlt(alt);
    setIsModalOpen(true);
  }

  function closeModal():void {
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
