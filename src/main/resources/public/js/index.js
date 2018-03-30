$(function () {
    const newOrderForm = function () {
        return $('#new-order-form');
    };

    const loadCakes = function () {
        return $.get('/cakes/available');
    };

    const clearNewCakeForm = function () {
        newOrderForm().trigger('reset');
    };

    const cakeDropdown = function () {
        return $('#cake-select');
    };

    const showCakes = function (cakes) {
        const cakeRowTemplate = '<option value="#{cakeId}">#{cakeName}</option>';
        const cakeRows = $.map(cakes, function (cake) {
            return cakeRowTemplate
                .replace('#{cakeId}', cake.id)
                .replace('#{cakeName}', cake.name);
        });

        cakeDropdown().html(cakeRows);
    };

    const postOrder = function (json) {
        return $.post({
            url: '/orders/new',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json)
        });
    };


    const validateNewCakeForm = function (newOrderJson) {
        var isValid = true;
        if (newOrderJson.customerName.includes(" ")) {
            $('input#customerName').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#customerName').removeClass('is-invalid');
        }

        if (!/^[0-9]+$/.test(newOrderJson.amount)) {
            $('input#amount').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#amount').removeClass('is-invalid');
        }

        return isValid;
    };


    $('#new-order-btn').on('click', function (e) {
        e.preventDefault();
        const newOrderJson = formToJson(newOrderForm());
        const isValid = validateNewCakeForm(newOrderJson);

        if (isValid) {
            postOrder(newOrderJson).then(function () {
                clearNewCakeForm();
            });
        };
    });

    //when page is loaded
    loadCakes().then(function (cakes) {
        showCakes(cakes);
    });
});