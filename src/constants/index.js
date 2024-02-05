const base = 'https://delivery-api-udo-22bd453b4c11.herokuapp.com/api/v1';

const country_codes = [
	{
		index: 0,
		name: 'Afganistán',
		value: '+93',
	},
	{
		index: 1,
		name: 'Albania',
		value: '+355',
	},
	{
		index: 2,
		name: 'Alemania',
		value: '+49',
	},
	{
		index: 3,
		name: 'Andorra',
		value: '+376',
	},
	{
		index: 4,
		name: 'Angola',
		value: '+244',
	},
	{
		index: 5,
		name: 'Anguila',
		value: '+1 (264)',
	},
	{
		index: 6,
		name: 'Antigua y Barbuda',
		value: '+1 (268)',
	},
	{
		index: 7,
		name: 'Antillas Neerlandesas',
		value: '+599',
	},
	{
		index: 8,
		name: 'Argelia',
		value: '+213',
	},
	{
		index: 9,
		name: 'Argentina',
		value: '+54',
	},
	{
		index: 10,
		name: 'Armenia',
		value: '+374',
	},
	{
		index: 11,
		name: 'Aruba',
		value: '+297',
	},
	{
		index: 12,
		name: 'Ascención',
		value: '+247',
	},
	{
		index: 13,
		name: 'Australia',
		value: '+61',
	},
	{
		index: 14,
		name: 'Austria',
		value: '+43',
	},
	{
		index: 15,
		name: 'Azerbaiyán',
		value: '+994',
	},
	{
		index: 16,
		name: 'Bahamas',
		value: '+1 (242)',
	},
	{
		index: 17,
		name: 'Bahrein',
		value: '+973',
	},
	{
		index: 18,
		name: 'Bangladesh',
		value: '+880',
	},
	{
		index: 19,
		name: 'Barbados',
		value: '+1 (246)',
	},
	{
		index: 20,
		name: 'Bélgica',
		value: '+32',
	},
	{
		index: 21,
		name: 'Belice',
		value: '+501',
	},
	{
		index: 22,
		name: 'Benín',
		value: '+229',
	},
	{
		index: 23,
		name: 'Bermudas',
		value: '+1 (441)',
	},
	{
		index: 24,
		name: 'Bielorrusia',
		value: '+375',
	},
	{
		index: 25,
		name: 'Birmania (Myanmar)',
		value: '+95',
	},
	{
		index: 26,
		name: 'Bolivia',
		value: '+591',
	},
	{
		index: 27,
		name: 'Bosnia y Herzegovina',
		value: '+387',
	},
	{
		index: 28,
		name: 'Botsuana',
		value: '+267',
	},
	{
		index: 29,
		name: 'Brasil',
		value: '+55',
	},
	{
		index: 30,
		name: 'Brunei',
		value: '+673',
	},
	{
		index: 31,
		name: 'Bulgaria',
		value: '+359',
	},
	{
		index: 32,
		name: 'Burkina Faso',
		value: '+226',
	},
	{
		index: 33,
		name: 'Burundi',
		value: '+257',
	},
	{
		index: 34,
		name: 'Bután',
		value: '+975',
	},
	{
		index: 35,
		name: 'Cabo Verde',
		value: '+238',
	},
	{
		index: 36,
		name: 'Camboya',
		value: '+855',
	},
	{
		index: 37,
		name: 'Camerún',
		value: '+237',
	},
	{
		index: 38,
		name: 'Canadá',
		value: '+1',
	},
	{
		index: 39,
		name: 'Chad',
		value: '+235',
	},
	{
		index: 40,
		name: 'Chile',
		value: '+56',
	},
	{
		index: 41,
		name: 'China',
		value: '+86',
	},
	{
		index: 42,
		name: 'Chipre',
		value: '+357',
	},
	{
		index: 43,
		name: 'Colombia',
		value: '+57',
	},
	{
		index: 44,
		name: 'Comoras',
		value: '+269',
	},
	{
		index: 45,
		name: 'Congo, República del',
		value: '+242',
	},
	{
		index: 46,
		name: 'Congo, República Democrática del',
		value: '+243',
	},
	{
		index: 47,
		name: 'Corea del Norte',
		value: '+850',
	},
	{
		index: 48,
		name: 'Corea del Sur',
		value: '+82',
	},
	{
		index: 49,
		name: 'Costa de Marfil',
		value: '+225',
	},
	{
		index: 50,
		name: 'Costa Rica',
		value: '+506',
	},
	{
		index: 51,
		name: 'Croacia',
		value: '+385',
	},
	{
		index: 52,
		name: 'Cuba',
		value: '+53',
	},
	{
		index: 53,
		name: 'Departamentos y territorios franceses en el Océano Índico',
		value: '+262',
	},
	{
		index: 54,
		name: 'Diego García',
		value: '+246',
	},
	{
		index: 55,
		name: 'Dinamarca',
		value: '+45',
	},
	{
		index: 56,
		name: 'Dominica',
		value: '+1 (767)',
	},
	{
		index: 57,
		name: 'Ecuador',
		value: '+593',
	},
	{
		index: 58,
		name: 'Egipto',
		value: '+20',
	},
	{
		index: 59,
		name: 'El Salvador',
		value: '+503',
	},
	{
		index: 60,
		name: 'Emiratos Árabes Unidos',
		value: '+971',
	},
	{
		index: 61,
		name: 'Eritrea',
		value: '+291',
	},
	{
		index: 62,
		name: 'Eslovaquia',
		value: '+421',
	},
	{
		index: 63,
		name: 'Eslovenia',
		value: '+386',
	},
	{
		index: 64,
		name: 'España',
		value: '+34',
	},
	{
		index: 65,
		name: 'Estados Unidos',
		value: '+1',
	},
	{
		index: 66,
		name: 'Estonia',
		value: '+372',
	},
	{
		index: 67,
		name: 'Etiopía',
		value: '+251',
	},
	{
		index: 68,
		name: 'Filipinas',
		value: '+63',
	},
	{
		index: 69,
		name: 'Finlandia',
		value: '+358',
	},
	{
		index: 70,
		name: 'Fiyi',
		value: '+679',
	},
	{
		index: 71,
		name: 'Francia',
		value: '+33',
	},
	{
		index: 72,
		name: 'Gabón',
		value: '+241',
	},
	{
		index: 73,
		name: 'Gambia',
		value: '+220',
	},
	{
		index: 74,
		name: 'Georgia',
		value: '+995',
	},
	{
		index: 75,
		name: 'Ghana',
		value: '+233',
	},
	{
		index: 76,
		name: 'Gibraltar',
		value: '+350',
	},
	{
		index: 77,
		name: 'Granada',
		value: '+1 (473)',
	},
	{
		index: 78,
		name: 'Grecia',
		value: '+30',
	},
	{
		index: 79,
		name: 'Groenlandia',
		value: '+299',
	},
	{
		index: 80,
		name: 'Guadalupe',
		value: '+590',
	},
	{
		index: 81,
		name: 'Guam',
		value: '+1 (671)',
	},
	{
		index: 82,
		name: 'Guatemala',
		value: '+502',
	},
	{
		index: 83,
		name: 'Guayana Francesa',
		value: '+594',
	},
	{
		index: 84,
		name: 'Guinea',
		value: '+224',
	},
	{
		index: 85,
		name: 'Guinea Ecuatorial',
		value: '+240',
	},
	{
		index: 86,
		name: 'Guinea-Bissau',
		value: '+245',
	},
	{
		index: 87,
		name: 'Guyana',
		value: '+592',
	},
	{
		index: 88,
		name: 'Haití',
		value: '+509',
	},
	{
		index: 89,
		name: 'Honduras',
		value: '+504',
	},
	{
		index: 90,
		name: 'Hong Kong',
		value: '+852',
	},
	{
		index: 91,
		name: 'Hungría',
		value: '+36',
	},
	{
		index: 92,
		name: 'India',
		value: '+91',
	},
	{
		index: 93,
		name: 'Indonesia',
		value: '+62',
	},
	{
		index: 94,
		name: 'Irak',
		value: '+964',
	},
	{
		index: 95,
		name: 'Irán',
		value: '+98',
	},
	{
		index: 96,
		name: 'Irlanda',
		value: '+353',
	},
	{
		index: 97,
		name: 'Islandia',
		value: '+354',
	},
	{
		index: 98,
		name: 'Islas Caimán',
		value: '+1 (345)',
	},
	{
		index: 99,
		name: 'Islas Cook',
		value: '+682',
	},
	{
		index: 100,
		name: 'Islas Feroe',
		value: '+298',
	},
	{
		index: 101,
		name: 'Islas Malvinas (Falkland Islands)',
		value: '+500',
	},
	{
		index: 102,
		name: 'Islas Marshall',
		value: '+692',
	},
	{
		index: 103,
		name: 'Islas Salomón',
		value: '+677',
	},
	{
		index: 104,
		name: 'Islas Turcas y Caicos',
		value: '+1 (649)',
	},
	{
		index: 105,
		name: 'Islas Vírgenes',
		value: '+1 (340)',
	},
	{
		index: 106,
		name: 'Islas Vírgenes Británicas',
		value: '+1 (284)',
	},
	{
		index: 107,
		name: 'Israel',
		value: '+972',
	},
	{
		index: 108,
		name: 'Italia',
		value: '+39',
	},
	{
		index: 109,
		name: 'Jamaica',
		value: '+1 (876)',
	},
	{
		index: 110,
		name: 'Japón',
		value: '+81',
	},
	{
		index: 111,
		name: 'Jordania',
		value: '+962',
	},
	{
		index: 112,
		name: 'Kazajstán',
		value: '+7',
	},
	{
		index: 113,
		name: 'Kenia',
		value: '+254',
	},
	{
		index: 114,
		name: 'Kirguistán',
		value: '+996',
	},
	{
		index: 115,
		name: 'Kiribati',
		value: '+686',
	},
	{
		index: 116,
		name: 'Kuwait',
		value: '+965',
	},
	{
		index: 117,
		name: 'Laos',
		value: '+856',
	},
	{
		index: 118,
		name: 'Lesotho',
		value: '+266',
	},
	{
		index: 119,
		name: 'Letonia',
		value: '+371',
	},
	{
		index: 120,
		name: 'Líbano',
		value: '+961',
	},
	{
		index: 121,
		name: 'Liberia',
		value: '+231',
	},
	{
		index: 122,
		name: 'Libia',
		value: '+218',
	},
	{
		index: 123,
		name: 'Liechtenstein',
		value: '+423',
	},
	{
		index: 124,
		name: 'Lituania',
		value: '+370',
	},
	{
		index: 125,
		name: 'Luxemburgo',
		value: '+352',
	},
	{
		index: 126,
		name: 'Macao',
		value: '+853',
	},
	{
		index: 127,
		name: 'Macedonia',
		value: '+389',
	},
	{
		index: 128,
		name: 'Madagascar',
		value: '+261',
	},
	{
		index: 129,
		name: 'Malasia',
		value: '+60',
	},
	{
		index: 130,
		name: 'Malawi',
		value: '+265',
	},
	{
		index: 131,
		name: 'Maldivas',
		value: '+960',
	},
	{
		index: 132,
		name: 'Malí',
		value: '+223',
	},
	{
		index: 133,
		name: 'Malta',
		value: '+356',
	},
	{
		index: 134,
		name: 'Marruecos',
		value: '+212',
	},
	{
		index: 135,
		name: 'Martinica',
		value: '+596',
	},
	{
		index: 136,
		name: 'Mauricio',
		value: '+230',
	},
	{
		index: 137,
		name: 'Mauritania',
		value: '+222',
	},
	{
		index: 138,
		name: 'Mayotte',
		value: '269',
	},
	{
		index: 139,
		name: 'México',
		value: '+52',
	},
	{
		index: 140,
		name: 'Micronesia, Estados Federados de',
		value: '+691',
	},
	{
		index: 141,
		name: 'Moldavia',
		value: '+373',
	},
	{
		index: 142,
		name: 'Mónaco',
		value: '+377',
	},
	{
		index: 143,
		name: 'Mongolia',
		value: '+976',
	},
	{
		index: 144,
		name: 'Montenegro',
		value: '+382',
	},
	{
		index: 145,
		name: 'Montserrat',
		value: '+1 (664)',
	},
	{
		index: 146,
		name: 'Mozambique',
		value: '+258',
	},
	{
		index: 147,
		name: 'Namibia',
		value: '+264',
	},
	{
		index: 148,
		name: 'Nauru',
		value: '+674',
	},
	{
		index: 149,
		name: 'Nepal',
		value: '+977',
	},
	{
		index: 150,
		name: 'Nicaragua',
		value: '+505',
	},
	{
		index: 151,
		name: 'Níger',
		value: '+227',
	},
	{
		index: 152,
		name: 'Nigeria',
		value: '+234',
	},
	{
		index: 153,
		name: 'Niue',
		value: '+683',
	},
	{
		index: 154,
		name: 'Noruega',
		value: '47',
	},
	{
		index: 155,
		name: 'Nueva Caledonia',
		value: '+687',
	},
	{
		index: 156,
		name: 'Nueva Zelanda',
		value: '+64',
	},
	{
		index: 157,
		name: 'Omán',
		value: '968',
	},
	{
		index: 158,
		name: 'Países Bajos',
		value: '+31',
	},
	{
		index: 159,
		name: 'Pakistán',
		value: '92',
	},
	{
		index: 160,
		name: 'Palau',
		value: '+680',
	},
	{
		index: 161,
		name: 'Panamá',
		value: '+507',
	},
	{
		index: 162,
		name: 'Papúa Nueva Guinea',
		value: '+675',
	},
	{
		index: 163,
		name: 'Paraguay',
		value: '+595',
	},
	{
		index: 164,
		name: 'Perú',
		value: '+51',
	},
	{
		index: 165,
		name: 'Polinesia Francesa',
		value: '+689',
	},
	{
		index: 166,
		name: 'Polonia',
		value: '+48',
	},
	{
		index: 167,
		name: 'Portugal',
		value: '351',
	},
	{
		index: 168,
		name: 'Puerto Rico',
		value: '+1 (787/939)',
	},
	{
		index: 169,
		name: 'Qatar',
		value: '+974',
	},
	{
		index: 170,
		name: 'Reino Unido',
		value: '+44',
	},
	{
		index: 171,
		name: 'República Centroafricana',
		value: '+236',
	},
	{
		index: 172,
		name: 'República Checa',
		value: '+420',
	},
	{
		index: 173,
		name: 'República Dominicana',
		value: '+1 (809/829)',
	},
	{
		index: 174,
		name: 'Ruanda',
		value: '+250',
	},
	{
		index: 175,
		name: 'Rumanía',
		value: '+40',
	},
	{
		index: 176,
		name: 'Rusia',
		value: '+7',
	},
	{
		index: 177,
		name: 'Sahara Occidental',
		value: '+212',
	},
	{
		index: 178,
		name: 'Samoa',
		value: '+685',
	},
	{
		index: 179,
		name: 'Samoa Americana',
		value: '+1 (684)',
	},
	{
		index: 180,
		name: 'San Cristóbal y Nieves',
		value: '+1 (869)',
	},
	{
		index: 181,
		name: 'San Marino',
		value: '+378',
	},
	{
		index: 182,
		name: 'San Pedro y Miquelón',
		value: '+508',
	},
	{
		index: 183,
		name: 'San Vicente y las Granadinas',
		value: '+1 (784)',
	},
	{
		index: 184,
		name: 'San Vicente y las Granadinas',
		value: '+966',
	},
	{
		index: 185,
		name: 'Santa Helena',
		value: '+290',
	},
	{
		index: 186,
		name: 'Santa Lucía',
		value: '+1 (758)',
	},
	{
		index: 187,
		name: 'Santa Sede (Ciudad del Vaticano)',
		value: '+379 o +39 (Italia)',
	},
	{
		index: 188,
		name: 'Santo Tomé y Príncipe',
		value: '+239',
	},
	{
		index: 189,
		name: 'Senegal',
		value: '+221',
	},
	{
		index: 190,
		name: 'Serbia',
		value: '+381',
	},
	{
		index: 191,
		name: 'Seychelles',
		value: '+248',
	},
	{
		index: 192,
		name: 'Sierra Leona',
		value: '+232',
	},
	{
		index: 193,
		name: 'Singapur',
		value: '+65',
	},
	{
		index: 194,
		name: 'Siria',
		value: '+963',
	},
	{
		index: 195,
		name: 'Somalia',
		value: '+252',
	},
	{
		index: 196,
		name: 'Sri Lanka',
		value: '+94',
	},
	{
		index: 197,
		name: 'Suazilandia',
		value: '+268',
	},
	{
		index: 198,
		name: 'Sudáfrica',
		value: '+27',
	},
	{
		index: 199,
		name: 'Sudán',
		value: '+249',
	},
	{
		index: 200,
		name: 'Suecia',
		value: '+46',
	},
	{
		index: 201,
		name: 'Suiza',
		value: '+41',
	},
	{
		index: 202,
		name: 'Surinam',
		value: '+597',
	},
	{
		index: 203,
		name: 'Tailandia',
		value: '+66',
	},
	{
		index: 204,
		name: 'Taiwán',
		value: '+886',
	},
	{
		index: 205,
		name: 'Tanzania',
		value: '+255',
	},
	{
		index: 206,
		name: 'Tayikistán',
		value: '+992',
	},
	{
		index: 207,
		name: 'Territorio del Norte',
		value: '+1 (670)',
	},
	{
		index: 208,
		name: 'Timor-Leste',
		value: '+670',
	},
	{
		index: 209,
		name: 'Togo',
		value: '+228',
	},
	{
		index: 210,
		name: 'Tokelau',
		value: '+690',
	},
	{
		index: 211,
		name: 'Tonga',
		value: '+676',
	},
	{
		index: 212,
		name: 'Trinidad y Tobago',
		value: '+1 (868)',
	},
	{
		index: 213,
		name: 'Túnez',
		value: '+216',
	},
	{
		index: 214,
		name: 'Turkmenistán',
		value: '+993',
	},
	{
		index: 215,
		name: 'Turquía',
		value: '+90',
	},
	{
		index: 216,
		name: 'Tuvalu',
		value: '+688',
	},
	{
		index: 217,
		name: 'Ucrania',
		value: '+380',
	},
	{
		index: 218,
		name: 'Uganda',
		value: '+256',
	},
	{
		index: 219,
		name: 'Uruguay',
		value: '+598',
	},
	{
		index: 220,
		name: 'Uzbekistán',
		value: '+998',
	},
	{
		index: 221,
		name: 'Vanuatu',
		value: '+678',
	},
	{
		index: 222,
		name: 'Venezuela',
		value: '+58',
	},
	{
		index: 223,
		name: 'Vietnam',
		value: '+84',
	},
	{
		index: 224,
		name: 'Wallis y Futuna',
		value: '+681',
	},
	{
		index: 225,
		name: 'Yemen',
		value: '+967',
	},
	{
		index: 226,
		name: 'Yibuti',
		value: '+253',
	},
	{
		index: 227,
		name: 'Zambia',
		value: '+260',
	},
	{
		index: 228,
		name: 'Zimbabue',
		value: '+263',
	},
];

const doc_type = [
	{
		index: 0,
		name: 'VENEZOLANO',
		value: 'V',
	},
	{
		index: 0,
		name: 'EXTRANJERO',
		value: 'E',
	},
];

const phone_prefix = [
	{
		index: 0,
		value: '0412',
	},
	{
		index: 1,
		value: '0416',
	},
	{
		index: 2,
		value: '0426',
	},
	{
		index: 3,
		value: '0414',
	},
	{
		index: 4,
		value: '0424',
	},
];

import colors from './Colors';
import layout from './Layout';
import data from './data.json';
export { base, colors, country_codes, doc_type, layout, data, phone_prefix };
