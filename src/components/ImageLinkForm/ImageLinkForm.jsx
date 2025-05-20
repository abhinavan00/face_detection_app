import React, {useState} from "react";
import './ImageLinkForm.css'
import Rank from "../Rank/Rank";
import Logo from "../Logo/Logo";
import FaceRecognition from '../FaceRecognition/FaceRecognition'

const ImageLinkForm = ({onButtonSubmit, onInputChange, imageUrl, box, name, entries}) => {
    const [isVisible, setIsVisible] = useState(false);
 
    const handleClick1 = () => {
        setIsVisible(true);
    }

    const handleClick2 = () => {
        onButtonSubmit();
    }

    const handleBothClick = () => {
        handleClick1();
        handleClick2();
    }

    return (
        <div className="mt4">
            <div className="pa4 shadow-5 bg-light-gray br3 center mw7">
                <div className="pb4" style={{display: "flex", justifyContent: "center"}}>
                    <Logo />
                </div>
                <Rank name={name} entries={entries} />
                <p className="pb2">This App will detect face in your images, Give it a Try!!</p>
                <input className="pa2 br2 w-70 ba" type="text" onChange={onInputChange} />
                <button onClick={handleBothClick} className="button br2 white f5 pa2 w-30 grow ba mb4">
                    Detect
                </button>
                {isVisible && <FaceRecognition imageUrl={imageUrl} box={box} />}
            </div>
        </div>
    )
}

export default ImageLinkForm;