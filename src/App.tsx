import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ClassPage } from "./pages/ClassPage"
import { MethodPage } from "./pages/MethodPage"

export function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="method/:methodId/*" element={<MethodPage />} />
                <Route path="class/:classId/*" element={<ClassPage />} />
            </Routes>
        </BrowserRouter>
    )
}
