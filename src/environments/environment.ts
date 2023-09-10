export const environment = {
  production: false,
  application: {
    name: 'angular-ssr',
    version: 'Angular 16.2.4',
    bootstrap: 'Bootstrap 5.3.1',
    fontawesome: 'Font Awesome 6.4.2',
  },
  apiHost: 'https://api.withcodeexample.com',
  baseUrl: "http://localhost:4200",
  endPoint: "https://appwrite.withcodeexample.com/v1",
  projectId: "tech-news",
  database: {
      "tech_news" : "tech_news_db",
      collection: {
          "feeds": "feeds",
          "posts": "posts"
      }
  },
  buckets: {
      "images": "images"
  }
};