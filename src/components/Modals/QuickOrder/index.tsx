export const QuickOrderComponent = () => {
	return <>
		<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
			<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
				<h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">ШВИДКЕ ЗАМОВЛЕННЯ</h3>
				<div className="mt-3">
					<p className="text-sm text-gray-500">Економте Ваш час, просто залиште телефон і менеджер з Вами зв'яжеться для
						уточнення всіх деталей</p>
					<p className='font-bold text-sm mt-3'>Номер телефона</p>
					<div className="relative mt-3 h-11 w-full min-w-[200px]">
						<input
							value=''
							//onChange={e => setLogin(e.target.value)}
							className="peer h-full w-full rounded-md border border-blue-gray-200 bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
							placeholder=' '
						/>
						<label
							className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
							Phone
						</label>
					</div>
				</div>
			</div>
		</div>
		<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
			<button type="button" className='btn primary w-max px-5'>
				Отправить
			</button>
		</div>
	</>
}
