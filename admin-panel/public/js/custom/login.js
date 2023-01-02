$(document).ready(function () {

    $("#btnSubmit").html('<button id="btnLogin" class="btn btn-success w-100" type="submit">SignIn</button>');
    $("#frmLogin").on("submit", function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();

            var formData = new FormData();
            params = $("#frmLogin").serializeArray();

            $.each(params, function (i, val) {
                formData.append(val.name, val.value);
            });

            $.ajax({
                type: "post",
                headers: {
                    "X-CSRF-Token": $("input[name=_csrf]").val(),
                },
                url: "login",
                data: formData,
                dataType: "json",
                contentType: false,
                processData: false,
                beforeSend: function () {
                    $("#btnLogin").hide();
                    $("#btnSubmit").html(`<button id="btnLoading" type="button"
                                                class="btn w-100 disabled btn-success btn-load">
                                                <span class="d-flex align-items-center">
                                                    <span class="spinner-border flex-shrink-0" role="status">
                                                        <span class="visually-hidden">Loading...</span>
                                                    </span>
                                                    <span class="flex-grow-1 ms-2">
                                                        Loading...
                                                    </span>
                                                </span>
                                            </button>`);
                    $("#frmLogin input").prop("disabled", true);
                },
                success: function (response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berhasil',
                            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
                            buttonsStyling: !1,
                            showCloseButton: !0,
                            html: `${response.message}`,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Uups..',
                            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
                            buttonsStyling: !1,
                            showCloseButton: !0,
                            html: `${response.message}`,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            location.reload();
                        });
                    }
                },
                error: function (xhr, status, errorThrown) {
                    if (xhr.statusText == "Unauthorized") {

                        Swal.fire({
                            icon: 'error',
                            title: `Oops... Error: ${xhr.responseJSON.code}`,
                            html: `${xhr.responseJSON.message}`,
                            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
                            buttonsStyling: !1,
                            showCloseButton: !0,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            location.reload();
                        });

                    } else if (xhr.statusText == "Forbidden") {
                        location.replace("/maintenance");
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: `Oops... Error: ${xhr.responseJSON.code}`,
                            html: `${xhr.responseJSON.message}`,
                            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
                            buttonsStyling: !1,
                            showCloseButton: !0,
                            allowOutsideClick: false,
                            allowEscapeKey: false,
                        }).then((result) => {
                            location.reload();
                        });
                    }
                },
            });
        }
        $(this).addClass("was-validated");
    })
    $('.toast').on('hidden.bs.toast', function () {
        location.reload();
    })
})