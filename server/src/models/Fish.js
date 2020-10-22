module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        namefish: DataTypes.STRING,
        typefish: DataTypes.STRING,
        thumbnail: DataTypes.STRING,
        pictures: DataTypes.STRING,
        price: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Product
}