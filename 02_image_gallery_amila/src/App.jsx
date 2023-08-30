import "./App.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const images = [
   {
      original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161",
      thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161/id/1018/250/150/",
   },
   {
      original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161",
      thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161/id/1018/250/150/",
   },
   {
      original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161",
      thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg?1690880161/id/1018/250/150/",
   },
];

function App() {

   return <ImageGallery items={images} thumbnailPosition="left"/>;
}

export default App;