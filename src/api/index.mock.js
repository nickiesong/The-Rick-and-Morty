jest.mock('../api', () => ({
  fetchCharacters: jest.fn().mockImplementation((name, page) => {
    const PAYLOAD1 = {
      info: {
        count: 3,
        pages: 2,
        next: 'https://rickandmortyapi.com/api/character?page=2',
        prev: null,
      },
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
          origin: { name: 'Earth (C-137)', url: 'https://rickandmortyapi.com/api/location/1' },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          url: 'https://rickandmortyapi.com/api/character/1',
        },
        {
          id: 2,
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          location: { name: 'Citadel of Ricks', url: 'https://rickandmortyapi.com/api/location/3' },
          origin: { name: 'unknown', url: '' },
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          url: 'https://rickandmortyapi.com/api/character/2',
        },
      ],
    };
    const PAYLOAD2 = {
      info: {
        count: 3,
        pages: 2,
        next: null,
        prev: 'https://rickandmortyapi.com/api/character?page=1',
      },
      results: [
        {
          id: 3,
          name: 'Summer Smith',
          status: 'Alive',
          species: 'Human',
          location: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          origin: {
            name: 'Earth (Replacement Dimension)',
            url: 'https://rickandmortyapi.com/api/location/20',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
          url: 'https://rickandmortyapi.com/api/character/3',
        },
      ],
    };

    return new Promise((resolve, reject) => {
      if (page === 1 && name === 'Smith') {
        PAYLOAD1.results.shift();
        PAYLOAD1.results.push(PAYLOAD2.results[0]);
        resolve(PAYLOAD1);
      } else if (page === 1 && !name) {
        resolve(PAYLOAD1);
      } else if (page === 2 && !name) {
        resolve(PAYLOAD2);
      } else {
        resolve({
          info: {
            pages: 0,
            count: 0,
          },
          results: [],
        });
      }
    });
  }),
}));
