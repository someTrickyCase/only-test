import React, { useContext, useEffect, useState } from "react";
import { ScreenWidthContext } from "../../providers/screenWidthProvider";
import { SliderContext } from "../../providers/slideStateProvider";
import { mockData } from "../../mockData";
import "./circle.scss";

function calculateDotPosition(index: number, radius: number): string {
    const valueX = Math.ceil(radius * Math.sin((Math.PI / 3) * index));
    const valueY = Math.ceil(radius * Math.cos((Math.PI / 3) * index));
    return ` translateX(${valueX}px) translateY(${valueY}px)`;
}

export default function Circle() {
    const screenWidth = useContext(ScreenWidthContext);

    const { state, dispatch } = useContext(SliderContext);
    const [turnState, setTurnState] = useState({ deg: -120, currentSlide: state.value });

    useEffect(() => {
        setTurnState((prev) => ({
            deg: prev.deg + (state.value - prev.currentSlide) * 60,
            currentSlide: state.value,
        }));
    }, [state]);

    function findLabel(id: number) {
        return mockData.find((el) => el.id === id)?.title || "";
    }

    function handleSelect(index: number) {
        if (!dispatch) return;
        setTurnState((prev) => ({
            deg: prev.deg + (state.value - prev.currentSlide) * 60,
            currentSlide: state.value,
        }));
        dispatch({ type: "set", payload: index });
    }

    if (!screenWidth || screenWidth <= 1120) return;
    return (
        <div className='circle'>
            <div
                className='dots'
                style={{
                    transform: `rotate(${turnState.deg}deg)`,
                }}>
                {mockData.map((dot) => (
                    <div
                        className='dot-container'
                        key={dot.id}
                        style={{
                            transform: calculateDotPosition(dot.id, 265),
                        }}
                        onClick={() => handleSelect(dot.id)}>
                        <div className={state.value === dot.id ? "selected-dot" : "dot"}>
                            <p
                                style={{
                                    transform: `rotate(${-turnState.deg}deg)`,
                                }}>
                                {dot.id + 1}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <h3 key={state.value} className='subtitle'>
                {findLabel(state.value)}
            </h3>
        </div>
    );
}
