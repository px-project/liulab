/**
 * 订单控制器
 */
const _router = require('express').Router();
const orderModel = require('../../common/xmodel')('order');
const productModel = require('../../common/xmodel')('product');
const categoryModel = require('../../common/xmodel')('category');
const xres = require('../../common/xres');
const async = require('async');
const fs = require('fs');
const path = require('path');
const xfilter = require('../../common/xfilter');
const utils = require('../../common/utils');

const statusArr = ['pending', 'pended', 'failed', 'processing', 'success', 'cancel'];

module.exports = _router

    // 批量下载订单
    .get('/download', (req, res) => {
        let orders = req.query.order_id;

        if (typeof orders === 'string') orders = [orders];

        let queue = orders.map((order_id) => cb => orderModel.detail(order_id, {}, (result) => cb(null, result)));

        async.series(queue, (err, result) => {
            let excelData = result.map((order, order_index) => {

            });
        });
    })


    // 订单列表
    .get('/', (req, res) => {
        let {order_type = 'order'} = req.query;

        orderModel.list({ where: { order_type }, populateKeys: ['create_user', 'children_order'] }, (result) => {
            if (order_type === 'order') {

                result.forEach(order => {

                    // 各状态子订单统计
                    let total = order.total = {};
                    statusArr.forEach(status => {
                        total[status] = 0;
                    });

                    order.children_order.forEach(child_order => {
                        total[child_order.status]++;
                    });

                    order._doc.create_user = order.create_user.name || order.create_user.username;
                });
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'create_user', 'total', 'create_time', 'update_time')));

            } else if (order_type === 'child_order') {

                result.forEach(child_order => {
                    child_order._doc.create_user = child_order.create_user.name || child_order.create_user.username;
                });
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'create_user','status', 'product', 'create_time', 'update_time')));
            }
        });
    })


    // 订单详情
    .get('/:order_id', (req, res) => {
        let {order_id} = req.params;

        orderModel.list({ where: { order_id }, populateKeys: ['create_user', 'children_order'] }, (result) => {
            result[0]._doc.create_user = xfilter(result[0].create_user, '_id', 'name', 'username', 'phone');
            res.json(xres({ code: 0 }, xfilter(result[0], '_id', 'order_id', 'create_user', 'products', 'create_time', 'update_time')));
        });
    })


    // 创建订单
    .post('/', (req, res) => {
        let {order} = req.body;
        let now = new Date();
        let order_id = now.toISOString().replace(/[-T:Z\.]/g, '').substr(0, 14);

        // 转换子订单
        let childOrders = [];
        for (let category_id in order) {
            childOrders = childOrders.concat(order[category_id].map(childOrder => {
                let child = utils.deepCopy(childOrder);
                child.category_id = category_id;
                child.create_user = req.session.user_id;
                child.order_id = order_id;
                child.order_type = 'child_order';
                child.status = 'pending';
                child.product = childOrder;
                child.progress = [{ status: 'pending', time: now }];
                return child;
            }));
        }

        // 创建子订单
        let createChildOrderQueue = childOrders.map(child_order => cb => {
            orderModel.create(child_order, result => {
                cb(null, result._id);
            });
        });
        async.series(createChildOrderQueue, (err, result) => {

            // 创建订单
            let orderData = {
                create_user: req.session.user_id,
                order_id,
                children_order: result
            };

            orderModel.create(orderData, result => {
                res.json(xres({ code: 0 }, xfilter(result, '_id', 'order_id', 'create_time')));

                // 创建产品
                // 查询品类数据
                let categoryQueue = Object.keys(order).map(category_id => cb => categoryModel.detail(category_id, {}, result => cb(null, result)));
                async.series(categoryQueue, (err, categories) => {

                    // 转化为产品数据
                    let newProductDatas = [];
                    categories.forEach(category => {
                        newProductDatas = newProductDatas.concat(order[category._id].map(childOrder => {
                            let result = {
                                category: category._id,
                                name: childOrder.name,
                                code: childOrder.code,
                                unit_price: childOrder.unit_price,
                                attrs: {}
                            };
                            category.attrs.forEach(attr => result.attrs[attr.field] = childOrder[attr.field]);
                            result.hash = utils.hash(JSON.stringify(result.attrs));
                            return result;
                        }));
                    });

                    // 筛选重复产品
                    let hashs = {};
                    newProductDatas = newProductDatas.filter(product => !hashs[product.hash]);

                    // upsert产品数据
                    let productQueue = newProductDatas.map(product => cb => {
                        productModel.upsert({ category_id: product.category_id, hash: product.hash }, product, result => cb(null, result));
                    });

                    async.series(productQueue, (err, result) => { });
                });
            });
        });
    })


    // 修改订单
    .patch('/:order_id', (req, res) => {
        let {order_id} = req.params;
        let newOrderData = req.body;

        // 当前订单
        orderModel.detail(order_id, {}, (result) => {

        });
    })


    // 修改状态
    .patch('/:order_id/status', (req, res) => {
        let {order_id} = req.params;
        let {status, token} = req.body;

        let category_id = token.split('_')[1];
        let rowIndex = parseInt(token.split('_')[2]);

        orderModel.list({ order_id }, (orders) => {
            let order = orders[0];
            let currentProduct = order.products[category_id][rowIndex];
            let currentStatus = currentProduct.progress[currentProduct.progress.length - 1].status;

            let currentStatusIndex = statusArr.indexOf(currentStatus);
            let newStatusIndex = statusArr.indexOf(status);

            if (currentStatusIndex == 0 && (newStatusIndex == 1 || newStatusIndex == 2)) {
                // 审核
                genProgress(status);
            } else if (currentStatusIndex === 1 && newStatusIndex === 3) {
                // 订货
                genProgress(status);
            } else if (currentStatusIndex === 3 && newStatusIndex === 4) {
                // 到货
                genProgress(status);
            } else {
                res.json({ error: '当前状态错误' });
            }

            orderModel.update(order._id, { products: order.products }, (_result) => {

                // 重新获取create_user
                orderModel.detail(order._id, { populateKeys: ['create_user'] }, result => {
                    res.json(xres({ code: 0 }, result));
                });
            });

            function genProgress(status) {
                currentProduct.progress.push({
                    status,
                    time: new Date()
                });
            }
        });
    });



// 创建产品
function createProduct(user_id, category_id, data, cb) {
    let hash = utils.hash(JSON.stringify(data));
    productModel.list({ category_id, hash }, (products) => {
        if (!products.length) {
            productModel.create({ user_id, category_id, hash, data }, cb);
        } else {
            cb(false);
        }
    });
}

// 获取品类详情
function getCategoryDetail(category_id, cb) {
    categoryModel.detail(category_id, {}, cb);
}