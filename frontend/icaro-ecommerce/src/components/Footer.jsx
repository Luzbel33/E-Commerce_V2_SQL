import { NavLink } from "react-router-dom"

const Footer = () => {
    
    return (
        <>
            <footer>
                <div className ="foot">
                    <div className ="foot-img">
                        <NavLink to="/"><img className ="foot-img" src="/imgs/logo.png" alt="logo" /></NavLink>
                    </div>  
        
                    <div className ="foot2">
                        <h1 className ="foot-titles">Redes</h1>
                        <ul className ="social">
                            <li className ="social"><a href="instagram.com"><i className ="fa fa-instagram" aria-hidden="true"></i></a></li>
                            <li className ="social"><a href="facebook.com"><i className ="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li className ="social"><a href="twitter.com"><i className ="fa fa-twitter" aria-hidden="true"></i></a></li>
                            </ul>
                    </div>
        
                    <div className ="foot3">
                        <h1 className ="foot-titles">Politicas y Privacidad</h1>
                        <ul className ="foot-desc">
                            <li className ="foot3">Lorem ipsum dolor sit.</li>
                            <li className ="foot3">Lorem ipsum dolor sit.</li>
                            <li className ="foot3">Lorem ipsum dolor sit.</li>
                            <li className ="foot3">Lorem ipsum dolor sit.</li>
                        </ul>
                    </div>
        
                    <div className ="foot4">
                        <h1 className ="foot-titles">Soporte</h1>
                        <ul className ="foot-desc2">
                            <li className ="foot4">Lorem ipsum dolor sit.</li>
                            <li className ="foot4">Lorem ipsum dolor sit.</li>
                            <li className ="foot4">Lorem ipsum dolor sit.</li>
                            <li className ="foot4">Lorem ipsum dolor sit.</li>
                        </ul>
                    </div>
                    <div className ="foot5">
                        <NavLink to="/" ><img className ="foot-img2" src="/imgs/logo.png" alt="logo" /></NavLink>
                        <p className ="copyright">Copyrights 2023</p>
                    </div>
                </div>
            </footer>
        
        </>
    )
}

export default Footer
