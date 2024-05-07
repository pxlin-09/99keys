import React from 'react';
import './ImageScroller.css'

function ImageScroller({ setImages, images }) {

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = {
                    src: e.target.result,
                    floorName: "",
                    interiorSize: "",
                    exteriorSize: "",
                    exteriorType: "",
                    facingDir: "",
                    floorType: "",
                    pos: "",
                }
                setImages(prevImages => [...prevImages, data]);
            };
            reader.readAsDataURL(file);
        });
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    const handleDragStart = (e, image) => {
        console.log(image);
        e.dataTransfer.setData("application/json", JSON.stringify(image));
    };

    return (
        <div className="big-img-container">
            <div className="image-scroller">
                {images.map((image, index) => (
                    <div key={`img-div-${index}`} className='image-container'>
                    <img 
                        className='scroll-img'
                        key={`img${index}`}
                        src={image.src} 
                        alt={`uploaded ${index}`} 
                        draggable="true"
                        onDragStart={(e) => handleDragStart(e, image)}
                    />
                    </div>
                ))}
                <input
                    type="file"
                    id="fileInput"
                    onChange={handleImageChange}
                    multiple
                    accept="image/*"
                    style={{ display: 'none' }}
                />
                <button onClick={triggerFileInput} className="upload-button">+</button>
            </div>
        </div>
    );
}

export default ImageScroller;