import aricaImg from '../assets/img/Arica.jpg'
import iquiqueImg from '../assets/img/Iquique.jpg'
import antofagastaImg from '../assets/img/Antofagasta.jpg'
import copiapoImg from '../assets/img/Copiapo.jpg'
import laserenaImg from '../assets/img/La Serena.jpg'
import valparaisoImg from '../assets/img/Valparaiso.jpg'
import santiagoImg from '../assets/img/Santiago.jpg'
import rancaguaImg from '../assets/img/Rancagua.jpg'
import talcaImg from '../assets/img/Talca.jpg'
import chillanImg from '../assets/img/Chillan.jpg'
import concepcionImg from '../assets/img/Concepción.jpg'
import temucoImg from '../assets/img/Temuco.jpg'
import valdiviaImg from '../assets/img/Valdivia.jpg'
import puertomonttImg from '../assets/img/Puerto Montt.jpg'
import coyhaiqueImg from '../assets/img/Coyhaique.jpg'
import puntaarenasImg from '../assets/img/Punta Arenas.jpg'

export const baseCitiesConfig = [
    {
        id: 'arica',
        name: 'Arica',
        region: 'Arica y Parinacota',
        lat: -18.4746, 
        lon: -70.2979,
        image: aricaImg,
        color: 'from-orange-400 to-yellow-500',
        description: 'La "Ciudad de la Eterna Primavera" ubicada en el extremo norte de Chile. Destaca por su agradable clima durante todo el año y sus cálidas playas.'
    },
    {
        id: 'iquique',
        name: 'Iquique',
        region: 'Tarapacá',
        lat: -20.2133, 
        lon: -70.1503,
        image: iquiqueImg,
        color: 'from-yellow-500 to-orange-600',
        description: 'Importante puerto del norte grande conocido por su costa y clima desértico costero, además de su vibrante vida y arquitectura histórica.'
    },
    {
        id: 'antofagasta',
        name: 'Antofagasta',
        region: 'Antofagasta',
        lat: -23.6524, 
        lon: -70.3954,
        image: antofagastaImg,
        color: 'from-orange-300 to-red-500',
        description: 'Conocida como la "Perla del Norte", es fundamental para la minería chilena, ubicada entre el Desierto de Atacama y el Océano Pacífico.'
    },
    {
        id: 'copiapo',
        name: 'Copiapó',
        region: 'Atacama',
        lat: -27.3665, 
        lon: -70.3323,
        image: copiapoImg,
        color: 'from-red-400 to-orange-600',
        description: 'Ubicada en el norte chico, es famosa por su cercanía al desierto florido y su fuerte identidad ligado a la minería y la agricultura de valle.'
    },
    {
        id: 'la-serena',
        name: 'La Serena',
        region: 'Coquimbo',
        lat: -29.9045, 
        lon: -71.2489,
        image: laserenaImg,
        color: 'from-blue-300 to-cyan-600',
        description: 'Capital regional con un clima muy particular: mañanas nubladas y tardes soleadas. Destaca por su arquitectura neocolonial y sus extensas playas.'
    },
    {
        id: 'valparaiso',
        name: 'Valparaíso',
        region: 'Valparaíso',
        lat: -33.036, 
        lon: -71.6273,
        image: valparaisoImg,
        color: 'from-indigo-400 to-blue-600',
        description: 'Principal puerto de Chile y Patrimonio de la Humanidad. Famoso por sus cerros llenos de coloridas casas, ascensores patrimoniales y clima mediterráneo costero.'
    },
    {
        id: 'santiago',
        name: 'Santiago',
        region: 'Metropolitana de Santiago',
        lat: -33.4372, 
        lon: -70.6506,
        image: santiagoImg,
        color: 'from-slate-400 to-slate-600',
        description: 'La capital y ciudad más poblada de Chile. Situada en un valle rodeado por la imponente cordillera de los Andes, presenta un clima mediterráneo continentalizado.'
    },
    {
        id: 'rancagua',
        name: 'Rancagua',
        region: "Libertador General Bernardo O'Higgins",
        lat: -34.1708, 
        lon: -70.7445,
        image: rancaguaImg,
        color: 'from-amber-600 to-red-700',
        description: 'Ciudad de raíces campesinas y huasas, con un clima mediterráneo en el corazón agrícola e histórico de la zona centro del país.'
    },
    {
        id: 'talca',
        name: 'Talca',
        region: 'Maule',
        lat: -35.4264, 
        lon: -71.6554,
        image: talcaImg,
        color: 'from-green-500 to-yellow-600',
        description: 'Importante centro agrícola e industrial rodeado de ríos. Famosa por sus cálidos veranos e inviernos lluviosos.'
    },
    {
        id: 'chillan',
        name: 'Chillán',
        region: 'Ñuble',
        lat: -36.6063, 
        lon: -72.1034,
        image: chillanImg,
        color: 'from-emerald-400 to-green-600',
        description: 'Clima mediterráneo de interior con marcadas estaciones. Tierra natal de importantes próceres y cuna de folclore y tradiciones campesinas.'
    },
    {
        id: 'concepcion',
        name: 'Concepción',
        region: 'Biobío',
        lat: -36.827, 
        lon: -73.0503,
        image: concepcionImg,
        color: 'from-gray-500 to-gray-700',
        description: 'Importante polo urbano, industrial y universitario. Cuenta con un clima oceánico de influencia mediterránea con frecuentes lluvias durante el año.'
    },
    {
        id: 'temuco',
        name: 'Temuco',
        region: 'La Araucanía',
        lat: -38.7397, 
        lon: -72.5984,
        image: temucoImg,
        color: 'from-green-600 to-teal-700',
        description: 'Corazón de la Araucanía, ciudad lluviosa flanqueada por campos y reservas naturales. Importante centro de confluencia de la cultura Mapuche.'
    },
    {
        id: 'valdivia',
        name: 'Valdivia',
        region: 'Los Ríos',
        lat: -39.8142, 
        lon: -73.2459,
        image: valdiviaImg,
        color: 'from-teal-700 to-emerald-900',
        description: 'Conocida como la "Perla del Sur". Se caracteriza por sus ríos plácidos, su impresionante selva valdiviana, fuerte herencia alemana y abundante lluvia.'
    },
    {
        id: 'puerto-montt',
        name: 'Puerto Montt',
        region: 'Los Lagos',
        lat: -41.4693, 
        lon: -72.9424,
        image: puertomonttImg,
        color: 'from-cyan-700 to-blue-800',
        description: 'Ubicada frente al Seno de Reloncaví. Es el histórico punto de partida hacia la mítica Patagonia chilena, la isla de Chiloé y la Carretera Austral.'
    },
    {
        id: 'coyhaique',
        name: 'Coyhaique',
        region: 'Aisén del G. Carlos Ibáñez del Campo',
        lat: -45.5752, 
        lon: -72.0662,
        image: coyhaiqueImg,
        color: 'from-blue-600 to-indigo-900',
        description: 'Ciudad enclavada en medio de montañas y estepas en el corazón de la Patagonia, famosa por sus gélidos inviernos y paisajes indómitos.'
    },
    {
        id: 'punta-arenas',
        name: 'Punta Arenas',
        region: 'Magallanes y de la Antártica Chilena',
        lat: -53.15, 
        lon: -70.9167,
        image: puntaarenasImg,
        color: 'from-cyan-800 to-blue-950',
        description: 'Una de las ciudades más australes del mundo, asomada al Estrecho de Magallanes. Se distingue por su clima subpolar oceánico y vientos dominantes.'
    }
];
