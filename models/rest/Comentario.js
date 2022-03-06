module.exports = (sequelize, DataType)=>{
    //sequelize.sync({ alter: true });
    const Comentario = sequelize.define("comentario",{
        autor: {
            type: DataType.STRING(50),
            allowNull: false
        },
        email: {
            type: DataType.STRING(50),
            allowNull: false
        },
        contenido: {
            type: DataType.STRING(1500),
            allowNull: false
        },
        fecha: {
            type: DataType.DATEONLY,
            allowNull: false
        },
        respuesta: {
            type: DataType.STRING,
        }
        
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Comentario.associate = (models)=>{
        //Comentario.hasMany(models.blog);
        Comentario.belongsTo(models.blog,{ // Un comentario pertenece a un blog
            foreignkey: {
                name: 'blog_id',
                allowNull: false
            }
        });
    }

    return Comentario;
}