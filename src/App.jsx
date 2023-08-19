import React, { Component } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem/ImageGalleryItem';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from './components/Loader/Loader';

class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    currentPage: 1,
    largeImageUrl: '',
    showModal: false,
    isLoading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      images: [],
      currentPage: 1,
    });
  };

  fetchImages = () => {
    const { searchQuery, currentPage } = this.state;

    this.setState({ isLoading: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}&key=38138033-59618da37527b2e085afc0aca&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.data.hits],
          currentPage: prevState.currentPage + 1,
        }));
      })
      .catch(error => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  openModal = largeImageUrl => {
    this.setState({ largeImageUrl, showModal: true });
  };

  closeModal = () => {
    this.setState({ largeImageUrl: '', showModal: false });
  };

  render() {
    const { images, showModal, largeImageUrl, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onChangeQuery} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              onClick={this.openModal}
            />
          ))}
        </ImageGallery>
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.fetchImages}>Load more</Button>
        )}
        {showModal && (
          <Modal
            largeImageURL={largeImageUrl}
            onClose={this.closeModal}
          />
        )}
      </div>
    );
  }
}

export default App;