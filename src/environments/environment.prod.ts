export const environment = {
  production: true,
  application:
  {
    name: 'Tech-News',
    version: 'Angular 16.2.4',
    bootstrap: 'Bootstrap 5.3.1',
    fontawesome: 'Font Awesome 6.4.2',
  },
  apiHost: 'https://api.withcodeexample.com/',
  baseUrl: "https://tchnws.netlify.app",
  endPoint: "https://appwrite.withcodeexample.com/v1",
  projectId: "tech-news",
  database: {
      "tech_news" : "tech_news_db",
      collection: {
          "feeds": "feeds",
          "posts": "posts",
          "tags": "tags",
          "likes": "likes"
      }
  },
  buckets: {
      "images": "images"
  }
};