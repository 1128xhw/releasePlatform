'use strict';

describe('myApp.mobile module', function() {

  beforeEach(module('myApp.mobile'));

  describe('mobile controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('View2Ctrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});