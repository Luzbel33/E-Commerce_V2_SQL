import Header from './header'
import Footer from './Footer'
import Product from './Product'
import Banner from './Banner'

const Home = () => {
    return (
        <>
            <Header />
            <main>
                <Banner />

                <section className="homeIndex">

                    <Product />

                </section>

            </main>
            <Footer />
        </>
    )
}

export default Home