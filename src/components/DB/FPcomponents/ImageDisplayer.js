import { useState, useRef } from "react";
import html2canvas from 'html2canvas';
import './ImageDisplayer.css';
function ImageDisplayer({ displayedImage, setDisplayedImage, planInfo, setPlanInfo, updateImageMetadata }) {
    const [zoom, setZoom] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 }); 
    const [rotation, setRotation] = useState(0); 
    const draggingItem = useRef();
    const dragItemPosition = useRef({ x: 0, y: 0 }); 

    

    const default_zoom = 0.45;
    const default_pos = {x:160, y:120};

    const handleDragStart = (e) => {
        draggingItem.current = true;
        dragItemPosition.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };

    const handleDragging = (e) => {
        if (draggingItem.current) {
            const newPosition = {
                x: e.clientX - dragItemPosition.current.x,
                y: e.clientY - dragItemPosition.current.y
            };
            setPosition(newPosition);
        }
    };

    const handleDragEnd = () => {
        draggingItem.current = false;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const image = JSON.parse(e.dataTransfer.getData("application/json"));
        setDisplayedImage(image.src);
        setPlanInfo({
            floorName: image.floorName,
            interiorSize: image.interiorSize,
            exteriorSize: image.exteriorSize,
            exteriorType: image.exteriorType,
            facingDir: image.facingDir,
            floorType: image.floorType,
          });
        setZoom(default_zoom);
        setPosition(default_pos);
    };

    const handleZoom = (e) => {
        setZoom(e.target.value);
    }
    const rotateClockwise = () => {
        setRotation((prevRotation) => prevRotation + 10);
    };

    const rotateCounterClockwise = () => {
        setRotation((prevRotation) => prevRotation - 10);
    };

    const handleFloorChange = (e) => {
        setPlanInfo(prevState => ({
            ...prevState,
            floorName: e.target.value
          }));
    };

    const handleInteriorChange = (e) => {
        setPlanInfo(prevState => ({
            ...prevState,
            interiorSize: e.target.value
          }));
    };

    const handleExteriorChange = (e) => {
        setPlanInfo(prevState => ({
            ...prevState,
            exteriorSize: e.target.value
          }));
    };

    const handleExTypeChange = (e) => {
        setPlanInfo(prevState => ({
            ...prevState,
            exteriorType: e.target.value
          }));
    }

    const handleFacingDirChange = (e) => {
        setPlanInfo(prevState => ({
            ...prevState,
            facingDir: e.target.value
          }));
    }

    const handleFloorTypeChange = (e) => {
        setPlanInfo(prevState => ({
            ...prevState,
            floorType: e.target.value
          }));
    }
    return (
        <div className="display-container">
            <div className="display-left">
                <h1 className="display-title">Adjust Floor Plans</h1>
                <div 
                    className="drop-container"
                    onDrop={handleDrop}
                    onMouseMove={handleDragging}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onDragOver={handleDragOver} 
                    
                >
                    {displayedImage && (
                    <img
                        className="displayed-img"
                        onMouseDown={handleDragStart}
                        src={displayedImage}
                        alt="Dropped"
                        style={{
                            position: 'absolute',
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            transform: `translate(-50%, -50%) scale(${zoom}) rotate(${rotation}deg)`,
                            transformOrigin: 'center',
                            cursor: 'grabbing',
                        }}
                        draggable="false"
                    />
                )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div className="slider-container">
                    <input
                        className="slider"
                        type="range"
                        min="0.01"
                        max="1.6"
                        step="0.01"
                        value={zoom}
                        onChange={handleZoom}
                        style={{
                            width: '10vw',
                            margin: '10px',
                            display: 'block',
                        }}
                    />
                    </div>
                    <div className="rot-btn">
                        <button onClick={rotateCounterClockwise}>↺</button>
                        <button onClick={rotateClockwise}>↻</button>
                    </div>
                </div>
            </div>
            <div className="display-right">
                <div className="input-right">
                <p>Floor Name</p>
                <input
                    className="img-info"
                    type="text"
                    value={planInfo.floorName}
                    onChange={handleFloorChange}
                />
                </div>

                <div className="input-right">
                <p>Interior Size</p>
                <input
                    className="img-info"
                    type="text"
                    value={planInfo.interiorSize}
                    onChange={handleInteriorChange}
                />
                </div>

                <div className="input-right">
                <p>Exterior Size</p>
                <input
                    className="img-info"
                    type="text"
                    value={planInfo.exteriorSize}
                    onChange={handleExteriorChange}
                />
                </div>

                <div className="input-right">
                <p>Exterior Type</p>
                <select
                className="custom-select"
                    value={planInfo.exteriorType}
                    onChange={handleExTypeChange}
                >
                    <option value=""></option>
                    <option value="Balcony">Balcony</option>
                    <option value="Garden">Garden</option>
                    <option value="Lawn">Lawn</option>
                </select>
                </div>
                
                <div className="input-right">
                <p>Facing Direction</p>
                <select
                className="custom-select"
                    value={planInfo.facingDir}
                    onChange={handleFacingDirChange}
                >
                    <option value=""></option>
                    <option value="North">North</option>
                    <option value="West">West</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                </select>
                </div>

                <div className="input-right">
                <p>Floor Type</p>
                <select
                className="custom-select"
                    value={planInfo.floorType}
                    onChange={handleFloorTypeChange}
                >
                    <option value=""></option>
                    <option value="Studio">Studio</option>
                    <option value="One Bed One Bath">One Bed One Bath</option>
                    <option value="Two Bed One Bath">Two Bed One Bath</option>
                    <option value="Three Bed 2 Bath">Three Bed 2 Bath</option>
                </select>
                </div>

            </div>
        </div>
    );
}

export default ImageDisplayer;