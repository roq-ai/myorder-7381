const mapping: Record<string, string> = {
  companies: 'company',
  orders: 'order',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
