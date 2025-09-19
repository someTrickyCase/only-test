import React from "react";
import "./mainPage.scss";
import ScreenWidthProvider from "../providers/screenWidthProvider";
import Grid from "../components/grid/Grid";
import Title from "../components/title/Title";
import SliderStateProvider from "../providers/slideStateProvider";
import Circle from "../components/circle/Circle";
import Switcher from "../components/switcher/Switcher";
import Dates from "../components/dates/Dates";
import Slider from "../components/slider/Slider";

export default function MainPage() {
    return (
        <main className='page'>
            <ScreenWidthProvider>
                <Grid />
                <Title />
                <SliderStateProvider>
                    <Circle />
                    <Switcher />
                    <Dates />
                    <Slider />
                </SliderStateProvider>
            </ScreenWidthProvider>
        </main>
    );
}
