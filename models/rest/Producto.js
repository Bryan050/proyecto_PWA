module.exports = (sequelize, DataType) => {
    //sequelize.sync({ alter: true });
    const Producto = sequelize.define("producto", {
        descripcion: {
            type: DataType.STRING(300),
            allowNull: false
        },
        precio: {
            type: DataType.DECIMAL(5,2),
            allowNull: false
        },
        imagen: {
            type: DataType.STRING,
            allowNull: false
        },
        link: {
            type: DataType.STRING(250),
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Producto.associate = (models)=>{
        Producto.belongsTo(models.categoria, {
            foreignkey: 'categoria_id'
        });

        //Producto.hasMany(models.blog);
    }

    return Producto;
}