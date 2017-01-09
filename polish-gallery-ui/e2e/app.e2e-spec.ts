import { PolishGalleryPage } from './app.po';

describe('polish-gallery App', function() {
  let page: PolishGalleryPage;

  beforeEach(() => {
    page = new PolishGalleryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
