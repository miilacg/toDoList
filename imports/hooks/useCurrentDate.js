export function useCurrentDate(currentDate) {

	if(currentDate) {
		currentDate = new Date(currentDate);
	} else {
		currentDate = new Date();
	}

	const tempDate = currentDate.getTime();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = currentDate.getFullYear();
	const hour = currentDate.getHours();
	const minute = String(currentDate.getMinutes()).padStart(2, '0');

	return { tempDate, day, month, year, hour, minute }
}