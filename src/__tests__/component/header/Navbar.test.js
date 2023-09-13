/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import Navbar from '../../../component/header/Navbar';

describe('The logo component', () => {
  test('logo should be rendered', () => {
    render(<Navbar/>);
    const logo = screen.getByAltText('logo');
    expect(logo.alt).toContain('logo');
  })

  test('check logo src file', () => {
    render(<Navbar/>);
    const logo = screen.getByAltText('logo');
    expect(logo.src).toContain('logo.png');
  })
})

describe('The site name component', () => {
  test('site name should be rendered', () => {
    render(<Navbar/>);
    const title = screen.getByText('Nimo Market');
    expect(title).not.toBeNull();
  })

})
