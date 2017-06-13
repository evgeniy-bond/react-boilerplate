// The top-level (parent) route
export default {

  path: '/',

  children: [
    require('./home').default,
    require('./vacancies').default,
    require('./notFound').default,
  ],

  async action({ next }) {
    // Execute each child route until one of them return the result
    const route = await next();

    // Provide default values for title, description etc.
    route.title = `${route.title || 'Страница не найдена'}`;
    route.description = route.description || 'Страница не найдена';

    return route;
  },
};
