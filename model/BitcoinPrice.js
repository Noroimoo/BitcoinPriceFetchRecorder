const { Sequelize, Model, DataTypes } = require('sequelize');

// Настройка подключения к бд. Нужно менять логин и пароль в зависимости от БД настроек и пользователя.
// postgres://[postgres:1001]<----- Пользователь:Пароль 
const sequelize = new Sequelize(process.env.DATABASE_URL);

class BitcoinPrice extends Model {}
BitcoinPrice.init(
  {
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "bitcoin_prices",
    timestamps: false,
  }
);
BitcoinPrice.sync();

module.exports = BitcoinPrice;
