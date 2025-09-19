import React, { useContext, useReducer, useState } from "react";
import "./switcher.scss";
import { arrowLeft, arrowRight } from "../../components/icons";
import { SliderContext } from "../../providers/slideStateProvider";

export default function Switcher() {
    const { state, dispatch } = useContext(SliderContext);
    if (!dispatch) return;

    return (
        <div className='switcher'>
            <p className='indicator'>{`0${state.value + 1}/06`}</p>
            <div className='switcher-buttons'>
                <button
                    className='switcher-button'
                    onClick={() => dispatch({ type: "decrease", payload: 1 })}>
                    {arrowLeft}
                </button>
                <button
                    className='switcher-button'
                    onClick={() => dispatch({ type: "increase", payload: 1 })}>
                    {arrowRight}
                </button>
            </div>
        </div>
    );
}
