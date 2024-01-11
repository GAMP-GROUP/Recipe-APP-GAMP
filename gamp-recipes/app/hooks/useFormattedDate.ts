
export function useFormattedDate(date: Date){
	const timestampObj: Date = new Date(date);
	const formattedDate: string = timestampObj.toLocaleDateString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});


	return formattedDate;
}
