import React, { useState } from "react"
import { InstructionModel, MethodFlow } from "../flow/MethodFlow"
import { NavigationContainer } from "../navigation/NavigationContainer"
import { MultiDrawer, useDrawerState } from "../../components/drawer/MultiDrawer"
import { MethodDetail } from "../../components/details/MethodDetail"
import { InstructionDetail } from "../../components/details/InstructionDetail"
import { InstructionList } from "../../components/instruction-list/InstructionList"

export const TITLE = "Java Tracer"

export function App(): React.ReactElement {
    // const [selectedClassId, setSelectedClassId] = useState<string | null>(null)
    // const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null)
    const { state, open, next, close, previous } = useDrawerState()
    const [instructions, setInstructions] = useState<InstructionModel[]>([])
    const [selectedInstruction, setSelectedInstruction] = useState<InstructionModel | null>(null)

    return (
        <div className="fixed inset-0 grid grid-rows-[auto_auto_minmax(0,1fr)] grid-cols-12 text-slate-600">
            <NavigationContainer title={TITLE} />
            <div className="col-span-full bg-zinc-100 border-b-2 border-zinc-200 shadow-inner">
                <MethodDetail />
            </div>
            <div className="col-span-full">
                <MultiDrawer
                    first={
                        <InstructionList
                            instructions={instructions}
                            onClick={(i) => {
                                next()
                                setSelectedInstruction(i)
                            }}
                            onClose={close}
                        />
                    }
                    second={
                        <InstructionDetail instruction={selectedInstruction} onGoBack={previous} />
                    }
                    state={state}
                >
                    <MethodFlow
                        id="40690bbded1d2f0b245d-103175"
                        selectedInstruction={selectedInstruction?.id}
                        onInstructionSelect={(instructions) => {
                            open()
                            setInstructions(instructions)
                        }}
                    />
                </MultiDrawer>
            </div>
        </div>
    )
}
