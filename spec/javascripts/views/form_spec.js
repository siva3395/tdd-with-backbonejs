describe('TodoList.Views.Form', function() {

  it('should be defined', function() {
    expect(TodoList.Views.Form).toBeDefined();
  });

  var view, $formFixture, collection;

  beforeEach(function() {
    loadFixtures('form-fixture.html');
    $formFixture = $('#form-fixture');
    collection = new TodoList.Collections.Tasks();

    view = new TodoList.Views.Form({ el: $formFixture, collection: collection });
  });

  describe('events', function() {
    it('should handle click event on submit button', function() {
      expect(view.events['click submit.button']).toEqual('submit');
    });
  });

  describe('#getAttributes', function () {
    it('should be defined', function() {
      expect(view.getAttributes).toBeDefined();
    });

    it('should return valid attributes', function () {
      $formFixture.find('input').val('Do something');
      var attributes = view.getAttributes();

      expect(attributes).toBeDefined();
      expect(attributes.name).toBeDefined();
      expect(attributes.name).toEqual('Do something');
    });
  });

  describe('#submit', function() {
    it('should be defined', function() {
      expect(view.submit).toBeDefined();
    });

    var server;
    beforeEach(function () {
      server = sinon.fakeServer.create();
    });

    afterEach(function() {
      server.restore();
    });

    it('should prevent default action', function() {
      var event = { preventDefault: function() {} };
      var mock = sinon.mock(event).expects('preventDefault').once();
      view.submit(event);
      mock.verify();
    });

    describe('sent request', function () {
      it('should send valid attributes to the server', function () {
        $formFixture.find('input').val('New task name');
        view.submit();

        var request = server.requests[0];
        var attributes = JSON.parse(request.requestBody);

        expect(attributes.task).toBeDefined();
        expect(attributes.task.name).toBeDefined();
        expect(attributes.task.name).toEqual('New task name');
      });
    });

    describe('on success', function () {
      it('should clear the form input', function () {

      });

      it('should reload the page', function () {

      });
    });

    describe('on error', function () {
      it('should display validation messages', function () {

      });

      it('should not clear the form input', function () {

      });
    });
  });

});