'use strict';

describe('The home view', function () {
  var page;

  beforeEach(function () {
    browser.get('http://localhost:3000/index.html');
    page = require('./home.po');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Lucky Casino');
  });

  it('list more than 3 awesome things', function () {
    expect(page.thumbnailEls.count()).toBeGreaterThan(3);
  });

});
