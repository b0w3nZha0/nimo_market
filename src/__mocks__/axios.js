import GlobalAPI from './GlobalAPI.json';

module.exports = {
  get: jest.fn((url) => {
      if (url === 'https://api.coingecko.com/api/v3/global') {
          return Promise.resolve({
            data: {GlobalAPI}
          });
      }
  }),
  
};