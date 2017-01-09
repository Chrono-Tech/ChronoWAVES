import { ChronoWAVESPage } from './app.po';

describe('chrono-waves App', function() {
  let page: ChronoWAVESPage;

  beforeEach(() => {
    page = new ChronoWAVESPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
