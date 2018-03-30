$(function () {
    const ordersTableBody = function () {
        return $('#all-orders tbody');
    };

    const loadOrders = function () {
        return $.get('/orders/all');
    };

    const findOrder = function (orderId) {
        return window.orders.find(function (order) {
            return order.id == orderId;
        });
    };

    const refreshOrders = function () {
        loadOrders()
            .then(function (orders) {
                orders.sort(function (o1, o2) {
                    return o1.id - o2.id;
                });
                window.orders = orders;
                showOrders(orders);

            });
    };

    const showOrderDetailsModal = function (orderId) {
        const order = findOrder(orderId);

        $('#order-details-modal .order-id').text(order.id);

        const cakeRowTemplate = '<tr><td>#{cakeName}</td><td>#{amount}</td></tr>';
        const cakeRows = $.map(order.orderedCakes, function (orderedCake) {
            return cakeRowTemplate
                .replace('#{cakeName}', orderedCake.cake.name)
                .replace('#{amount}', orderedCake.amount)
        });

        $('#order-details-modal tbody').html(cakeRows);
        $('#order-details-modal').modal();
    };

    const cancelOrder = function (orderId) {
        return $.post({
            url: '/orders/' + orderId + '/cancel',
            contentType: 'application/json; charset=utf-8',
            data: '{}'
        });
    };

    const readyOrder = function (orderId) {
        return $.post({
            url: '/orders/' + orderId + '/ready',
            contentType: 'application/json; charset=utf-8',
            data: '{}'
        });
    };

    const deliverOrder = function (orderId) {
        return $.post({
            url: '/orders/' + orderId + '/deliver',
            contentType: 'application/json; charset=utf-8',
            data: '{}'
        });
    };

    const bindOrderButtonClicks = function () {
        $('#all-orders tbody tr').on('click', function (e) {
            e.stopPropagation();
            showOrderDetailsModal($(e.currentTarget).attr('data-order-id'));
        });

        $('.cancel-btn').on('click', function (e) {
            e.stopPropagation();
            cancelOrder($(e.currentTarget).attr('data-order-id'))
                .then(refreshOrders);
        });

        $('.ready-btn').on('click', function (e) {
            e.stopPropagation();
            readyOrder($(e.currentTarget).attr('data-order-id'))
                .then(refreshOrders);
        });

        $('.delivered-btn').on('click', function (e) {
            e.stopPropagation();
            deliverOrder($(e.currentTarget).attr('data-order-id'))
                .then(refreshOrders);
        })
    };

    const showOrders = function (orders) {
        const orderRowTemplate = '<tr data-order-id="#{orderId}" >' +
            '<th scope="row">#{orderId}</th>' +
            '<td>#{customerName}</td>' +
            '<td>#{price} €</td>' +
            '<td>#{statusCode}</td>' +
            '<td>' +
            '<button data-order-id="#{orderId}" type="button" class="cancel-btn btn btn-danger #{cancelBtnClass}">Tühista</button> ' +
            '<button data-order-id="#{orderId}" type="button" class="ready-btn btn btn-light #{readyBtnClass}">Valmis</button> ' +
            '<button data-order-id="#{orderId}" type="button" class="delivered-btn btn btn-light #{deliverBtnClass}">Kätte antud</button>' +
            '</td></tr>';
        const orderRows = $.map(orders, function (order) {
            return orderRowTemplate
                .replace('#{orderId}', order.id)
                .replace('#{orderId}', order.id)
                .replace('#{orderId}', order.id)
                .replace('#{orderId}', order.id)
                .replace('#{orderId}', order.id)
                .replace('#{customerName}', order.customerName)
                .replace('#{price}', order.price)
                .replace('#{statusCode}', order.statusCode)
                .replace('#{cancelBtnClass}', order.statusCode !== 'SUBMITTED' && order.statusCode !== 'READY' ? 'd-none' : '')
                .replace('#{readyBtnClass}', order.statusCode !== 'SUBMITTED' ? 'd-none' : '')
                .replace('#{deliverBtnClass}', order.statusCode !== 'READY' ? 'd-none' : '');
        });

        ordersTableBody().html(orderRows);

        bindOrderButtonClicks();
    };

    //when page is loaded
    refreshOrders();
});