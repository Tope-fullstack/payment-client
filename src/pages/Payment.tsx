import PaymentForm from '@/components/forms/PaymentForm'
function Payment(){
	return(
		<>
			<div className='mt-8 p-8 w-[400px] shadow-xl rounded form z-10'>
				<h4 className='uppercase text-center mb-2 text-[#fff38e] text-lg'>Payment Form</h4>
				<PaymentForm/>
			</div>
		</>
	)
}
export default Payment;