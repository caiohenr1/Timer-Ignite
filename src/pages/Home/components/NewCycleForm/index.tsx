import { FormContainer, MinutesAmountInput, TaskInput } from "./styles"
import {  useForm, useFormContext } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from "react"
import { CyclesContext } from "../.."

export const NewCycleForm = (  ) => {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

 
  return (
    <FormContainer>
    <label htmlFor="task">Vou trabalhar em</label>
    <TaskInput
      id="task"
      placeholder='Dê um nome para seu projeto'
      disabled={!!activeCycle}
      {...register('task')}
    />

    <label htmlFor="minutesAmount">durante</label>
    <MinutesAmountInput
      type="number"
      id="minutesAmount"
      placeholder='00'
      step={5}
      disabled={!!activeCycle}
      {...register('minutesAmount', { valueAsNumber: true })}
    />
    <span>minutos</span>
  </FormContainer>
  )
}