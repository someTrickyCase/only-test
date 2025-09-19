import React from "react";
import "./title.scss";

function Title() {
    return (
        <header className='header'>
            <div className='label' />
            <h1 className='pt-sans-bold'>Исторические даты</h1>
        </header>
    );
}

export default React.memo(Title);
