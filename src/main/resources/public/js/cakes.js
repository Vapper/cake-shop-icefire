$(function () {
    const newCakeForm = function () {
        return $('#new-cake-form');
    };

    const newCakeModal = function () {
        return $('#new-cake-modal');
    };

    const cakesTableBody = function () {
        return $('#available-cakes tbody');
    };

    const loadCakes = function () {
        return $.get('/cakes/all');
    };

    const postCake = function (json) {
        return $.post({
            url: '/cakes/new',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(json)
        });
    };


    const deactivateCake = function (cakeId) {
        return $.post({
            url: '/cakes/' + cakeId + '/deactivate',
            contentType: 'application/json; charset=utf-8',
            data: '{}'
        });
    };


    const bindOrderButtonClicks = function () {
        $('.deactivate-btn').on('click', function (e) {
            e.stopPropagation();
            deactivateCake($(e.currentTarget).attr('data-cake-id'))
                .then(refreshCakes);
        });
    };


    const showCakes = function (cakes) {
        const cakeRowTemplate = '<tr>' +
            '<th scope="row">#{cakeId}</th>' +
            '<td>#{cakeName}</td>' +
            '<td>#{cakePrice} €</td>' +
            '<td>#{cakeAvailability}</td>' +
            '<td>' +
            '<button data-cake-id="#{cakeId}" type="button" class="deactivate-btn btn btn-danger #{deactivateBtnClass}">Deactivate</button>' +
            '</td></tr>';
        const cakeRows = $.map(cakes, function (cake) {
            return cakeRowTemplate
                .replace('#{cakeId}', cake.id)
                .replace('#{cakeId}', cake.id)
                .replace('#{cakeName}', cake.name)
                .replace('#{cakePrice}', cake.price)
                .replace('#{cakeAvailability}', cake.available)
                .replace('#{deactivateBtnClass}',!cake.available ? 'd-none' : '');
        });

        cakesTableBody().html(cakeRows);

        bindOrderButtonClicks();
    };

    const refreshCakes = function () {
        loadCakes().then(function (cakes) {
            showCakes(cakes);
        });
    };

    const hideNewCakeModal = function () {
        newCakeModal().modal('hide');
    };

    const clearNewCakeForm = function () {
        newCakeForm().trigger('reset');
    };

    $('#new-cake-cancel-btn').on('click', function () {
        hideNewCakeModal();
        clearNewCakeForm();
    });

    const validateNewCakeForm = function (newCakeJson) {
        var isValid = true;
        if (newCakeJson.name.trim() == '') {
            $('input#name').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#name').removeClass('is-invalid');
        }

        if (!/^\d{1,14}(\.\d{1,2})?$/.test(newCakeJson.price)) {
            $('input#price').addClass('is-invalid');
            isValid = false;
        } else {
            $('input#price').removeClass('is-invalid');
        }

        return isValid;
    };

    $('#new-cake-submit-btn').on('click', function () {
        const newCakeJson = formToJson(newCakeForm());
        const isValid = validateNewCakeForm(newCakeJson);
        if (isValid) {
            postCake(newCakeJson)
                .then(function () {
                    refreshCakes();
                    hideNewCakeModal();
                    clearNewCakeForm();
                });
        }
    });


    //when page is loaded
    refreshCakes();
});