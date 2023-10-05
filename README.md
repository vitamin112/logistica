# 1.Running Migrations

```
npx sequelize-cli db:migrate
```

# 2.Config to connect DB

```
{
  "development": {
    "username": "ejbqqdes_nodejs",
    "password": "12345678",
    "database": "ejbqqdes_nodejs",
    "host": "103.97.126.24",
    "dialect": "mysql",
    "logging": false,
    "charset": "utf8",
    "collate": "utf8mb4_unicode_ci",
    "define": {
      "freezeTableName": true
    }
  },
  "test": {
    "username": "ejbqqdes_nodejs",
    "password": "12345678",
    "database": "ejbqqdes_nodejs",
    "host": "103.97.126.24",
    "dialect": "mysql"
  },
  "production": {
    "username": "ejbqqdes_nodejs",
    "password": "12345678",
    "database": "ejbqqdes_nodejs",
    "host": "103.97.126.24",
    "dialect": "mysql"
  }
}


```
