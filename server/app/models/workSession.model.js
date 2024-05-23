module.exports = (sequelize, Sequelize) => {
    const WorkSession = sequelize.define("workSession", {
      clockInTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      clockOutTime: {
        type: Sequelize.DATE,
        allowNull: true
      },
      totalTime: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      }
    });
  
    return WorkSession;
  };