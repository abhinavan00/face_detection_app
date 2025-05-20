import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
            <nav style={{display: "flex", justifyContent: "flex-end"}}>
                <p onClick={() => onRouteChange('signin')} className="f4 grow pointer bg-light-gray pv2 ph3 br3">Sign Out</p>
            </nav>
        )
    } else {
       return (
        <nav style={{display: "flex", justifyContent: "flex-end"}}>
            <p onClick={() => onRouteChange('signin')} className="f4 grow pointer bg-light-gray pv2 ph3 br3">Sign In</p>
            <p onClick={() => onRouteChange('register')} className="f4 grow pointer bg-light-gray pv2 ph3 br3 ml3">Register</p>
        </nav>
       ) 
    }
}

export default Navigation;