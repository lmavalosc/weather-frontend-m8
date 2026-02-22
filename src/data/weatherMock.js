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

export const chileCitiesData = [
    {
        id: 'arica',
        name: 'Arica',
        region: 'Arica y Parinacota',
        image: aricaImg,
        currentWeather: { temp: 24, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 23, icon: '☀️' },
            { day: 'Mar', temp: 24, icon: '☀️' },
            { day: 'Mié', temp: 25, icon: '⛅' },
        ],
        stats: { min: 18, max: 26, average: 22 },
        color: 'from-orange-400 to-yellow-500',
        description: 'La "Ciudad de la Eterna Primavera" ubicada en el extremo norte de Chile. Destaca por su agradable clima durante todo el año y sus cálidas playas.'
    },
    {
        id: 'iquique',
        name: 'Iquique',
        region: 'Tarapacá',
        image: iquiqueImg,
        currentWeather: { temp: 22, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 21, icon: '⛅' },
            { day: 'Mar', temp: 23, icon: '☀️' },
            { day: 'Mié', temp: 22, icon: '☀️' },
        ],
        stats: { min: 16, max: 25, average: 21 },
        color: 'from-yellow-500 to-orange-600',
        description: 'Importante puerto del norte grande conocido por su costa y clima desértico costero, además de su vibrante vida y arquitectura histórica.'
    },
    {
        id: 'antofagasta',
        name: 'Antofagasta',
        region: 'Antofagasta',
        image: antofagastaImg,
        currentWeather: { temp: 20, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 19, icon: '☀️' },
            { day: 'Mar', temp: 21, icon: '☀️' },
            { day: 'Mié', temp: 20, icon: '⛅' },
        ],
        stats: { min: 15, max: 24, average: 19 },
        color: 'from-orange-300 to-red-500',
        description: 'Conocida como la "Perla del Norte", es fundamental para la minería chilena, ubicada entre el Desierto de Atacama y el Océano Pacífico.'
    },
    {
        id: 'copiapo',
        name: 'Copiapó',
        region: 'Atacama',
        image: copiapoImg,
        currentWeather: { temp: 25, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 26, icon: '☀️' },
            { day: 'Mar', temp: 24, icon: '⛅' },
            { day: 'Mié', temp: 27, icon: '☀️' },
        ],
        stats: { min: 12, max: 30, average: 22 },
        color: 'from-red-400 to-orange-600',
        description: 'Ubicada en el norte chico, es famosa por su cercanía al desierto florido y su fuerte identidad ligada a la minería y la agricultura de valle.'
    },
    {
        id: 'la-serena',
        name: 'La Serena',
        region: 'Coquimbo',
        image: laserenaImg,
        currentWeather: { temp: 19, condition: 'Nublado variando a Despejado', icon: '⛅' },
        forecast: [
            { day: 'Lun', temp: 18, icon: '☁️' },
            { day: 'Mar', temp: 20, icon: '☀️' },
            { day: 'Mié', temp: 19, icon: '⛅' },
        ],
        stats: { min: 13, max: 22, average: 17 },
        color: 'from-blue-300 to-cyan-600',
        description: 'Capital regional con un clima muy particular: mañanas nubladas y tardes soleadas. Destaca por su arquitectura neocolonial y sus extensas playas.'
    },
    {
        id: 'valparaiso',
        name: 'Valparaíso',
        region: 'Valparaíso',
        image: valparaisoImg,
        currentWeather: { temp: 18, condition: 'Parcialmente Nublado', icon: '⛅' },
        forecast: [
            { day: 'Lun', temp: 17, icon: '☁️' },
            { day: 'Mar', temp: 19, icon: '☀️' },
            { day: 'Mié', temp: 18, icon: '⛅' },
        ],
        stats: { min: 12, max: 22, average: 17 },
        color: 'from-indigo-400 to-blue-600',
        description: 'Principal puerto de Chile y Patrimonio de la Humanidad. Famoso por sus cerros llenos de coloridas casas, ascensores patrimoniales y clima mediterráneo costero.'
    },
    {
        id: 'santiago',
        name: 'Santiago',
        region: 'Metropolitana de Santiago',
        image: santiagoImg,
        currentWeather: { temp: 28, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 29, icon: '☀️' },
            { day: 'Mar', temp: 30, icon: '☀️' },
            { day: 'Mié', temp: 27, icon: '⛅' },
        ],
        stats: { min: 14, max: 32, average: 23 },
        color: 'from-slate-400 to-slate-600',
        description: 'La capital y ciudad más poblada de Chile. Situada en un valle rodeado por la imponente cordillera de los Andes, presenta un clima mediterráneo continentalizado.'
    },
    {
        id: 'rancagua',
        name: 'Rancagua',
        region: "Libertador General Bernardo O'Higgins",
        image: rancaguaImg,
        currentWeather: { temp: 26, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 25, icon: '⛅' },
            { day: 'Mar', temp: 28, icon: '☀️' },
            { day: 'Mié', temp: 26, icon: '☀️' },
        ],
        stats: { min: 12, max: 30, average: 21 },
        color: 'from-amber-600 to-red-700',
        description: 'Ciudad de raíces campesinas y huasas, con un clima mediterráneo en el corazón agrícola e histórico de la zona centro del país.'
    },
    {
        id: 'talca',
        name: 'Talca',
        region: 'Maule',
        image: talcaImg,
        currentWeather: { temp: 24, condition: 'Despejado', icon: '☀️' },
        forecast: [
            { day: 'Lun', temp: 23, icon: '⛅' },
            { day: 'Mar', temp: 25, icon: '☀️' },
            { day: 'Mié', temp: 22, icon: '☀️' },
        ],
        stats: { min: 10, max: 28, average: 19 },
        color: 'from-green-500 to-yellow-600',
        description: 'Importante centro agrícola e industrial rodeado de ríos. Famosa por sus cálidos veranos e inviernos lluviosos.'
    },
    {
        id: 'chillan',
        name: 'Chillán',
        region: 'Ñuble',
        image: chillanImg,
        currentWeather: { temp: 22, condition: 'Parcialmente Nublado', icon: '⛅' },
        forecast: [
            { day: 'Lun', temp: 21, icon: '☁️' },
            { day: 'Mar', temp: 24, icon: '☀️' },
            { day: 'Mié', temp: 20, icon: '⛅' },
        ],
        stats: { min: 8, max: 27, average: 17 },
        color: 'from-emerald-400 to-green-600',
        description: 'Clima mediterráneo de interior con marcadas estaciones. Tierra natal de importantes próceres y cuna de folclore y tradiciones campesinas.'
    },
    {
        id: 'concepcion',
        name: 'Concepción',
        region: 'Biobío',
        image: concepcionImg,
        currentWeather: { temp: 16, condition: 'Nublado', icon: '☁️' },
        forecast: [
            { day: 'Lun', temp: 17, icon: '🌧️' },
            { day: 'Mar', temp: 15, icon: '☁️' },
            { day: 'Mié', temp: 18, icon: '⛅' },
        ],
        stats: { min: 10, max: 20, average: 15 },
        color: 'from-gray-500 to-gray-700',
        description: 'Importante polo urbano, industrial y universitario. Cuenta con un clima oceánico de influencia mediterránea con frecuentes lluvias durante el año.'
    },
    {
        id: 'temuco',
        name: 'Temuco',
        region: 'La Araucanía',
        image: temucoImg,
        currentWeather: { temp: 15, condition: 'Lluvioso', icon: '🌧️' },
        forecast: [
            { day: 'Lun', temp: 14, icon: '🌧️' },
            { day: 'Mar', temp: 16, icon: '⛅' },
            { day: 'Mié', temp: 13, icon: '🌧️' },
        ],
        stats: { min: 7, max: 19, average: 13 },
        color: 'from-green-600 to-teal-700',
        description: 'Corazón de la Araucanía, ciudad lluviosa flanqueada por campos y reservas naturales. Importante centro de confluencia de la cultura Mapuche.'
    },
    {
        id: 'valdivia',
        name: 'Valdivia',
        region: 'Los Ríos',
        image: valdiviaImg,
        currentWeather: { temp: 14, condition: 'Lluvioso', icon: '🌧️' },
        forecast: [
            { day: 'Lun', temp: 13, icon: '🌧️' },
            { day: 'Mar', temp: 15, icon: '🌧️' },
            { day: 'Mié', temp: 14, icon: '☁️' },
        ],
        stats: { min: 8, max: 18, average: 13 },
        color: 'from-teal-700 to-emerald-900',
        description: 'Conocida como la "Perla del Sur". Se caracteriza por sus ríos plácidos, su impresionante selva valdiviana, fuerte herencia alemana y abundante lluvia.'
    },
    {
        id: 'puerto-montt',
        name: 'Puerto Montt',
        region: 'Los Lagos',
        image: puertomonttImg,
        currentWeather: { temp: 12, condition: 'Chubascos', icon: '🌧️' },
        forecast: [
            { day: 'Lun', temp: 11, icon: '🌧️' },
            { day: 'Mar', temp: 13, icon: '☁️' },
            { day: 'Mié', temp: 12, icon: '🌧️' },
        ],
        stats: { min: 6, max: 16, average: 11 },
        color: 'from-cyan-700 to-blue-800',
        description: 'Ubicada frente al Seno de Reloncaví. Es el histórico punto de partida hacia la mítica Patagonia chilena, la isla de Chiloé y la Carretera Austral.'
    },
    {
        id: 'coyhaique',
        name: 'Coyhaique',
        region: 'Aisén del G. Carlos Ibáñez del Campo',
        image: coyhaiqueImg,
        currentWeather: { temp: 8, condition: 'Parcialmente Nublado', icon: '⛅' },
        forecast: [
            { day: 'Lun', temp: 6, icon: '☁️' },
            { day: 'Mar', temp: 9, icon: '⛅' },
            { day: 'Mié', temp: 7, icon: '🌧️' },
        ],
        stats: { min: 2, max: 15, average: 8 },
        color: 'from-blue-600 to-indigo-900',
        description: 'Ciudad enclavada en medio de montañas y estepas en el corazón de la Patagonia, famosa por sus gélidos inviernos y paisajes indómitos.'
    },
    {
        id: 'punta-arenas',
        name: 'Punta Arenas',
        region: 'Magallanes y de la Antártica Chilena',
        image: puntaarenasImg,
        currentWeather: { temp: 6, condition: 'Vientos Fuertes', icon: '💨' },
        forecast: [
            { day: 'Lun', temp: 5, icon: '🌧️' },
            { day: 'Mar', temp: 7, icon: '⛅' },
            { day: 'Mié', temp: 4, icon: '❄️' },
        ],
        stats: { min: 0, max: 10, average: 5 },
        color: 'from-cyan-800 to-blue-950',
        description: 'Una de las ciudades más australes del mundo, asomada al Estrecho de Magallanes. Se distingue por su clima subpolar oceánico y vientos dominantes.'
    }
];
