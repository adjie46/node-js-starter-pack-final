$(document).ready(function () {
    function copyToClipboard(text) {

        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Copying text command was ' + msg);
        } catch (err) {
            console.log('Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }

    $(document).on("click", "#copyApi", function () {
        apiKey = $(this).attr("data-api-key");
        var clipboardText = "";
        clipboardText = apiKey;
        copyToClipboard(clipboardText);
        Swal.fire({
            title: 'Success',
            html: `API Key Copied to Clipboard`,
            icon: 'success',
            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
            buttonsStyling: !1,
            showCloseButton: !0
        }).then((result) => {
            location.reload();
        });
    })

    $(document).on("click", "#generateNewKey", function () {
        id = $(this).attr("data-id");
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Ingin Membuat Ulang API Key?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
            cancelButtonClass: "btn btn-danger w-xs me-2 mt-2",
            confirmButtonText: "Yes",
            cancelButtonText: 'No, cancel!',
            buttonsStyling: !1,
            showCloseButton: !0,
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return fetch(`/settings/api/generate/${id}`, {
                        method: 'put',
                        headers: {
                            "X-CSRF-Token": $("input[name=_csrf]").val(),
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value.success) {
                Swal.fire("Success!", result.value.message, "success").then(
                    (result) => {
                        location.reload();
                    }
                );
            }
        })
    })

    $(document).on("click", "#enabledApi", function () {
        id = $(this).attr("data-id");
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Ingin Mengaktifkan Token Ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
            cancelButtonClass: "btn btn-danger w-xs me-2 mt-2",
            confirmButtonText: "Yes",
            cancelButtonText: 'No, cancel!',
            buttonsStyling: !1,
            showCloseButton: !0,
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return fetch(`/settings/api/enabled/${id}`, {
                        method: 'put',
                        headers: {
                            "X-CSRF-Token": $("input[name=_csrf]").val(),
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value.success) {
                Swal.fire("Success!", result.value.message, "success").then(
                    (result) => {
                        location.reload();
                    }
                );
            }
        })
    })

    $(document).on("click", "#disabledApi", function () {
        id = $(this).attr("data-id");
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Ingin Mengnonaktifkan Token Ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
            cancelButtonClass: "btn btn-danger w-xs me-2 mt-2",
            confirmButtonText: "Yes",
            cancelButtonText: 'No, cancel!',
            buttonsStyling: !1,
            showCloseButton: !0,
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return fetch(`/settings/api/disabled/${id}`, {
                        method: 'put',
                        headers: {
                            "X-CSRF-Token": $("input[name=_csrf]").val(),
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value.success) {
                Swal.fire("Success!", result.value.message, "success").then(
                    (result) => {
                        location.reload();
                    }
                );
            }
        })
    })

    $(document).on("click", "#deleteApi", function () {
        id = $(this).attr("data-id");
        Swal.fire({
            title: 'Anda Yakin?',
            text: "Ingin Menghapus Token Ini?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
            cancelButtonClass: "btn btn-danger w-xs me-2 mt-2",
            confirmButtonText: "Yes",
            cancelButtonText: 'No, cancel!',
            buttonsStyling: !1,
            showCloseButton: !0,
            allowOutsideClick: false,
            allowEscapeKey: false,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                return fetch(`/settings/api/delete/${id}`, {
                        method: 'delete',
                        headers: {
                            "X-CSRF-Token": $("input[name=_csrf]").val(),
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value.success) {
                Swal.fire("Success!", result.value.message, "success").then(
                    (result) => {
                        location.reload();
                    }
                );
            }
        })
    })


    $("#frmAddApiKey").on("submit", function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();

            var params;
            var formData = new FormData();
            params = $("#frmAddApiKey").serializeArray();

            $.each(params, function (i, val) {
                formData.append(val.name, val.value);
            });


            Swal.fire({
                title: 'Anda Yakin?',
                text: "Ingin Membuat API Key Baru?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
                cancelButtonClass: "btn btn-danger w-xs me-2 mt-2",
                confirmButtonText: "Yes",
                cancelButtonText: 'No, cancel!',
                buttonsStyling: !1,
                showCloseButton: !0,
                allowOutsideClick: false,
                allowEscapeKey: false,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    return fetch(`/settings/api`, {
                            method: 'post',
                            headers: {
                                "X-CSRF-Token": $("input[name=_csrf]").val(),
                            },
                            body: formData
                        })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(response.statusText)
                            }
                            return response.json()
                        })
                        .catch(error => {
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        })
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {

                if (result.value.success) {
                    Swal.fire("Success!", result.value.message, "success").then(
                        (result) => {
                            location.reload();
                        }
                    );
                } else {
                    Swal.fire("Error!", result.value.message, "error").then(
                        (result) => {
                            location.reload();
                        }
                    );
                }
            })

        }
        $(this).addClass("was-validated");
    })

})