import React from "react";
import error from "../../img/error.jpg"
const NotFound = () => {
    return (
        <div className="container">
            <img src={error} alt="404 not found" style={{ width: '100%', height: '80vh' }} />
        </div>
    )
}

export default NotFound;