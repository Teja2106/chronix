import { http, HttpResponse } from 'msw';

export const handler = [
    http.get('http://localhost:3000', () => {
        return HttpResponse.json({ id: '1', name: 'Red John' });
    })
];