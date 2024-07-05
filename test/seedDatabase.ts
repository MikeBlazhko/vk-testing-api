import { runSeeders } from 'typeorm-extension';

import { dataSource } from './dataSource';

async function seedDatabase() {
  await dataSource.initialize();

  await runSeeders(dataSource, {
    factories: ['test/factories/*{.ts,.js}'],
    seeds: ['test/seeders/UsersSeeder.ts'],
  });
}

seedDatabase()
  .then(() => {
    console.log('Database seeded');
    process.exit(1);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
