import { render } from '@testing-library/react';
import HeroSection from './HeroSection';

describe('HeroSection', () => {
  it('HeroSection 내용 표출', () => {
    render((
      <HeroSection />
    ));
  });
});
