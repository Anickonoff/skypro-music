import { fireEvent, render } from '@testing-library/react';
import ReduxProvider from '@/store/ReduxProvider';
import Nav from './Nav';
import styles from './nav.module.css';

describe('Nav component snapshot', () => {
  it('Nav component snapshot', () => {
    const { asFragment, container } = render(
      <ReduxProvider>
        <Nav />
      </ReduxProvider>,
    );
    fireEvent.click(
      container.querySelector(`.${styles.nav__burger}`) as Element,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
