const { DataTypes } = require("sequelize");
const { sequelize } = require("sequelize");

module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define("User",{
        fname:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        lname:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },

    })


    return User
}

