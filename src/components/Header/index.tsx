import { HeaderContainer } from "./styles"
import LogoIgnite from '../../assets/ignite-logo.svg'
import {NavLink} from 'react-router-dom'
import { Timer, Scroll } from "@phosphor-icons/react"

export const Header = () => {
  return (
    <HeaderContainer>
     
       <img src={LogoIgnite}/>

      <nav>
        <NavLink to='/' title='Timer'>
          <Timer size={24} />
        </NavLink>
        <NavLink to='/history' title='Histórico'>
          <Scroll size={24} />
        </NavLink>
        
      </nav>
    </HeaderContainer>
  )
}