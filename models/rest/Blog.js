module.exports = (sequelize, DataType) => {
    //sequelize.sync({ force: true });
    const Blog = sequelize.define("blog", {
        autor: {
            type: DataType.STRING(50),
            allowNull: false
        },
        titulo: {
            type: DataType.STRING(20),
            allowNull: false
        },
        contenido: {
            type: DataType.STRING(3000)
        },
        fecha_publicacion: {
            type: DataType.DATEONLY,
            allowNull: false
        },
        estado: {
            type: DataType.STRING(10),
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Blog.associate = (models)=>{
        /*Blog.belongsTo(models.producto, {
            foreignkey: {
                name: 'producto_id',
                allowNull: false
            }
        });*/
        Blog.hasMany(models.comentario); //Un blog tiene muchos comentarios

        Blog.belongsTo(models.categoria, { // Un blog pertencece a una categoria
            foreignkey: 'categoria_id'
        });
        /*Blog.belongsTo(models.comentario, {
            foreignkey: 'comentario_id'
        });*/
        Blog.belongsTo(models.usuario, { //Un blog pertenece a un usuario
            foreignkey: 'usuario_id'
        });
    }

    return Blog;
}