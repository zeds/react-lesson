import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const images = [
   {
      original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg",
      thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_1.jpg",
   },
   {
      original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_2.jpg",
      thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_2.jpg",
   },
   {
      original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_3.jpg",
      thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_3.jpg",
   },
   {
    original: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_4.jpg",
    thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m43871960855_4.jpg",
 },
];

function App() {
   const [count, setCount] = useState(0);

   return <ImageGallery 
   items={images} 
   thumbnailPosition= "left"
   showPlayButton={false}
   showFullscreenButton={false}   
   />;
}

export default App;