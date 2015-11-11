describe('Utils', function() {
  describe('.$', function() {
    it('it gets an element with the given ID from the DOM', function() {
      var body = document.getElementsByTagName('body')[0];
      var main = document.createElement('div');
      main.id = 'main';

      body.appendChild(main);

      expect(app.utils.$('main')).toEqual(main);
    });
  });

  describe('.createDomElement', function() {
    var element;

    beforeEach(function(){
      element = app.utils.createDomElement('div', { id: 'testId', className: 'testClass' });
    });

    it('creates a DOM element of the given type', function() {
      expect(element.tagName).toEqual('DIV');
    });

    it('creates a DOM element with the given properties', function() {
      expect(element.id).toEqual('testId');
      expect(element.className).toEqual('testClass');
    });
  });

  describe('.throttle', function() {
    var calls = 5;
    var throttledFunction, throttleSpy;

    beforeEach(function() {
      throttleSpy = jasmine.createSpy('throttleSpy');
      throttledFunction = app.utils.throttle(throttleSpy);

      for (var i = 0; i < calls; i++) {
        throttledFunction();
      }
    });

    it('returns a function whose calls will be throttled according to requestAnimationFrame', function(done) {
      setTimeout(function() {
        expect(throttleSpy.calls.count()).toBeLessThan(calls);
        done();
      }, 500);
    });
  });
});
