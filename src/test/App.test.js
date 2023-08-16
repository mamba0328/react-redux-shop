import { render as rtlRender, screen, act } from '@testing-library/react';
import App from '../App';

import store from '../redux/store';
import { Provider } from 'react-redux'

const render = (component) => {
  const compWithStore = <Provider store={store}>{component}</Provider>;
  return rtlRender(compWithStore)
}

global.fetch = () => Promise.resolve(() => {
  return {
    json: () => Promise.resolve({
      name: 'GIBSON LES PAUL TRIBUTE SATIN',
      price: '44 400',
      img: 'https://muztorg.ua/image/cache/catalog/99992/229497/229497_GIBSON%20LES%20PAUL%20TRIBUTE%20SATIN%20HONEYBURST_1-250x200.jpg',
      code: '228627',
      color: 'honey',
    })
  }
})

describe('App.js', () => {
  it('matches snapshot', () => {
    render(<App />);
    expect(<App />).toMatchSnapshot();
  })

  it('renders nav', () => {
    render(<App />);
    const linkElement = screen.getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
  });

  it('renders products', async () => {
    const productButton = await screen.findByText(/Add to cart/i);
    expect(productButton).toBeInTheDocument();
  });
})
