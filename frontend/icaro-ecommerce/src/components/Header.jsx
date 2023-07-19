const Header = () => {
    return(
        <>
            <header> 
                <div className="contenedor">
                    <div className="img1">
                        <a href="/"><img className="img1" src="/imgs/logo.png" alt="logo"/></a>
                    </div>
        
                    <div className="index-botones">
                        <a className="index-botones"href="/login"><p>Login</p></a>
                        <a className="index-botones"href="/register"><p>Register</p></a>
                    </div>
                    
                    <div className="div1"></div>
        
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
