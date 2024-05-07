import { useState, createRef } from 'react';
import html2canvas from 'html2canvas';
import ImageScroller from './FPcomponents/ImageScroller';
import ImageDisplayer from './FPcomponents/ImageDisplayer';
import './FloorPlan.css'
function FloorPlan() {
  const [images, setImages] = useState([]);
  const [displayedImage, setDisplayedImage] = useState("");
  const [planInfo, setPlanInfo] = useState({
    floorName: "",
    interiorSize: "",
    exteriorSize: "",
    exteriorType: "",
    facingDir: "",
    floorType: "",
  })


  const updateImageMetadata = (imgSrc) => {
    const newImage = {
      src: imgSrc,
      floorName: planInfo.floorName,
      interiorSize: planInfo.interiorSize,
      exteriorSize: planInfo.exteriorSize,
      exteriorType: planInfo.exteriorType,
      facingDir: planInfo.facingDir,
      floorType: planInfo.floorType,
    }
    setImages(prevImages => [...prevImages, newImage]);
  };
  function captureVisibleImage() {
    const container = document.querySelector('.drop-container'); 
    const originalBorderStyle = container.style.border;
    container.style.border = 'none';
    html2canvas(container, { scale: 1 })
    .then(canvas => {
        const imageURL = canvas.toDataURL('image/png');
        updateImageMetadata(imageURL);
    })
    .catch(error => {
        console.error('Error capturing image:', error);
    });
    container.style.border = originalBorderStyle;
}
  return (
    <div className='FPcontainer'>
        <div className='FPHeader'>
          <h1>Adding Floor Plans</h1>
        </div>
        <div className='FPBody-container'>
          <div className='FPBody'>
          <ImageScroller setImages={setImages} images={images} className='image-scroller' />
          <ImageDisplayer setDisplayedImage={setDisplayedImage} 
          displayedImage={displayedImage} planInfo={planInfo} setPlanInfo={setPlanInfo} 
          updateImageMetadata={updateImageMetadata}/>
          </div>
          <div className='end-body'>
            <button 
            className='save-btn' 
            onClick={captureVisibleImage} 
            style={{
              display: displayedImage === "" ? 'none' : 'inline-block' 
          }}>
              Save
            </button>   
          </div>
        </div>
        <div className='FPFooter'>
          
        </div>
    </div>
  );
}

export default FloorPlan;