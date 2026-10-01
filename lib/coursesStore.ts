import { useEffect, useState } from 'react';

export interface ContentBlock {
  id: string;
  type: 'paragraph' | 'heading' | 'quote' | 'image' | 'list' | 'link';
  text?: string;
  quoteText?: string;
  quoteReference?: string;
  quoteUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  listType?: 'bullet' | 'number';
  items?: string[];
  linkUrl?: string;
  linkText?: string;
  style?: {
    fontSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
    bold?: boolean;
    italic?: boolean;
    highlight?: boolean;
    textAlign?: 'left' | 'center' | 'right' | 'justify';
    underline?: boolean;
  };
}

export interface Topic {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  order: number;
  blocks: ContentBlock[];
}

export interface CourseResource {
  id: string;
  title: string;
  type: string;
  url: string;
  imageUrl?: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  type: 'CURSO' | 'LIBRO' | string;
  category: 'disponible' | 'proximamente';
  imageSrc: string;
  status: 'completed' | 'empty';
  indexText?: string;
  topics: Topic[];
  resources?: CourseResource[];
}

export const initialCourses: Course[] = [
  {
    id: 'cristologia',
    slug: 'cristologia',
    title: 'CRISTOLOGÍA',
    subtitle: 'Enseñanza Bíblica de Cristología',
    description: 'La Cristología es el estudio bíblico de quién es Jesucristo. Enseña que Jesús es verdadero Dios y verdadero hombre: nació de una virgen, vivió sin pecado, murió en la cruz por nuestros pecados, resucitó al tercer día y ahora gobierna como Señor. Él es el centro de la fe cristiana, el Salvador del mundo y el único mediador entre Dios y los hombres.',
    type: 'CURSO',
    category: 'disponible',
    imageSrc: 'https://lh3.googleusercontent.com/d/1X1l4CaRCY1E6wxSyVoX1iI2RMFilJs5U',
    status: 'completed',
    resources: [
      {
        id: 'res-1',
        title: 'Apuntes Cristología',
        type: 'Documento PDF',
        url: 'https://drive.google.com/file/d/1jow-NcylPCJpzE-1Kntu_OkFQmnyO8tj/view?usp=sharing',
        imageUrl: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=200&h=120&fit=crop',
      },
      {
        id: 'res-2',
        title: 'Enseñanza Bíblica',
        type: 'Documento PDF',
        url: 'https://drive.google.com/file/d/1AN6cHgdxFvuFMxL9BdOs_H8KYvL-49Sb/view?usp=sharing',
        imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=200&h=120&fit=crop',
      },
    ],
    topics: [
      {
        id: 'introduccion',
        slug: 'introduccion',
        title: 'Introducción',
        subtitle: 'INTRODUCCIÓN CRISTOLOGÍA',
        order: 1,
        blocks: [
          {
            id: 'b-intro-1',
            type: 'heading',
            text: 'Introducción',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-intro-2',
            type: 'paragraph',
            text: 'La Cristología es la doctrina bíblica que estudia la persona y la obra de nuestro Señor Jesucristo. Su propósito es explicar quién es Jesús, cuál es la naturaleza de su ser, cuál fue su misión en la tierra y qué significado tiene su obra redentora para la humanidad. Este estudio es fundamental para la fe cristiana, pues Cristo no es un personaje secundario en las Escrituras, sino el centro mismo de la revelación divina y el fundamento de la salvación.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-intro-3',
            type: 'paragraph',
            text: 'La Biblia nos enseña que en Cristo hemos sido bendecidos con toda bendición espiritual, y que en Él se encuentran la plenitud de la gracia, la verdad y la redención de Dios para el hombre. Por ello, la Iglesia de Jesucristo tiene la urgente necesidad de conocerle, adorarle, obedecerle y disfrutar plenamente de todas las riquezas espirituales que el Padre ha concedido en su Hijo amado.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-intro-4',
            type: 'quote',
            quoteText: '“Bendito sea el Dios y Padre de nuestro Señor Jesucristo, que nos bendijo con toda bendición espiritual en los lugares celestiales en Cristo.”',
            quoteReference: 'Efesios 1:3 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Efesios%201:3&version=RVR1960',
          },
          {
            id: 'b-intro-5',
            type: 'paragraph',
            text: 'En un tiempo en que las corrientes filosóficas modernas, los pensamientos humanistas y las falsas doctrinas buscan desviar la atención de la verdad bíblica, resulta imprescindible que los creyentes estén sólidamente fundamentados en la doctrina de la persona de Jesucristo. Cuando no existe una enseñanza clara y firme acerca de Cristo, muchos pueden ser confundidos y arrastrados por ideas erróneas que debilitan la fe.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-intro-6',
            type: 'paragraph',
            text: 'La enseñanza bíblica de la Cristología fortalece al creyente, afirma su confianza en Dios y le ayuda a comprender que Jesucristo no es solo un maestro moral o un ejemplo de bondad, sino el Hijo eterno de Dios, el Verbo hecho carne, el Salvador del mundo y el único mediador entre Dios y los hombres.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-intro-7',
            type: 'quote',
            quoteText: '“Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.”',
            quoteReference: 'Juan 1:14 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Juan%201:14&version=RVR1960',
          },
          {
            id: 'b-intro-8',
            type: 'quote',
            quoteText: '“Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.”',
            quoteReference: '1 Timoteo 2:5 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=1%20Timoteo%202:5&version=RVR1960',
          },
          {
            id: 'b-intro-9',
            type: 'paragraph',
            text: 'Como ocurre con otras doctrinas esenciales de la Biblia, la Cristología ha sido también motivo de controversia a lo largo de la historia. Muchos debates teológicos han surgido en torno a la persona de Cristo, especialmente en relación con su naturaleza divina y su naturaleza humana. El Dr. Strong señala que las controversias respecto a la persona de Cristo giran principalmente sobre tres puntos fundamentales:',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-intro-10',
            type: 'list',
            listType: 'number',
            items: [
              'La realidad de las dos naturalezas.',
              'La integridad de las dos naturalezas.',
              'La unión de las dos naturalezas en una sola persona.',
            ],
          },
        ],
      },
      {
        id: 'deidad',
        slug: 'deidad',
        title: 'I. La Deidad de Cristo',
        subtitle: 'I. LA DEIDAD DE CRISTO',
        order: 2,
        blocks: [
          {
            id: 'b-deidad-1',
            type: 'heading',
            text: 'I. La Deidad de Cristo',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-deidad-2',
            type: 'heading',
            text: '1. La realidad de las dos naturalezas',
            style: { fontSize: 'xl', bold: true, textAlign: 'left' },
          },
          {
            id: 'b-deidad-3',
            type: 'paragraph',
            text: 'Este punto enseña que Jesucristo posee verdaderamente dos naturalezas: una divina y una humana. No se trata de una apariencia ni de una representación simbólica, sino de una realidad plena. Jesús es verdaderamente Dios y verdaderamente hombre.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-deidad-4',
            type: 'quote',
            quoteText: '“En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.”',
            quoteReference: 'Juan 1:1 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Juan%201:1&version=RVR1960',
          },
          {
            id: 'b-deidad-5',
            type: 'quote',
            quoteText: '“Por tanto, debía ser en todo semejante a sus hermanos, para venir a ser misericordioso y fiel sumo sacerdote en lo que a Dios se refiere, para expiar los pecados del pueblo.”',
            quoteReference: 'Hebreos 2:17 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Hebreos%202:17&version=RVR1960',
          },
          {
            id: 'b-deidad-6',
            type: 'paragraph',
            text: 'Estas verdades nos muestran que Cristo participó de nuestra humanidad sin dejar de ser Dios. Él vivió entre los hombres, sintió hambre, cansancio, dolor y tristeza, pero al mismo tiempo manifestó su deidad con poder, autoridad y santidad.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-deidad-7',
            type: 'heading',
            text: '2. La integridad de las dos naturalezas',
            style: { fontSize: 'xl', bold: true, textAlign: 'left' },
          },
          {
            id: 'b-deidad-8',
            type: 'paragraph',
            text: 'La integridad de las dos naturalezas significa que tanto la naturaleza divina como la naturaleza humana de Cristo están completas y perfectas. Jesús no es mitad Dios y mitad hombre; Él es completamente Dios y completamente hombre. En Él no hubo mezcla, disminución ni alteración de ninguna de sus naturalezas.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-deidad-9',
            type: 'quote',
            quoteText: '“Porque en él habita corporalmente toda la plenitud de la Deidad.”',
            quoteReference: 'Colosenses 2:9 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Colosenses%202:9&version=RVR1960',
          },
          {
            id: 'b-deidad-10',
            type: 'quote',
            quoteText: '“Porque no tenemos un sumo sacerdote que no pueda compadecerse de nuestras debilidades, sino uno que fue tentado en todo según nuestra semejanza, pero sin pecado.”',
            quoteReference: 'Hebreos 4:15 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Hebreos%204:15&version=RVR1960',
          },
          {
            id: 'b-deidad-11',
            type: 'heading',
            text: '3. La unión de las dos naturalezas en una sola persona',
            style: { fontSize: 'xl', bold: true, textAlign: 'left' },
          },
          {
            id: 'b-deidad-12',
            type: 'paragraph',
            text: 'Aunque Jesucristo tiene dos naturalezas, no por ello es dos personas. La doctrina bíblica enseña que en Cristo hay una sola persona, en la cual están unidas la naturaleza divina y la naturaleza humana sin confusión, sin cambio, sin división y sin separación.',
            style: { fontSize: 'base' },
          },
          {
            id: 'b-deidad-13',
            type: 'quote',
            quoteText: '“Grande es el misterio de la piedad: Dios fue manifestado en carne...”',
            quoteReference: '1 Timoteo 3:16 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=1%20Timoteo%203:16&version=RVR1960',
          },
          {
            id: 'b-deidad-14',
            type: 'heading',
            text: 'Importancia de esta doctrina para la Iglesia',
            style: { fontSize: 'xl', bold: true, italic: true, textAlign: 'left' },
          },
          {
            id: 'b-deidad-15',
            type: 'quote',
            quoteText: '“Yo soy el camino, y la verdad, y la vida; nadie viene al Padre, sino por mí.”',
            quoteReference: 'Juan 14:6 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Juan%2014:6&version=RVR1960',
          },
          {
            id: 'b-deidad-16',
            type: 'quote',
            quoteText: '“Porque nadie puede poner otro fundamento que el que está puesto, el cual es Jesucristo.”',
            quoteReference: '1 Corintios 3:11 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=1%20Corintios%203:11&version=RVR1960',
          },
        ],
      },
      {
        id: 'encarnacion',
        slug: 'encarnacion',
        title: 'II. La Encarnación de Cristo',
        subtitle: 'II. LA ENCARNACIÓN DE CRISTO',
        order: 3,
        blocks: [
          {
            id: 'b-enc-1',
            type: 'heading',
            text: 'II. La Encarnación de Cristo',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-enc-2',
            type: 'heading',
            text: 'Introducción',
            style: { fontSize: 'xl', bold: true },
          },
          {
            id: 'b-enc-3',
            type: 'paragraph',
            text: 'Antes de nacer como hombre, es decir, antes de la encarnación, Jesús, el Verbo o Hijo de Dios, no tenía cuerpo humano. Existía eternamente como Dios, pero aún no había asumido la naturaleza humana en carne y hueso.',
          },
          {
            id: 'b-enc-4',
            type: 'quote',
            quoteText: '“Y aquel Verbo fue hecho carne, y habitó entre nosotros (y vimos su gloria, gloria como del unigénito del Padre), lleno de gracia y de verdad.”',
            quoteReference: 'Juan 1:14 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Juan%201:14&version=RVR1960',
          },
          {
            id: 'b-enc-5',
            type: 'heading',
            text: 'Antes de la encarnación',
            style: { fontSize: 'xl', bold: true, textAlign: 'right' },
          },
          {
            id: 'b-enc-6',
            type: 'paragraph',
            text: 'Antes de la encarnación, Cristo existía como Dios eterno, pero sin cuerpo humano. Él era el Verbo divino, eterno, santo y glorioso, y no había tomado aún la naturaleza humana.',
          },
          {
            id: 'b-enc-7',
            type: 'heading',
            text: 'Después de la encarnación',
            style: { fontSize: 'xl', bold: true, textAlign: 'right' },
          },
          {
            id: 'b-enc-8',
            type: 'paragraph',
            text: 'Después de la encarnación, Jesús tomó nuestra naturaleza humana completa, con cuerpo, mente y emociones. De esta manera, Él pudo vivir en carne propia la experiencia humana, sin dejar de ser Dios.',
          },
          {
            id: 'b-enc-9',
            type: 'heading',
            text: 'Cristo es Dios y Hombre al 100%',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', highlight: true },
          },
          {
            id: 'b-enc-10',
            type: 'list',
            listType: 'number',
            items: [
              'Naturaleza divina: es Dios verdadero.',
              'Naturaleza humana: es hombre verdadero.',
            ],
          },
          {
            id: 'b-enc-11',
            type: 'heading',
            text: 'La doble naturaleza de Cristo',
            style: { fontSize: 'xl', bold: true, textAlign: 'right' },
          },
          {
            id: 'b-enc-12',
            type: 'quote',
            quoteText: '“Porque hay un solo Dios, y un solo mediador entre Dios y los hombres, Jesucristo hombre.”',
            quoteReference: '1 Timoteo 2:5 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=1%20Timoteo%202:5&version=RVR1960',
          },
        ],
      },
      {
        id: 'nombres',
        slug: 'nombres',
        title: 'III. Los Nombres Divinos de Cristo',
        subtitle: 'III. LOS NOMBRES DIVINOS DE CRISTO',
        order: 4,
        blocks: [
          {
            id: 'b-nom-1',
            type: 'heading',
            text: 'III. Los Nombres Divinos de Cristo',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-nom-2',
            type: 'heading',
            text: 'Se le llama Dios',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-nom-3',
            type: 'paragraph',
            text: 'Este nombre muestra que Jesús es verdadero Dios, eterno y todopoderoso. No se trata solamente de un título de honor, sino de una afirmación clara de su divinidad. Cristo posee la misma naturaleza divina y comparte plenamente la esencia de Dios.',
          },
          {
            id: 'b-nom-4',
            type: 'quote',
            quoteText: '“Mas del Hijo dice: Tu trono, oh Dios, por el siglo del siglo; cetro de equidad es el cetro de tu reino.”',
            quoteReference: 'Hebreos 1:8 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Hebreos%201:8&version=RVR1960',
          },
          {
            id: 'b-nom-5',
            type: 'heading',
            text: 'Se le llama Señor',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-nom-6',
            type: 'quote',
            quoteText: '“...y toda lengua confiese que Jesucristo es el Señor, para gloria de Dios Padre.”',
            quoteReference: 'Filipenses 2:11 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Filipenses%202:11&version=RVR1960',
          },
          {
            id: 'b-nom-7',
            type: 'heading',
            text: 'Se le llama el Primero y el Último',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-nom-8',
            type: 'quote',
            quoteText: '“Yo soy el Alfa y la Omega, principio y fin, dice el Señor, el que es y que era y que ha de venir, el Todopoderoso.”',
            quoteReference: 'Apocalipsis 1:8 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Apocalipsis%201:8&version=RVR1960',
          },
          {
            id: 'b-nom-9',
            type: 'heading',
            text: 'Cristo, el Ungido de Jehová',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-nom-10',
            type: 'quote',
            quoteText: '“Respondió Simón Pedro y dijo: Tú eres el Cristo, el Hijo del Dios viviente.”',
            quoteReference: 'Mateo 16:16 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Mateo%2016:16&version=RVR1960',
          },
        ],
      },
      {
        id: 'atributos',
        slug: 'atributos',
        title: 'IV. Los Atributos Divinos de Cristo',
        subtitle: 'IV. LOS ATRIBUTOS DIVINOS DE CRISTO',
        order: 5,
        blocks: [
          {
            id: 'b-atr-1',
            type: 'heading',
            text: 'IV. Los Atributos Divinos de Cristo',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-atr-2',
            type: 'heading',
            text: 'Omnipotencia',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-atr-3',
            type: 'paragraph',
            text: 'Este atributo significa posee todo poder absoluto, porque Él es verdaderamente Dios. Su autoridad es suprema sobre toda la creación.',
          },
          {
            id: 'b-atr-4',
            type: 'quote',
            quoteText: '“Y Jesús se acercó y les habló diciendo: Toda potestad me es dada en el cielo y en la tierra.”',
            quoteReference: 'Mateo 28:18 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Mateo%2028:18&version=RVR1960',
          },
          {
            id: 'b-atr-5',
            type: 'heading',
            text: 'Omnipresencia',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-atr-6',
            type: 'quote',
            quoteText: '“Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos.”',
            quoteReference: 'Mateo 18:20 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Mateo%2018:20&version=RVR1960',
          },
          {
            id: 'b-atr-7',
            type: 'heading',
            text: 'Omnisciencia',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-atr-8',
            type: 'quote',
            quoteText: '“Ahora entendemos que sabes todas las cosas, y no necesitas que nadie te pregunte; por esto creemos que has salido de Dios.”',
            quoteReference: 'Juan 16:30 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Juan%2016:30&version=RVR1960',
          },
        ],
      },
      {
        id: 'propiedades',
        slug: 'propiedades',
        title: 'V. Propiedades Divinas de Cristo',
        subtitle: 'V. PROPIEDADES DIVINAS DE CRISTO',
        order: 6,
        blocks: [
          {
            id: 'b-prop-1',
            type: 'heading',
            text: 'V. Propiedades Divinas de Cristo',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-prop-2',
            type: 'heading',
            text: 'Su propia existencia',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-prop-3',
            type: 'paragraph',
            text: 'Este es un atributo que se relaciona con la existencia propia de Cristo. La base de Su existencia se encuentra en Él mismo. Él es su propia causa. Como Dios, Cristo es eterno y existe por Sí mismo.',
          },
          {
            id: 'b-prop-4',
            type: 'quote',
            quoteText: '“Y respondió Dios a Moisés: YO SOY EL QUE SOY.”',
            quoteReference: 'Éxodo 3:14 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Exodo%203:14&version=RVR1960',
          },
          {
            id: 'b-prop-5',
            type: 'heading',
            text: 'Su inmutabilidad',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-prop-6',
            type: 'quote',
            quoteText: '“Jesucristo es el mismo ayer, y hoy, y por los siglos.”',
            quoteReference: 'Hebreos 13:8 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Hebreos%2013:8&version=RVR1960',
          },
          {
            id: 'b-prop-7',
            type: 'heading',
            text: 'Su infinitud',
            style: { fontSize: 'xl', bold: true, textAlign: 'right', underline: true },
          },
          {
            id: 'b-prop-8',
            type: 'paragraph',
            text: 'La infinitud es aquella perfección divina por medio de la cual Dios está libre de toda limitación.',
          },
          {
            id: 'b-prop-9',
            type: 'heading',
            text: 'a. Su absoluta perfección',
            style: { fontSize: 'lg', bold: true, textAlign: 'right' },
          },
          {
            id: 'b-prop-10',
            type: 'quote',
            quoteText: '“Grande es Jehová, y digno de suprema alabanza; y su grandeza es inescrutable.”',
            quoteReference: 'Salmo 145:3 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Salmo%20145:3&version=RVR1960',
          },
          {
            id: 'b-prop-11',
            type: 'heading',
            text: 'b. Su eternidad',
            style: { fontSize: 'lg', bold: true, textAlign: 'right' },
          },
          {
            id: 'b-prop-12',
            type: 'quote',
            quoteText: '“Antes que naciesen los montes y formases la tierra y el mundo, desde el siglo y hasta el siglo, tú eres Dios.”',
            quoteReference: 'Salmo 90:2 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Salmo%2090:2&version=RVR1960',
          },
        ],
      },
    ],
  },
  {
    id: 'que-significa-buscar-a-dios',
    slug: 'que-significa-buscar-a-dios',
    title: 'QUÉ SIGNIFICA BUSCAR A DIOS',
    subtitle: 'Enseñanza Bíblica de Buscar a Dios',
    description: 'Buscar a Dios no es encontrar algo que está perdido, sino orientar toda nuestra vida hacia Su presencia. Es un acto de la voluntad, del corazón y de la mente que reconoce nuestra necesidad absoluta de Él.',
    type: 'CURSO',
    category: 'disponible',
    imageSrc: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=400&h=600&fit=crop',
    status: 'completed',
    resources: [
      {
        id: 'res-buscar-1',
        title: 'Qué Significa Buscar a Dios',
        type: 'Documento PDF',
        url: 'https://drive.google.com/file/d/1JiktR1HOTpVSBGk5SDHo1vPEM7cUa1XZ/view?usp=sharing',
        imageUrl: 'https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=200&h=120&fit=crop',
      },
    ],
    topics: [
      {
        id: 'principal',
        slug: 'principal',
        title: 'Qué Significa Buscar a Dios',
        subtitle: 'ENSEÑANZA BÍBLICA',
        order: 1,
        blocks: [
          {
            id: 'b-bad-1',
            type: 'heading',
            text: 'Qué Significa Buscar a Dios',
            style: { fontSize: '4xl', bold: true, textAlign: 'center' },
          },
          {
            id: 'b-bad-2',
            type: 'paragraph',
            text: 'Buscar a Dios no es encontrar algo que está perdido, sino orientar toda nuestra vida hacia Su presencia. Es un acto de la voluntad, del corazón y de la mente que reconoce nuestra necesidad absoluta de Él.',
            style: { fontSize: 'base', italic: true },
          },
          {
            id: 'b-bad-3',
            type: 'quote',
            quoteText: '“Buscad a Jehová y su poder; buscad siempre su rostro.”',
            quoteReference: 'Salmo 105:4 (Reina-Valera 1960)',
            quoteUrl: 'https://www.biblegateway.com/passage/?search=Salmo%20105:4&version=RVR1960',
          },
          {
            id: 'b-bad-4',
            type: 'heading',
            text: 'Puntos Clave',
            style: { fontSize: 'xl', bold: true },
          },
          {
            id: 'b-bad-5',
            type: 'list',
            listType: 'bullet',
            items: [
              'Reconocer nuestra sed espiritual',
              'La importancia de la oración constante',
              'Encontrar a Dios en Su Palabra',
              'Vivir en obediencia por amor',
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'teologia',
    slug: 'teologia',
    title: 'TEOLOGÍA',
    subtitle: 'Enseñanza Bíblica de Teología',
    description: 'Estudio sobre la naturaleza de Dios y las verdades bíblicas fundamentales.',
    type: 'CURSO',
    category: 'disponible',
    imageSrc: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=400&h=600&fit=crop',
    status: 'empty',
    topics: [],
  },
  {
    id: 'eclesiologia',
    slug: 'eclesiologia',
    title: 'ECLESIOLOGÍA',
    subtitle: 'Enseñanza Bíblica de Eclesiología',
    description: 'Estudio sobre la naturaleza, propósito y misión de la Iglesia.',
    type: 'CURSO',
    category: 'disponible',
    imageSrc: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=400&h=600&fit=crop',
    status: 'empty',
    topics: [],
  },
  {
    id: 'neumatologia',
    slug: 'neumatologia',
    title: 'NEUMATOLOGÍA',
    subtitle: 'Enseñanza Bíblica del Espíritu Santo',
    description: 'Estudio bíblico sobre la persona, divinidad y obra del Espíritu Santo.',
    type: 'CURSO',
    category: 'proximamente',
    imageSrc: 'https://images.unsplash.com/photo-1475113548554-5a36f1f523d6?q=80&w=400&h=600&fit=crop',
    status: 'empty',
    topics: [],
  },
  {
    id: 'escatologia',
    slug: 'escatologia',
    title: 'ESCATOLOGÍA',
    subtitle: 'Enseñanza Bíblica de las Profecías',
    description: 'Estudio de los eventos finales y las promesas futuras de Dios.',
    type: 'CURSO',
    category: 'proximamente',
    imageSrc: 'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=400&h=600&fit=crop',
    status: 'empty',
    topics: [],
  },
];

const STORAGE_KEY = 'estudio_biblico_courses_v1';

export function getCoursesFromStorage(): Course[] {
  if (typeof window === 'undefined') return initialCourses;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCourses));
      return initialCourses;
    }
    return JSON.parse(item);
  } catch (err) {
    console.error('Error reading courses from storage', err);
    return initialCourses;
  }
}

export function saveCoursesToStorage(courses: Course[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
    window.dispatchEvent(new Event('courses_updated'));
  } catch (err) {
    console.error('Error saving courses to storage', err);
  }
}

export function useCoursesStore() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCourses(getCoursesFromStorage());
    setIsLoaded(true);

    const handleUpdate = () => {
      setCourses(getCoursesFromStorage());
    };

    window.addEventListener('courses_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('courses_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateCourse = (updatedCourse: Course) => {
    const newCourses = courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c));
    setCourses(newCourses);
    saveCoursesToStorage(newCourses);
  };

  const addCourse = (newCourse: Course) => {
    const newCourses = [...courses, newCourse];
    setCourses(newCourses);
    saveCoursesToStorage(newCourses);
  };

  const deleteCourse = (courseId: string) => {
    const newCourses = courses.filter((c) => c.id !== courseId);
    setCourses(newCourses);
    saveCoursesToStorage(newCourses);
  };

  const resetToDefault = () => {
    saveCoursesToStorage(initialCourses);
    setCourses(initialCourses);
  };

  return {
    courses,
    isLoaded,
    updateCourse,
    addCourse,
    deleteCourse,
    resetToDefault,
  };
}
