import React, { useContext, useEffect, useState } from "react";
import { SliderContext } from "../../providers/slideStateProvider";
import { mockData } from "../../mockData";
import "./dates.scss";

function randomDelay() {
    return Math.floor(Math.random() * 150 + 50);
}

function randomDiff() {
    return Math.floor(Math.random() * 7 + 2);
}

export default function Dates() {
    const { state } = useContext(SliderContext);

    const [dateState, setDateState] = useState({
        start: findStartDate(state.value),
        end: findEndDate(state.value),
    });

    useEffect(() => {
        const newStartDate = findStartDate(state.value);
        const newEndDate = findEndDate(state.value);
        if (!newStartDate || !newEndDate) return;
        animateCounter(newStartDate + randomDiff(), newStartDate, "start");
        animateCounter(newEndDate + randomDiff(), newEndDate, "end");
    }, [state]);

    function animateCounter(a: number, b: number, action: "start" | "end") {
        if (a + 1 === b) return;
        if (action === "start")
            setDateState((prev) => {
                return { ...prev, start: a };
            });
        else
            setDateState((prev) => {
                return { ...prev, end: a };
            });
        setTimeout(() => animateCounter(a - 1, b, action), randomDelay());
    }

    function findStartDate(id: number) {
        const currentStartDate = mockData.find((el) => el.id === id)?.startDate;
        return currentStartDate;
    }

    function findEndDate(id: number) {
        const currentEndDate = mockData.find((el) => el.id === id)?.endDate;
        return currentEndDate;
    }

    return (
        <div className='dates'>
            <h2 className='start-date'>{dateState.start}</h2>
            <h2 className='end-date'>{dateState.end}</h2>
        </div>
    );
}
