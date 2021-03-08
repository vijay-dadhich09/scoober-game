export const pickNumber = (num: number) => {
	const mod = num % 3;
	if (mod === 0) {
		return 0;
	} else if (mod === 1) {
		return -1;
	} else {
		return 1;
	}
}

