import { HandPalm, Play } from '@phosphor-icons/react'
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles'

//  form & validation
import { FormProvider, useForm } from 'react-hook-form'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../contexts/CyclesContext'
import { useContext } from 'react'

// interfaces 
interface NewCycleFormData {
  task: string,
  minutesAmount: number,
}

// validation schema
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'Valor mínimo de 5 minutos').max(60, 'Valor máximo de 60 minutos')
})

export const Home = () => {  
  const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)
  
  // form & validation
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle (data: NewCycleFormData ) {
    createNewCycle(data)
    reset()
  }
 
  // disable button
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        {activeCycle ? <StopCountdownButton onClick={interruptCurrentCycle}>
          <HandPalm size={24} /> Interromper
        </StopCountdownButton> : <StartCountdownButton
          disabled={isSubmitDisabled}
          type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>}
      </form>
    </HomeContainer>
  )
}
