import React, { useContext } from "react";
import { ScreenWidthContext } from "../../providers/screenWidthProvider";
import "./grid.scss";

function Grid() {
    const screenWidth = useContext(ScreenWidthContext);
    if (screenWidth && screenWidth <= 1120) return;
    return (
        <div className='grid-container'>
            <div className='borders'>
                <div className='line-vert' />
                <div className='line-hor' />
            </div>
        </div>
    );
}

export default React.memo(Grid);
