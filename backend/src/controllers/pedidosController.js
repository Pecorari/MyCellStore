const pedidosModel = require('../models/pedidosModel');

const createPedido = async (req, res) => {
    try {
        const { dataPedido, itens, dataPagamento } = req.body;

        const pedido = await pedidosModel.createPedido(dataPedido, itens, dataPagamento, req.usuario.id);

        return res.status(200).json(pedido);
    } catch (error) {
        console.log('Erro em createPedido:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
};

const getAllMyPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosModel.getAllMyPedidos(req.usuario.id);

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro em getAllMyPedidos:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const getUniquePedido = async (req, res) => {
    try {
        const { id } = req.params;

        const results = await pedidosModel.getUniquePedido(id, req.usuario.id);

        results.itens = results.itens.map(item => ({
            ...item,
            imagens: item.imagens ? item.imagens.split(',') : []
        }));

        return res.status(200).json(results);
    } catch (error) {
        console.error('Erro em getUniquePedido:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const cancelarPedido = async (req, res) => {
    try {
        const { id } = req.params;

        const pedido = await pedidosModel.cancelarPedido(id, req.usuario.id);

        return res.status(200).json(pedido);
    } catch (error) {
        console.log('Erro em cancelarPedido:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
};

const getAdminPedidos = async (req, res) => {
    try {
        const pedidos = await pedidosModel.getAdminPedidos();

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro em getAdminPedidos:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const getAdminPedidoById = async (req, res) => {
    try {
        const { id } = req.params;

        const pedidos = await pedidosModel.getAdminPedidoById(id);

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro em getAdminPedidoById:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const getAdminPedidoByUser = async (req, res) => {
    try {
        const { id } = req.params;

        const pedidos = await pedidosModel.getAdminPedidoByUser(id);

        return res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro em getAdminPedidoByUser:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' });
    }
};

const updateAdminPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { dataPedido, novosItens, novoPagamento } = req.body;

        const pedido = await pedidosModel.updateAdminPedido(id, dataPedido, novosItens, novoPagamento);

        return res.status(200).json(pedido);
    } catch (error) {
        console.log('Erro em updateAdminPedido:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
};

const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        await pedidosModel.deletePedido(id);

        return res.status(200).json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
        console.log('Erro no deletePedido:', error);
        return res.status(500).json({ error: 'Erro interno no servidor' })
    }
};


module.exports = {
    createPedido,
    getAllMyPedidos,
    getUniquePedido,
    cancelarPedido,
    getAdminPedidos,
    getAdminPedidoById,
    getAdminPedidoByUser,
    updateAdminPedido,
    deletePedido
};
