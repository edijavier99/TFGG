module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservation", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      guests: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  
    return Reservation;
  };