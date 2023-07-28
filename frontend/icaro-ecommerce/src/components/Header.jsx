import Filter from './Filter'
import { NavLink } from 'react-router-dom'
// import { useUserStore } from '../stores/store'

const Header = ({ onSearchChange }) => {
    // const user = useUserStore((state)=>state.user)
    return(
        <>
            <header> 
                <div className="contenedor">
                    <div className="img1">
                        <NavLink to="/"><img className="img1" src="/imgs/logo.png" alt="logo"/></NavLink>
                    </div>
        
                    <div className="index-botones">
                        {/* <span>{user}</span> */}
                        <NavLink to="/login"  className="index-botones"><p>Login</p></NavLink>
                        <NavLink to="/register"  className="index-botones"><p>Register</p></NavLink>
                    </div>
                    
                    <Filter onSearchChange={onSearchChange} />

        
                    <div className="div2">
                        <div className="div3"> </div>
                        <div className="div3"> </div>
                        <div className="div3"> </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header
