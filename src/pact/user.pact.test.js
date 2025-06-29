import { Pact } from '@pact-foundation/pact';
import path from 'path';
import fetch from 'node-fetch';

const mockProvider = new Pact({
    consumer: 'ReactFrontend',
    provider: 'UserService',
    port: 1234,
    log: path.resolve(process.cwd(), 'logs', 'pact.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    logLevel: 'info',
});

describe('Pact with User Service', () => {
    beforeAll(() => mockProvider.setup());
    afterAll(() => mockProvider.finalize());
    afterEach(() => mockProvider.verify());

    describe('when a call to get user details is made', () => {
        beforeEach(() => {
            return mockProvider.addInteraction({
                state: 'user exists',
                uponReceiving: 'a request for user details',
                withRequest: {
                    method: 'GET',
                    path: '/api/user/1',
                },
                willRespondWith: {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: { id: 1, age: "30" },
                },
            });
        });

        it('should receive the user details', async () => {
            const response = await fetch('http://localhost:1234/api/user/1');
            const data = await response.json();

            expect(response.status).toEqual(200);
            expect(data).toEqual({ id: 1, age: "30" });
        });
    });
});
