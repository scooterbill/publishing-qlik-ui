export class App {
    configureRouter (config, router) {
      console.log('configuring router');
    this.router = router;
    config.title = "Home";
    config.map([
      {route: '', name: 'safety', moduleId: 'safety/safety', nav: true, title: 'Safety'}
    ]);
  }
}