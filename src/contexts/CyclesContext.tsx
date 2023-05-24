import { ReactNode, createContext, useState } from "react";

// interfaces
interface CreateCycleData {
  task: string,
  minutesAmount: number
}

interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}



export const CyclesContext = createContext({} as CyclesContextType)

interface  CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider( { children }: CyclesContextProviderProps) {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)


  const activeCycle = cycles.find((cycle) => {
    return cycle.id === activeCycleId
  })

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    setCycles(previousState =>
      previousState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }

  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: crypto.randomUUID(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    setCycles((previousState) => [...previousState, newCycle])
    setActiveCycleId(newCycle.id)
    setAmountSecondsPassed(0)
    
  }

  function interruptCurrentCycle() {
    setActiveCycleId(null)
    setCycles(previousState =>
      previousState.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      })
    )
  }
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle
      }}>

      {children}
    </CyclesContext.Provider>
  )
}