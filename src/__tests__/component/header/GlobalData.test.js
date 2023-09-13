/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react';
import GlobalData from '../../../component/header/GlobalData';


jest.mock('axios');

describe('The crypto', () => {
  test('check title', () => {
    render(<GlobalData />);
    const title = screen.getByText('Crypto:');
    expect(title).not.toBeNull();
  })

})

describe('The exchange', () => {
  test('check title', () => {
    render(<GlobalData />);
    const title = screen.getByText('Exchanges:');
    expect(title).not.toBeNull();
  })
})

describe('The market cap', () => {
  test('check title', () => {
    render(<GlobalData />);
    const title = screen.getByText('Market Cap:');
    expect(title).not.toBeNull();
  })
})

describe('The 24h vol', () => {
  test('check title', () => {
    render(<GlobalData />);
    const title = screen.getByText('24h Vol:');
    expect(title).not.toBeNull();
  })
})

  

  
