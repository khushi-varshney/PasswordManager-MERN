import Footer from "../components/Footer";
import Navbar from '../components/Navbar'
import Manager from '../components/Manager'

const Home = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Manager />
      <Footer />
    </div>
  )
}

export default Home
