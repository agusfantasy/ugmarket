'use strict'

const db = require('../connect');
const Sequelize = require('sequelize');
const product = require('./product')

class Category {
    constructor() {
        this.tableName = 'category';
        this.schema = db.define('category', {
            cat_id: {type: Sequelize.INTEGER(11).UNSIGNED, primaryKey: true, autoIncrement: true},
            cat_slug: {type: Sequelize.STRING, allowNull: false},
            cat_name: {type: Sequelize.STRING, allowNull: false},
            cat_parent_id: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0},
            cat_parent_rank: {type: Sequelize.INTEGER(11).UNSIGNED, allowNull: false, defaultValue: 0},
            cat_image: {type: Sequelize.STRING, allowNull: true},
            cat_icon: {type: Sequelize.STRING, allowNull: true},
  
            cat_is_visible: {type: Sequelize.TINYINT(1), defaultValue: 0},
            cat_is_deleted: {type: Sequelize.TINYINT(1), defaultValue: 0},
  
            cat_created_at: {type: Sequelize.DATE},
            cat_updated_at: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
        }, {
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            tableName: this.tableName
        });

        //this.schema.sync();

        //this.schema.belongsTo(categoryModel.schema, {foreignKey: 'prod_cat_id', targetKey: 'cat_id', as: 'category'})
    }

    find(query, options) {
        return new Promise((resolve, reject) => {
            this.schema.findAndCountAll({
                where: query, 
                //order: options.sort
            }).then(result => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    findOne(query) {
        return new Promise((resolve, reject) => {
            this.schema.findOne({
                where: query, 
            }).then(result => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    create(payload) {
        return new Promise((resolve, reject) => {
            this.schema.create(payload).then(result => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }

    update(query, payload) {
        return new Promise((resolve, reject) => {
            this.schema.update(query, payload).then(result => {
                resolve(result);
            }, (err) => {
                reject(err);
            });
        });
    }
}

module.exports = new Category();
