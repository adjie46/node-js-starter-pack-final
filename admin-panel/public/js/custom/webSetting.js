$(document).ready(function () {
    $("#frmUpdateSettingWeb").on("submit", function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            e.preventDefault();

            var params;
            var formData = new FormData();
            params = $("#frmUpdateSettingWeb").serializeArray();

            $.each(params, function (i, val) {
                formData.append(val.name, val.value);
            });

            formData.append("favicon", $("input[type=file]")[0].files[0]);
            formData.append("logo", $("input[type=file]")[1].files[0]);

            Swal.fire({
                title: 'Anda Yakin?',
                text: "Ingin Menyimpan Data?",
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
                    return fetch(`/settings/web`, {
                            method: 'put',
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
    })
})