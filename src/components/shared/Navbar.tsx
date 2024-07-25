import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
	const location = useLocation();
  
	return (
		<>
			<motion.header
				initial="hidden"
				whileInView="show"
				className="fixed top-0 w-full py-2 shadow-lg">
				<div className='flex justify-between items-center px-8 py-3'>
					<Link to='/' className='relative flex justify-center items-center gap-2'>
						<p className='font-semibold text-lg uppercase text-white'>Aluko's Payment</p>
					</Link>
					<div >
						<ul className='flex gap-4 text-white'>
							<li>
								<Link 
									to='/' 
									className={`${location.pathname === '/' ? 'text-[#fff38e]' : ''} hover:text-[#fff38e]`}
								>
									Payment
								</Link>
							</li>
							<li>
								<Link 
									to='/transactions' 
									className={`${location.pathname === '/transactions' ? 'text-[#fff38e]' : ''} hover:text-[#fff38e]`}
								>
									Transactions
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</motion.header>
		</>
	)
}
