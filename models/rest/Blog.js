module.exports = (sequelize, DataType) => {
    //sequelize.sync({ alter: true });
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
            type: DataType.STRING(30000)
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
        Blog.belongsTo(models.producto, {
            foreignkey: {
                name: 'producto_id',
                allowNull: false
            }
        });
        Blog.belongsTo(models.categoria, {
            foreignkey: 'categoria_id'
        });
        Blog.belongsTo(models.comentario, {
            foreignkey: 'comentario_id'
        });
        Blog.belongsTo(models.usuario, {
            foreignkey: 'usuario_id'
        });
    }

    return Blog;
}