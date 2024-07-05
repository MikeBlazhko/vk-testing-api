import { setSeederFactory } from 'typeorm-extension';

import { User } from '../../src/types/user/User';
import { UserStatus } from '../../src/types/user/UserStatus';

export default setSeederFactory(User, (faker) => {
  const result = new User();

  const data: Partial<User> = {
    vkId: faker.datatype.number(),
    name: faker.name.fullName(),
    avatarUrl: faker.image.avatar(),
    status: faker.helpers.objectValue(UserStatus),
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    isAdmin: faker.datatype.boolean(),
  };

  return Object.assign(result, data);
});
