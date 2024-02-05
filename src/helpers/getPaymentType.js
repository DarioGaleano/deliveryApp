export default function getPaymentType(statusText) {
	switch (statusText) {
		case 'bss':
			return {
				text: 'PAGO MOVIL',
				color: '#000',
			};

		case 'tokens':
			return {
				text: 'CREDITOS',
				color: '#000',
			};

		case 'mixed':
			return {
				text: 'MIXTO',
				color: '#000',
			};

		default:
			return null;
	}
}
