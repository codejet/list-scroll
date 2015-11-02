describe('ListScroll', function() {
  var WINDOW_HEIGHT = 500;
  var ITEM_HEIGHT = 96;
  var NUMBER_OF_VISIBLE_ITEMS = Math.ceil(WINDOW_HEIGHT / ITEM_HEIGHT);

  var data = [{"id":0,"name":"Lina Lawson","image":"http://placehold.it/75?text=0","city":"Harrodsburg"},{"id":1,"name":"Patrick Lowery","image":"http://placehold.it/75?text=1","city":"Bawcomville"},{"id":2,"name":"Rhoda Ford","image":"http://placehold.it/75?text=2","city":"Flintville"},{"id":3,"name":"Mccullough Rodriguez","image":"http://placehold.it/75?text=3","city":"Nord"},{"id":4,"name":"Antoinette Wilkerson","image":"http://placehold.it/75?text=4","city":"Echo"},{"id":5,"name":"Raquel Gould","image":"http://placehold.it/75?text=5","city":"Sattley"},{"id":6,"name":"Stacey Davenport","image":"http://placehold.it/75?text=6","city":"Bancroft"},{"id":7,"name":"Bryant Long","image":"http://placehold.it/75?text=7","city":"Bannock"},{"id":8,"name":"Cecilia Cantu","image":"http://placehold.it/75?text=8","city":"Dundee"},{"id":9,"name":"Haynes Boyer","image":"http://placehold.it/75?text=9","city":"Sharon"},{"id":10,"name":"Lelia Grant","image":"http://placehold.it/75?text=10","city":"Rossmore"}];

  beforeEach(function(){
    var body = document.getElementsByTagName('body')[0];
    var main = document.createElement('div');
    main.id = 'main';
    window.innerHeight = WINDOW_HEIGHT;

    body.appendChild(main);
    window.scrollBy(0, -WINDOW_HEIGHT);
    app.listScroll.init({ data: data });
  });

  it('initially renders the number of elements to fill the viewport', function() {
    var visbleItems = document.querySelectorAll('.user');

    expect(visbleItems.length).toEqual(NUMBER_OF_VISIBLE_ITEMS);
  });

  describe('when the user scrolls down', function() {
    beforeEach(function(){
      window.scrollBy(0, 289);
    });

    it('only renders the number of elements to fill the viewport', function() {
      var visbleItems = document.querySelectorAll('.user');

      expect(visbleItems.length).toEqual(NUMBER_OF_VISIBLE_ITEMS);
    });

    it('renders the correct items for the given page offset', function(done) {
      var main = document.getElementById('main');

      setTimeout(function() {
        expect(main.firstChild.id).toEqual('3');
        done();
      }, 250);
    });
  });

  describe('when the user scrolls up', function() {
    beforeEach(function(){
      window.scrollBy(0, 289);
      window.scrollBy(0, -289);
    });

    it('only renders the number of elements to fill the viewport', function(done) {
      var visbleItems = document.querySelectorAll('.user');

      setTimeout(function() {
        expect(visbleItems.length).toEqual(6);
        done();
      }, 250);
    });

    it('renders the correct items for the given page offset', function(done) {
      var main = document.getElementById('main');

      setTimeout(function() {
        expect(main.firstChild.id).toEqual('0');
        done();
      }, 250);
    });
  });
});
