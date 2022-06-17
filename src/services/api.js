const delay = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds);
  });
}

class Api {

  constructor() {
    this.houses = [
      {
        id: 1,
        cover: require('../assets/house1.jpg'),
        images: [
          require('../assets/images/house1/praia1.jpg'),
          require('../assets/images/house1/praia2.jpg'),
          require('../assets/images/house1/praia3.jpg'),
        ],
        name: 'Casa na Praia',
        description: 'Casa nova uma quadra do mar, lugar seguro e monitorado 24horas.',
        price: 'R$ 699,00',
        new: true,
        offer: 25,
        nextToUser: false,
        isFavorite: false,
      },
      {
        id: 2,
        cover: require('../assets/house2.jpg'),
        images: [
          require('../assets/images/house2/campo1.jpg'),
          require('../assets/images/house2/campo2.jpg'),
          require('../assets/images/house2/campo3.jpg'),
          require('../assets/images/house2/campo4.jpg'),
          require('../assets/images/house2/campo5.jpg'),
          require('../assets/images/house2/campo6.jpg'),
        ],
        name: 'Casa de Campo',
        description: 'Casa tranquila e aconchegante para passar uma estadia de férias com a família',
        price: 'R$ 1100,00',
        new: false,
        offer: 10,
        nextToUser: false,
        isFavorite: false,
      },
      {
        id: 3,
        cover: require('../assets/house3.jpg'),
        name: 'Casa Paraty',
        images: [
          require('../assets/images/house3/luxo1.jpg'),
          require('../assets/images/house3/luxo2.jpg'),
          require('../assets/images/house3/luxo3.jpg'),
          require('../assets/images/house3/luxo4.jpg'),
          require('../assets/images/house3/luxo5.jpg'),
          require('../assets/images/house3/luxo6.jpg'),
        ],
        description: 'Casa nova e moderna, luxuosa e simples. Projetada para promover o máximo de conforto e a melhor experiência.',
        price: 'R$ 1800,00',
        new: true,
        offer: 15,
        nextToUser: false,
        isFavorite: false,
      },
      {
        id: 4,
        cover: require('../assets/house4.jpg'),
        name: 'Apartamento no interior',
        images: [
          require('../assets/images/house4/ap1.jpg'),
          require('../assets/images/house4/ap2.jpg'),
          require('../assets/images/house4/ap3.jpg'),
        ],
        description: 'Apartamento único. Baixo nobre no interior de São Paulo. Segurança particular.',
        price: 'R$ 1500,00',
        new: false,
        offer: 0,
        nextToUser: true,
        isFavorite: false,
      },
      {
        id: 5,
        cover: require('../assets/house5.jpg'),
        name: 'Fazenda Boas Novas',
        images: [
          require('../assets/images/house5/fazenda1.jpg'),
          require('../assets/images/house5/fazenda2.jpg'),
          require('../assets/images/house5/fazenda3.jpg'),
          require('../assets/images/house5/fazenda4.jpg'),
        ],
        description: 'Fazenda no interior de Minas Gerais, excelente local para férias em familia',
        price: 'R$ 1200,00',
        new: true,
        offer: 0,
        nextToUser: true,
        isFavorite: false,
      },
      {
        id: 6,
        name: 'Casa no Alaska',
        cover: require('../assets/house6.jpg'),
        images: [
          require('../assets/images/house6/neve1.jpg'),
          require('../assets/images/house6/neve2.jpg'),
          require('../assets/images/house6/neve3.jpg'),
        ],
        description: 'Casa de campo no Alaska. Paredes com isolamento termico e acustico, quentinha e aconchegante até no inverno mais rigoroso',
        price: 'R$ 799,00',
        new: true,
        offer: 20,
        nextToUser: true,
        isFavorite: false,
      },
    ]
  }

  async getNew() {
    await delay(2000);
    const newHouses = this.houses.filter(house => house.new);
    return newHouses;
  }

  async getNextToUser() {
    await delay(2000);
    return this.houses.filter(house => house.nextToUser);
  }

  async getWithOffer() {
    await delay(2000);
    return this.houses.filter(house => house.offer > 0);
  }

  async getFavorites() {
    await delay(2000);
    return this.houses.filter(house => house.isFavorite);
  }

  async toggleFavorite(id) {
    await delay(500);
    const house = this.houses.find(house => house.id === id);
    house.isFavorite = !house.isFavorite;

    return house;
  }

  async getHouse(id) {
    await delay(3000);

    const house = this.houses.find(house => house.id === id);
    return house;
  }
  
  async filter(str) {
    await delay(300);
    return this.houses.filter(house => house.name.includes(str));
  }
}

const api = new Api();

export { api };