import { Routes, Route } from 'react-router-dom'
import Payment from '@/pages/Payment'
import Callback from '@/pages/Callback'
import Transactions from '@/pages/Transactions'
import Navbar from '@/components/shared/Navbar'
function App() {
  return (
    <div className="bg flex justify-center items-center">
      <Navbar />
      <Routes>
        <Route path='/' element={<Payment />} />
        <Route path="/callback-url" element={<Callback />} />
        <Route path='/transactions' element={<Transactions />} />
      </Routes>
    </div>
  )
}

export default App
