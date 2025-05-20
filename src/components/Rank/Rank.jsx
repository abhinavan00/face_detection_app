import React from "react";

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className="f4">
                {`${name}, your entry count is...`}
            </div>
            <div className="f2">
                {entries}
            </div>
        </div>
    )
}

export default Rank;