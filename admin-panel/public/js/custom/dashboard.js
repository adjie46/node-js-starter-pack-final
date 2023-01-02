$(document).ready(function () {

    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }

    const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));

    function isEmpty(obj) {
        for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
        }

        return true;
    }


    setTimeout(() => {
        $.ajax({
            type: "get",
            url: "menu",
            headers: {
                "X-CSRF-Token": $("input[name=_csrf]").val(),
            },
            dataType: "json",
            beforeSend: function (response) {

            },
            success: function (response) {
                if (response.success) {

                    var currentUrl = window.location.search.split("=");


                    response.menu.forEach(async element => {

                        if (element.menus.type == 0) {
                            $("#nav_item").append(`<li class="menu-title"><span data-key="t-menu">${element.menus.menuName}</span></li>`);
                        } else if (element.menus.type == 1) {

                            var active = "";
                            if (currentUrl[1] == element.menus.id) {
                                active = "active"
                            }

                            $("#nav_item").append(`
                            <li class="nav-item">
                                <a class="nav-link menu-link ${active}" href="?pages=${element.menus.id}">
                                    <i data-feather="home" class="icon-dual"></i> <span data-key="t-widgets">${element.menus.menuName}</span>
                                </a>
                            </li>`);
                            feather.replace();
                        } else if (element.menus.type == 2) {
                            var show = "";
                            if (!isEmpty(element.menus.subMenuItem)) {
                                element.menus.subMenuItem.forEach(element => {
                                    if (currentUrl[1] == element.id) {
                                        show = "show"
                                    }
                                });
                            }

                            $("#nav_item").append(`
                            <li class="nav-item">
                            <a class="nav-link menu-link" href="#${element.menus.menuIcon}" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="${element.menus.id}">
                                <i data-feather="${element.menus.menuIcon}" class="icon-dual"></i> <span data-key="t-tables">${element.menus.menuName}</span>
                            </a>
                            
                            <div class="collapse menu-dropdown ${show}" id="${element.menus.menuIcon}">
                                <ul class="nav nav-sm flex-column">
                                    <div id="submenu"></div>
                                </ul>
                            </div>
                            </li>`);

                            await asyncForEach(element.menus.subMenuItem, async (element2, index) => {
                                var active = "";
                                if (currentUrl[1] == element2.id) {
                                    active = "active"
                                }
                                await waitFor(1);
                                subMenu = `<li class="nav-item">
                                             <a href="?pages=${element2.id}" class="nav-link ${active}" data-key="${element2.id}">${element2.menuName}</a>
                                         </li>`
                                $("#submenu").append(subMenu)
                            })

                            feather.replace();
                        }
                    });
                    $("#animation_loading").hide();
                    $("#animation_content").hide();
                    $('#myContent').css('display', 'block');
                    if ($("#scroll-horizontal").length) {
                        $('#scroll-horizontal').DataTable({
                            scrollX: true,
                        });
                    }

                }
            }
        });
    }, 1000);
})