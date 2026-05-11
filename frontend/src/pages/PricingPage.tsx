import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

export default function PricingPage() {
    return (
        <div className="min-h-screen w-full" style={{background: '#F8FAFC'}}>
            <Navbar/>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4" style={{color: '#023047'}}>Pricing</h1>
                    <p className="text-lg text-gray-600">Pricing plans coming soon!</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


