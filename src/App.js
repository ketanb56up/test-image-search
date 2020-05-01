import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import Constants from "./helpers/constants";
import { fetchFromFlickrApi } from "./helpers/api";
import SearchInput from "./components/SearchInput";
import ImageView from "./components/ImageView";

const ApiKey = Constants.FLICKR_IMAGE_API_KEY;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSearched: "",
      imageData: [],
      page: "",
      showMoreImages: false,
    };
  }

  handleInputChange = (e) => {
    this.setState({ imageSearched: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.imageSearched) {
      const url = `/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&format=json&nojsoncallback=1&safe_search=1&text=${this.state.imageSearched}`;
      const { data } = await fetchFromFlickrApi(url);
      if (data.photos) {
        const imageData = data.photos.photo;
        const page = data.photos.page;
        this.setState({
          imageData: imageData,
          page: page,
        });
      }
    }
  };

  handleMoreImagesClick = async (e) => {
    const { page } = this.state;
    const url = `/services/rest/?method=flickr.photos.search&api_key=${ApiKey}&format=json&nojsoncallback=1&safe_search=1&text=${
      this.state.imageSearched
    }&page=${page + 1}`;
    const { data } = await fetchFromFlickrApi(url);
    if (data.photos) {
      const imageData = data.photos.photo;
      const page = data.photos.page;
      this.setState({
        imageData: [...this.state.imageData, ...imageData],
        page: page,
      });
    }
  };

  render() {
    const { imageSearched, imageData, showMoreImages } = this.state;
    return (
      <div>
        <h1 className="header">Image Search</h1>
        <div className="search">
          <SearchInput
            handleChange={this.handleInputChange}
            handleSubmit={this.handleSubmit}
            value={imageSearched}
          />
        </div>
        <div className="showImageData">
          {imageData && <ImageView imageData={imageData} />}
        </div>
        <div className="button">
          {imageData.length !== 0 && !showMoreImages && (
            <Button
              variant="contained"
              onClick={this.handleMoreImagesClick}
              color="primary"
              href="#contained-buttons"
            >
              More Images
            </Button>
          )}
        </div>
      </div>
    );
  }
}
