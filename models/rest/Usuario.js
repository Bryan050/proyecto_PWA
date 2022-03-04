module.exports = (sequelize, DataTypes) => {
    //sequelize.sync({ alter: true });
    const Usuario = sequelize.define("usuario",{
        usuario: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(100)
        },
        direccion: {
            type: DataTypes.STRING(100)
        },
        cedula: {
            type: DataTypes.CHAR(10)
        },
        rol: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        imagen: {
            type: DataTypes.STRING,
          }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Usuario.associate = (models)=>{
        Usuario.hasMany(models.blog);
    }

    return Usuario;
}