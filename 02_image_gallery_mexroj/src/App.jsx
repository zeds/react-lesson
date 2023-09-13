import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';


const images = [
  {
    original: "https://static.mercdn.net/item/detail/orig/photos/m66662706872_1.jpg",
    thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m66662706872_1.jpg",
  },
  {
    original: "https://static.mercdn.net/item/detail/orig/photos/m66662706872_2.jpg",
    thumbnail: "https://static.mercdn.net/item/detail/orig/photos/m66662706872_2.jpg",
  },
  {
    original: "	https://static.mercdn.net/item/detail/orig/photos/m66662706872_3.jpg",
    thumbnail: "	https://static.mercdn.net/item/detail/orig/photos/m66662706872_3.jpg",
  },
  {
    original: "	https://static.mercdn.net/item/detail/orig/photos/m66662706872_4.jpg",
    thumbnail: "	https://static.mercdn.net/item/detail/orig/photos/m66662706872_4.jpg",
  },
  {
    original: "	https://static.mercdn.net/item/detail/orig/photos/m66662706872_5.jpg",
    thumbnail: "	https://static.mercdn.net/item/detail/orig/photos/m66662706872_5.jpg",
  },
];



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      return <ImageGallery items={images} thumbnailPosition='left' />;
    </>
  )
}

export default App
