export default function getStatus(statusText) {
	switch (statusText) {
		case 'pending':
			return {
				text: 'PENDIENTE POR VERIFICAR EL PAGO',
				color: '#000',
			};
		case 'approved':
			return {
				text: 'PAGO ACEPTADO',
				color: '#000',
			};
		case 'rejected':
			return {
				text: 'PAGO RECHAZADO',
				color: '#000',
			};

		case 'preparing_order':
			return {
				text: 'ORDEN EN PROCESO',
				color: '#000',
			};

		case 'assigned_delivery_user':
			return {
				text: 'REPARTIDOR ASIGNADO',
				color: '#000',
			};

		case 'delivery_on_the_way':
			return {
				text: 'ORDEN EN CAMINO',
				color: '#000',
			};

		case 'delivery_completed':
			return {
				text: 'ORDEN COMPLETADA',
				color: '#000',
			};

		default:
			return null;
	}
}
