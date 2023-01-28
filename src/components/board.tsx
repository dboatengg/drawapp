import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useInitialState } from "../hooks";
import { AppDrawings, AppState, SelectionAtom } from "../jotai";
import { renderElements, renderCurrentDrawing, renderBounds } from "../lib/render";
import { getBoundingBox, getItemEnclosingPoint, getRandomID, isWithinItem, isWithinResizeArea, moveItem, resizeSelected } from "../lib/utils";
import { CurrentState, Text } from "../types";

export default function Canvas() {
    const [state, setState] = useState({ drawInProcess: false, resizeDir: "", drew: false, startRectX: 0, startRectY: 0, moveStart: false })
    const [mainState, updateMainState] = useAtom(AppState)
    const [items, setItems] = useAtom(AppDrawings)
    const intialStates = useInitialState()
    const [current, setCurrent] = useState<CurrentState>(intialStates)

    const [selectedItem] = useAtom(SelectionAtom)

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
                            stroke: mainState.stroke,
                            opacity: mainState.opacity
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
                            opacity: mainState.opacity
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
                            stroke: mainState.stroke,
                            opacity: mainState.opacity,
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
                            stroke: mainState.stroke,
                            opacity: mainState.opacity,
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
                            stroke: mainState.stroke,
                            opacity: mainState.opacity,
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
                            stroke: mainState.stroke,
                            opacity: mainState.opacity,
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
                                data: mainState.imageBlob,
                                opacity: mainState.opacity,
                            }
                        })
                    }
                    break;
                case "text":
                    setCurrent({
                        ...current,
                        text: {
                            ...current.text,
                            x: event.pageX - rect.left,
                            y: event.pageY - rect.top,
                            opacity: mainState.opacity,
                            fontFamily: mainState.fontFamily,
                            fontSize: mainState.fontSize,
                            textStyle: mainState.textStyle,
                            strokeWidth: mainState.strokeWidth,
                            strokeStyle: mainState.strokeColor,
                            fillStyle: mainState.fillColor,
                        }
                    })
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
                            id: getRandomID(),
                            points: [
                                {
                                    x: (event.pageX - rect.left - current.line.x) / 2,
                                    y: (event.pageY - rect.top - current.line.y) / 2
                                },
                                {
                                    x: event.pageX - rect.left - current.line.x,
                                    y: event.pageY - rect.top - current.line.y,
                                }],
                        }
                    })
                    break;
                case "pencil":
                    setCurrent({
                        ...current,
                        pencil: {
                            ...current.pencil,
                            id: getRandomID(),
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
                            id: getRandomID(),
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
                            id: getRandomID(),
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
                            id: getRandomID(),
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
                            id: getRandomID(),
                            points: [
                                {
                                    x: (event.pageX - rect.left - current.arrow.x) / 2,
                                    y: (event.pageY - rect.top - current.arrow.y) / 2
                                },
                                {
                                    x: event.pageX - rect.left - current.arrow.x,
                                    y: event.pageY - rect.top - current.arrow.y,
                                }
                            ],
                        }
                    })
                    break;
                case "image":
                    if (mainState.imageBlob) {
                        setCurrent({
                            ...current,
                            image: {
                                ...current.image,
                                id: getRandomID(),
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
        if (mainState.tool !== "select") {
            let rect = document.getElementById("canvas")!.getBoundingClientRect();
            updateState(event, rect, state.drawInProcess)
            setState({
                ...state,
                drawInProcess: true, startRectX: event.pageX - rect.left,
                startRectY: event.pageY - rect.top
            });
        } else if (selectedItem !== null) {
            let px = event.pageX as number
            let py = event.pageY as number
            const resizeDir = isWithinResizeArea(px, py, selectedItem)
            if (resizeDir) {
                setState({
                    ...state, startRectX: px,
                    startRectY: py,
                    resizeDir: resizeDir
                })
            } else if (isWithinItem(px, py, selectedItem)) {
                setState({
                    ...state, moveStart: true, startRectX: px,
                    startRectY: py
                })
            }
        }
    }

    useEffect(() => {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = c!.getContext("2d")!;
        ctx.canvas.width = window.devicePixelRatio * window.innerWidth
        ctx.canvas.height = window.devicePixelRatio * window.innerHeight
        setItems(JSON.parse(localStorage.getItem("canvasItems") || "[]"))
    }, [])

    function handleMouseMove(event: any) {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let rect = c.getBoundingClientRect();
        if (state.drawInProcess) {
            updateState(event, rect, true)
            setState({ ...state, drew: true })
        } else if (state.moveStart && selectedItem) {
            let px = event.pageX as number
            let py = event.pageY as number
            setState({ ...state, startRectX: px, startRectY: py })
            const updatedItems = moveItem(px - state.startRectX, py - state.startRectY, selectedItem, items)
            if (updatedItems) {
                setItems([...updatedItems])

            }
        } else if (state.resizeDir && selectedItem) {
            let px = event.pageX as number
            let py = event.pageY as number
            setState({ ...state, startRectX: px, startRectY: py })
            const updatedItems = resizeSelected(state.resizeDir, px - state.startRectX, py - state.startRectY, selectedItem, items)
            setItems(updatedItems)
        }
    }
    useEffect(() => {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = c.getContext('2d')!;
        ctx.clearRect(0, 0, window.devicePixelRatio * window.innerWidth, window.devicePixelRatio * window.innerHeight)
        if (items.length > 0) {
            renderElements(ctx, items)
            localStorage.setItem("canvasItems", JSON.stringify(items))
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
        } else if (mainState.tool === "text") {
            renderCurrentDrawing(ctx, current.text)
        }

        if (selectedItem) {
            const bounds = getBoundingBox(selectedItem)
            if (bounds) {
                renderBounds(ctx, bounds)
            }
        }
    }, [items, current, selectedItem])


    function handleMouseUp(event: any) {
        let itemID = ""
        if (current) {
            if (mainState.tool === "pencil") {
                setItems([...items, current.pencil])
                itemID = current.pencil.id
            } else if (mainState.tool === "line") {
                itemID = current.line.id
                if (current.line.id !== "") {
                    setItems([...items, current.line])
                }
            } else if (mainState.tool === "rectangle") {
                setItems([...items, current.rectangle])
                itemID = current.rectangle.id
            } else if (mainState.tool === "diamond") {
                setItems([...items, current.diamond])
                itemID = current.diamond.id
            } else if (mainState.tool === "ellipse") {
                itemID = current.ellipse.id
                setItems([...items, current.ellipse])
            } else if (mainState.tool === "arrow") {
                itemID = current.arrow.id
                setItems([...items, current.arrow])
            }
            if (mainState.tool !== "text") {
                setCurrent(intialStates)
            }
        }
        if (state.drew && mainState.tool !== "select") {
            updateMainState({ ...mainState, tool: "select", selectedItemID: itemID })
        }
        setState({ ...state, drawInProcess: false, moveStart: false, drew: false, resizeDir: "" })
    }

    function handleClick(event: any) {
        let c = document.getElementById("canvas") as HTMLCanvasElement
        let ctx = c.getContext('2d')!;
        updateMainState({ ...mainState, selectedItemID: getItemEnclosingPoint(event.pageX, event.pageY, items) })
    }

    // function handleText(event: React.KeyboardEvent<HTMLCanvasElement>) {
    //     if (mainState.tool === "text") {
    //         if (event.key === "Shift"
    //             || event.key === "Control"
    //             || event.key === "CapsLock"
    //             || event.key === "Alt"
    //             || event.key === "Escape"
    //             || event.key === "ArrowLeft"
    //             || event.key === "ArrowRight"
    //             || event.key === "ArrowUp"
    //             || event.key === "ArrowDown") return;
    //         let text = current.text.text
    //         if (event.key === "Backspace") {
    //             text = text.substring(0, text.length - 1)
    //         } else if (event.key === "Enter") {
    //             text += "\n"
    //         } else {
    //             text += event.key
    //         }
    //         setCurrent({
    //             ...current,
    //             text: {
    //                 ...current.text,
    //                 text
    //             }
    //         })
    //     }
    // }

    return (
        <main className="relative">
            {mainState.tool === "text" ? <div
                className="absolute outline-0"
                onBlur={(e) => {
                    const target = e.target as HTMLInputElement
                    let c = document.getElementById("canvas") as HTMLCanvasElement
                    let ctx = c.getContext('2d')!;
                    ctx.save()
                    ctx.font = `bold ${current.text.fontSize}px ${current.text.fontFamily}`
                    const itemID = getRandomID()
                    const textLines = target.innerText.split("\n")
                    let max = ""
                    for (let line of textLines) {
                        if (line.length > max.length) {
                            max = line
                        }
                    }
                    const textItem: Text = {
                        ...current.text,
                        id: itemID,
                        text: target.innerText,
                        width: ctx.measureText(max).width,
                        height: textLines.length * current.text.fontSize
                    }
                    ctx.restore()
                    setCurrent(prevState => ({
                        ...prevState,
                        text: textItem
                    }))
                    setItems([...items, textItem])
                    setCurrent(intialStates)
                    updateMainState({ ...mainState, tool: "select", selectedItemID: itemID })
                }}
                tabIndex={0}
                style={{
                    top: current.text.y + 3 - current.text.fontSize / 2,
                    left: current.text.x,
                    fontFamily: current.text.fontFamily,
                    fontSize: current.text.fontSize,
                    color: current.text.strokeStyle,
                    fontWeight: "bold",
                }}
                contentEditable
            >Write Text</div>
                : null
            }
            <canvas
                className="appearance-none outline-0"
                id="canvas"
                tabIndex={0}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={handleClick}
            >
            </canvas>
        </main>

    )
}