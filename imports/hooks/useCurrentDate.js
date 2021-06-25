export function useCurrentDate() {
	let currentDate = new Date();
	const tempCurrentDate = currentDate.getTime();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = currentDate.getFullYear();
	const hour = currentDate.getHours();
	const minute = String(currentDate.getMinutes()).padStart(2, '0');

	return { tempCurrentDate, day, month, year, hour, minute }
}