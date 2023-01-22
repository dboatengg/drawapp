import { useAtom } from "jotai";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { useInitialState } from "../hooks";
import { AppDrawings, AppState } from "../jotai";
import { renderElements, renderCurrentDrawing } from "../lib/render";
import { CanvasItem, CurrentState } from "../types";

export default function Canvas() {
    const [state, setState] = useState({ drawInProcess: false, drew: false, startRectX: 0, startRectY: 0 })
    const [mainState, updaetMainState] = useAtom(AppState)
    const [items, setItems] = useAtom(AppDrawings)
    const intialStates = useInitialState()
    const [current, setCurrent] = useState<CurrentState>(intialStates)

    function updateState(event: any, rect: DOMRect, drawInProcess: boolean) {
        if (!drawInProcess) {
            switch (mainState.tool) {
                case "line":
                    setCurrent({
                        ...current,
                        line: {
                            ...current.line,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            strokeStyle: mainState.strokeColor,
                            strokeWidth: mainState.strokeWidth,
                            stroke: mainState.stroke
                        }
                    })
                    break;
                case "pencil":
                    setCurrent({
                        ...current,
                        pencil: {
                            ...current.pencil,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            strokeStyle: mainState.strokeColor,
                            strokeWidth: mainState.strokeWidth,
                        }
                    })
                    break;
                case "rectangle":
                    setCurrent({
                        ...current,
                        rectangle: {
                            ...current.rectangle,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            strokeStyle: mainState.strokeColor,
                            strokeWidth: mainState.strokeWidth,
                            fillStyle: mainState.fillColor,
                            stroke: mainState.stroke
                        }
                    })
                    break;
                case "diamond":
                    setCurrent({
                        ...current,
                        diamond: {
                            ...current.diamond,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            strokeStyle: mainState.strokeColor,
                            strokeWidth: mainState.strokeWidth,
                            fillStyle: mainState.fillColor,
                            stroke: mainState.stroke
                        }
                    })
                    break;
                case "ellipse":
                    setCurrent({
                        ...current,
                        ellipse: {
                            ...current.ellipse,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            strokeStyle: mainState.strokeColor,
                            strokeWidth: mainState.strokeWidth,
                            fillStyle: mainState.fillColor,
                            stroke: mainState.stroke
                        }
                    })
                    break;
                case "arrow":
                    setCurrent({
                        ...current,
                        arrow: {
                            ...current.arrow,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            strokeStyle: mainState.strokeColor,
                            strokeWidth: mainState.strokeWidth,
                            stroke: mainState.stroke
                        }
                    })
                    break;
                case "image":
                    if (mainState.imageBlob) {
                        setCurrent({
                            ...current,
                            image: {
                                ...current.image,
                                x: event.pageX - rect.left,
                                y: event.pageY - rect.top,
                                strokeStyle: mainState.strokeColor,
                                strokeWidth: mainState.strokeWidth,
                                fillStyle: mainState.fillColor,
                                data: mainState.imageBlob
                            }
                        })
                    }
                    break;
                default:
                    break;
            }
        } else {
            switch (mainState.tool) {
                case "line":
                    setCurrent({
                        ...current,
                        line: {
                            ...current.line,
                            points: [{ x: 0, y: 0 }, {
                                x: event.pageX - rect.left,
                                y: event.pageY - rect.top,
                            }],
                        }
                    })
                    break;
                case "pencil":
                    setCurrent({
                        ...current,
                        pencil: {
                            ...current.pencil,
                            points: [...current.pencil.points, {
                                x: event.pageX - rect.left - current.pencil.x,
                                y: event.pageY - rect.top - current.pencil.y,
                            }]
                        }
                    })
                    break;
                case "rectangle":
                    setCurrent({
                        ...current,
                        rectangle: {
                            ...current.rectangle,
                            width: event.pageX - rect.left - current.rectangle.x,
                            height: event.pageY - rect.top - current.rectangle.y,
                        }
                    })
                    break;
                case "diamond":
                    setCurrent({
                        ...current,
                        diamond: {
                            ...current.diamond,
                            width: event.pageX - rect.left - current.diamond.x,
                            height: event.pageY - rect.top - current.diamond.y,
                        }
                    })
                    break;
                case "ellipse":
                    setCurrent({
                        ...current,
                        ellipse: {
                            ...current.ellipse,
                            width: event.pageX - rect.left - current.ellipse.x,
                            height: event.pageY - rect.top - current.ellipse.y,
                        }
                    })
                    break;
                case "arrow":
                    setCurrent({
                        ...current,
                        arrow: {
                            ...current.arrow,
                            points: [{ x: 0, y: 0 }, {
                                x: event.pageX - rect.left - current.arrow.x,
                                y: event.pageY - rect.top - current.arrow.y,
                            }],
                        }
                    })
                    break;
                case "image":
                    if (mainState.imageBlob) {
                        setCurrent({
                            ...current,
                            image: {
                                ...current.image,
                                x: event.pageX - rect.left,
                                y: event.pageY - rect.top,
                                strokeStyle: mainState.strokeColor,
                                strokeWidth: mainState.strokeWidth,
                                fillStyle: mainState.fillColor,
                                data: mainState.imageBlob
                            }
                        })
                    }
                default:
                    break;
            }
        }

    }

    function handleMouseDown(event: any) {
        let rect = document.getElementById("canvas")!.getBoundingClientRect();
        updateState(event, rect, state.drawInProcess)
        setState({
            drawInProcess: true, startRectX: event.pageX - rect.left,
            startRectY: event.pageY - rect.top, drew: false
        });
    }

    useEffect(() => {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = c!.getContext("2d")!;
        ctx.canvas.width = window.devicePixelRatio * window.innerWidth
        ctx.canvas.height = window.devicePixelRatio * window.innerHeight
        renderElements(ctx, JSON.parse(localStorage.getItem("canvasItems") || "[]"))
    }, [])


    function handleMouseMove(event: any) {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let rect = c.getBoundingClientRect();
        if (state.drawInProcess) {
            updateState(event, rect, true)
            setState({ ...state, drew: true })
        }
    }


    useEffect(() => {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = c.getContext('2d')!;
        ctx.clearRect(0, 0, window.devicePixelRatio * window.innerWidth, window.devicePixelRatio * window.innerHeight)
        if (items.length > 0) {
            renderElements(ctx, items)
        }
        if (mainState.tool === "pencil") {
            renderCurrentDrawing(ctx, current.pencil)
        } else if (mainState.tool === "line") {
            renderCurrentDrawing(ctx, current.line)
        } else if (mainState.tool === "rectangle") {
            renderCurrentDrawing(ctx, current.rectangle)
        } else if (mainState.tool === "diamond") {
            renderCurrentDrawing(ctx, current.diamond)
        } else if (mainState.tool === "ellipse") {
            renderCurrentDrawing(ctx, current.ellipse)
        } else if (mainState.tool === "arrow") {
            renderCurrentDrawing(ctx, current.arrow)
        }
    }, [items, current])


    function handleMouseUp(event: any) {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = c.getContext('2d')!;
        if (current) {
            if (mainState.tool === "pencil") {
                setItems([...items, current.pencil])
                localStorage.setItem("canvasItems", JSON.stringify([...items, current.pencil]))
            } else if (mainState.tool === "line") {
                setItems([...items, current.line])
                localStorage.setItem("canvasItems", JSON.stringify([...items, current.line]))

            } else if (mainState.tool === "rectangle") {
                setItems([...items, current.rectangle])
                localStorage.setItem("canvasItems", JSON.stringify([...items, current.rectangle]))
            } else if (mainState.tool === "diamond") {
                setItems([...items, current.diamond])
                localStorage.setItem("canvasItems", JSON.stringify([...items, current.diamond]))

            } else if (mainState.tool === "ellipse") {
                setItems([...items, current.ellipse])
                localStorage.setItem("canvasItems", JSON.stringify([...items, current.ellipse]))
            } else if (mainState.tool === "arrow") {
                setItems([...items, current.arrow])
                localStorage.setItem("canvasItems", JSON.stringify([...items, current.arrow]))
            }
            setCurrent(intialStates)
        }
        if (state.drew) {
            updaetMainState({ ...mainState, tool: "select" })
        }
        setState({ ...state, drawInProcess: false })
    }

    return (
        <canvas
            id="canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
        </canvas>
    )
}