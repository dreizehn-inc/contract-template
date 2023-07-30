import { DefaultNamingStrategy, Table, NamingStrategyInterface, DataSourceOptions, DataSource } from 'typeorm'

import { environment } from './environment'

class CustomNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {
  foreignKeyName(tableOrName: Table | string, columnNames: string[], referencedTablePath?: string): string {
    tableOrName = typeof tableOrName === 'string' ? tableOrName : tableOrName.name
    const name = columnNames.reduce((name, column) => `${name}_${column}`, `${tableOrName}_${referencedTablePath}`)
    return `fk_${name}`
  }
}

export const typeormDatasourceOptions = ((): DataSourceOptions => {
  switch (environment.NODE_ENV) {
    case 'development':
      return {
        type: 'postgres',
        host: environment.DB_HOST,
        port: environment.DB_PORT,
        username: environment.DB_USER,
        password: environment.DB_PASSWORD,
        database: 'maindb',
        migrations: ['./**/migration/**/*.ts'],
        entities: ['./**/*.entity{.ts,.js}'],
        logging: true,
        namingStrategy: new CustomNamingStrategy()
      }
    case 'production':
      return {
        type: 'postgres',
        host: environment.DB_HOST,
        port: environment.DB_PORT,
        username: environment.DB_USER,
        password: environment.DB_PASSWORD,
        database: 'maindb',
        migrations: ['./dist/migration/*.js'],
        entities: ['./dist/**/*.entity.js'],
        logging: false,
        namingStrategy: new CustomNamingStrategy()
      }
    default:
      console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
      throw new Error('no match case')
  }
})()

export const dataSource = new DataSource(typeormDatasourceOptions)
