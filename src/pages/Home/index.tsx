import { Play } from '@phosphor-icons/react'
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'

//  form & validation
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'


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

export const Home  = () => {

  // form & validation
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
     task: '',
     minutesAmount: 0    
    }
  })




  function handleCreateNewCycle (data: NewCycleFormData) {
    console.log(data);
    reset()
 }

  // disable button
  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder='Dê um nome para seu projeto' 
            {...register('task')} />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput 
            type="number" 
            id="minutesAmount" 
            placeholder='00' 
            step={5} 
            {...register('minutesAmount' , { valueAsNumber: true})}
          />
          <span>minutos</span>
        </FormContainer>

          <CountdownContainer>
            <span>0</span>
            <span>0</span>
            <Separator>
              :
            </Separator>
            
            <span>0</span>
            <span>0</span>
          </CountdownContainer>
          <StartCountdownButton disabled={isSubmitDisabled}  type="submit">
              <Play size={24}/>
            Começar</StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
