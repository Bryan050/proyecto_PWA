module.exports = (sequelize, DataType) => {
    
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
        Categoria.hasMany(models.producto);
        Categoria.hasMany(models.blog); 
    }

    return Categoria;
}