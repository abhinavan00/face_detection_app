import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl, box}) => {
    return (
       <div className="mt4">
            <div className="">
                <div className="image-container">
                <img id="inputImage" className="br3 shadow-5" src={imageUrl} width={'500px'} height={'auto'} />
                <div className="bounding-box" 
                    style={{top: box.topRow,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                            right: box.rightCol}}
                ></div>
                </div>
            </div>
       </div>
    )
}

export default FaceRecognition;