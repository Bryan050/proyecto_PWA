module.exports = (sequelize, DataType)=>{
    
    const Comentario = sequelize.define("comentario",{
        contenido: {
            type: DataType.STRING(1500),
            allowNull: false
        },
        fecha: {
            type: DataType.DATEONLY,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Comentario.associate = (models)=>{
        Comentario.hasMany(models.blog);
    }

    return Comentario;
}