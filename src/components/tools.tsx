import { useAtom, useSetAtom } from "jotai"
import { ReactNode, useEffect, useState } from "react"
import { appState } from "../jotai"
import type { Tool } from "../types"


export default function Tools() {
    const [app, setState] = useAtom(appState)
    const tool = app.tool


    function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {

        const fs = e.currentTarget.files
        if (fs) {
            const extInd = fs[0].name.lastIndexOf(".")
            const ext = fs[0].name.substring(extInd)
            if (![".jpeg", ".jpg", ".png"].includes(ext)) {
                return
            }
            const reader = new FileReader()
            reader.readAsDataURL(fs[0])
            reader.onload = () => {
                setState({ ...app, imageBlob: reader.result as string })
                e.target.value = ""
            }
        }
    }


    return (
        <div className="bg-white rounded shadow m-3 p-3">
            <div className="flex flex-wrap gap-3">

                <CanvasTool onClick={() => setState({ ...app, tool: "select" })} tool="select" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 22 22" className="block" strokeWidth="1.25"><g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z"></path><path d="M13.5 13.5l4.5 4.5"></path></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "rectangle" })} tool="rectangle" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className="" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "diamond" })} tool="diamond" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className="" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z"></path></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "ellipse" })} tool="ellipse" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className="" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle></g></svg>                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "arrow" })} tool="arrow" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className="" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="5" y1="12" x2="19" y2="12"></line><line x1="15" y1="16" x2="19" y2="12"></line><line x1="15" y1="8" x2="19" y2="12"></line></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "line" })} tool="line" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" className="" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><path d="M4.167 10h11.666" strokeWidth="1.5"></path></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "pencil" })} tool="pencil" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.25"><path clipRule="evenodd" d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"></path><path d="m11.25 5.417 3.333 3.333"></path></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "text" })} tool="text" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className="" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="4" y1="20" x2="7" y2="20"></line><line x1="14" y1="20" x2="21" y2="20"></line><line x1="6.9" y1="15" x2="13.8" y2="15"></line><line x1="10.2" y1="6.3" x2="16" y2="20"></line><polyline points="5 20 11 4 13 4 20 20"></polyline></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "image" })} tool="image" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }} className="relative">
                        <input type="file" className="absolute h-[22px] w-[22px] top-0 left-0 opacity-0" onChange={handleFileInput} />
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" className="" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.25"><path d="M12.5 6.667h.01"></path><path d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z"></path><path d="m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166"></path><path d="m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667"></path></g></svg>
                    </div>
                </CanvasTool>

                <CanvasTool onClick={() => setState({ ...app, tool: "eraser" })} tool="eraser" selectedTool={tool}>
                    <div style={{ width: "22px", height: "22px" }}>
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" className="" fill="none" strokeWidth="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><g strokeWidth="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3"></path><path d="M18 13.3l-6.3 -6.3"></path></g></svg>
                    </div>
                </CanvasTool>
            </div>
        </div >
    )
}


export function CanvasTool({ onClick, tool, selectedTool, children }: { onClick: () => void, tool: Tool, selectedTool: Tool, children: ReactNode }) {
    return (
        <button className="w-fit p-2 rounded hover:bg-[#faecd2]"
            onClick={onClick}
            style={{
                backgroundColor: selectedTool === tool ? "#faecd2" : "",
                border: `1px solid ${selectedTool === tool ? "#faecd2" : "var(--accents-2)"}`,
                fill: selectedTool === tool ? "darkorange" : "none",
                color: selectedTool === tool ? "darkorange" : ""
            }}
        >
            {children}
        </button>
    )
}