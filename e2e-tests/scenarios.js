'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /pc when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/pc");
  });


  describe('pc', function() {

    beforeEach(function() {
      browser.get('index.html#!/pc');
    });


    it('should render pc when user navigates to /pc', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

  });


  describe('mobile', function() {

    beforeEach(function() {
      browser.get('index.html#!/mobile');
    });


    it('should render mobile when user navigates to /mobile', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
