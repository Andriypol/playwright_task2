import { faker } from '@faker-js/faker';

export class TestData {
    static generateUser() {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email({ firstName, lastName }).toLowerCase();
        
        return {
            username: faker.internet.displayName({ firstName, lastName }).toLowerCase().replace(/\s/g, '_'),
            password: faker.internet.password({
                length: 12,
                prefix: 'Test2!',
            }),
            firstName,
            lastName,
            email,
            fullName: `${firstName} ${lastName}`
        };
    };
}
