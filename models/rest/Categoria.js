module.exports = (sequelize, DataType) => {
    //sequelize.sync({ force: true });
    const Categoria = sequelize.define("categoria",{
        nombre: {
            type: DataType.STRING(100),
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    });

    Categoria.associate = (models)=>{
        //console.log(models);
        Categoria.hasMany(models.producto); //Una categoria tiene muchos productos
        Categoria.hasMany(models.blog);  //Una categoria pertenece a muchos blogs
    }

    return Categoria;
}