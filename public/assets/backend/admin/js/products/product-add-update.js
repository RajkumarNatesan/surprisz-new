document.addEventListener("DOMContentLoaded", function () {
    generateSKUPlaceHolder();
    getProductTypeFunctionality();
    getUpdateDigitalVariationFunctionality();
    productColorSwitcherFunctionalityRender();
});

function productColorSwitcherFunctionalityRender() {
    if ($("#product-color-switcher").prop("checked")) {
         $("#color-wise-image-area").show();
        colorWiseImageFunctionality($("#colors-selector-input"));
    } else {
        $("#color-wise-image-area").hide();
    }

    $(".color-var-select").select2({
        templateResult: colorCodeSelect,
        templateSelection: colorCodeSelect,
        escapeMarkup: function (m) {
            return m;
        },
    });

    function colorCodeSelect(state) {
        let colorCode = state.element.value;
        if (!colorCode) return state.text;

        let colorPreviewSpan = document.createElement("span");
        colorPreviewSpan.classList.add("color-preview");
        colorPreviewSpan.style.backgroundColor = colorCode;
        return colorPreviewSpan.outerHTML + state.text;
    }

    if ($("#product-color-switcher").prop("checked")) {
        $(".color_image_column").removeClass("d-none");
        $("#additional_Image_Section .col-md-4").addClass("col-lg-2");
    } else {
        $(".color_image_column").addClass("d-none");
        $("#additional_Image_Section .col-md-4").removeClass("col-lg-2");
    }

    if ($('#product_type').val() === "physical") {
        $('.additional-image-column-section').addClass('col-md-12').removeClass('col-md-6').removeClass('col-md-8');
    } else {
        $('.additional-image-column-section').addClass('col-md-8').removeClass('col-md-6').removeClass('col-md-12');
    }
}

let pageLoadFirstTime = true;
function elementProductColorSwitcherByIDFunctionality(action = null) {
    if ($("#product-color-switcher").prop("checked")) {
        $(".color_image_column").removeClass("d-none");
        $("#color-wise-image-area").show();
        $("#additional_Image_Section .col-md-4").addClass("col-lg-2");
    } else {
        let colors = $("#colors-selector-input");
        let choiceAttributes = $("#product-choice-attributes");

        colors.val(null).trigger("change");
        if (pageLoadFirstTime === false && action === "reset") {
            choiceAttributes.val(null).trigger("change");
            pageLoadFirstTime = false;
        }

        $(".color_image_column").addClass("d-none");
        $("#color-wise-image-area").hide();
        $("#additional_Image_Section .col-md-4").removeClass("col-lg-2");
    }

    if ($('#product_type').val() === "physical") {
        $('.additional-image-column-section').addClass('col-md-12').removeClass('col-md-6').removeClass('col-md-8');
    } else {
        $('.additional-image-column-section').addClass('col-md-8').removeClass('col-md-6').removeClass('col-md-12');
    }

    if (!$('input[name="colors_active"]').is(':checked')) {
        $('#colors-selector-input').prop('disabled', true);
    } else {
        $('#colors-selector-input').prop('disabled', false);
    }
}

function updateProductQuantity() {
    let elementCurrentStock = $('input[name="current_stock"]');
    let totalQuantity = 0;
    let quantityElements = $('input[name^="qty_"]');
    for (let i = 0; i < quantityElements.length; i++) {
        totalQuantity += parseInt(quantityElements.eq(i).val());
    }
    if (quantityElements.length > 0) {
        elementCurrentStock.attr("readonly", true);
        elementCurrentStock.val(totalQuantity);
    } else {
        elementCurrentStock.attr("readonly", false);
    }
}

function getRequestFunctionality(getUrlPrefix, id, getElementType) {
    let message = $("#message-select-word").data("text");
    $("#sub-sub-category-select")
        .empty()
        .append(
            `<option value="null" selected disabled>---` +
            message +
            `---</option>`
        );

    $.get({
        url: getUrlPrefix,
        dataType: "json",
        beforeSend: function () {
            $("#loading").fadeIn();
        },
        success: function (data) {
            if (getElementType === "select") {
                $("#" + id)
                    .empty()
                    .append(data.select_tag);
                if (
                    data.sub_categories !== "" &&
                    id.toString() === "sub-category-select"
                ) {
                    let nextElement = $("#" + id).data("element-id");
                    $("#" + nextElement)
                        .empty()
                        .append(data.sub_categories);
                }
            }
        },
        complete: function () {
            $("#loading").fadeOut();
        },
    });
}

// $(".image-uploader__zip").on("change", function (event) {
//     const file = event.target.files[0];
//     const target = $(this)
//         .closest(".image-uploader")
//         .find(".image-uploader__title");
//     if (file) {
//         const reader = new FileReader();
//         reader.onload = function (e) {
//             target.text(file.name);
//         };
//         reader.readAsDataURL(file);
//         $(".zip-remove-btn").show();
//     } else {
//         target.text("Upload File");
//         $(".zip-remove-btn").hide();
//     }
// });
// $(".image-uploader .zip-remove-btn").on("click", function (event) {
//     $(this).closest(".image-uploader").find(".image-uploader__zip").val(null);
//     $(this)
//         .closest(".image-uploader")
//         .find(".image-uploader__title")
//         .text("Upload File");
//     $(this).hide();
// });

$(".image-uploader__zip").on("change", function (event) {
    const file = event.target.files[0];
    const wrapper = $(this).closest(".image-uploader");
    const target = wrapper.find(".image-uploader__title");
    const removeBtn = wrapper.find(".zip-remove-btn");
    const icon = wrapper.find(".upload-preview-icon");

    const allowedTypes = ["application/pdf", "audio/mpeg", "video/mp4"];

    if (file) {

        if (!allowedTypes.includes(file.type)) {
            toastMagic.error("Only PDF, MP3 and MP4 files are allowed");
            $(this).val(null);

            target.text("Upload File").addClass("text-info");
            icon.attr("src", wrapper.data("default-icon"));
            removeBtn.hide();
            return;
        }

        target.text(file.name).removeClass("text-info");

        let newIcon = wrapper.data("default-icon");

        if (file.type === "application/pdf") {
            newIcon = wrapper.data("pdf-icon");
        }
        if (file.type === "audio/mpeg") {
            newIcon = wrapper.data("mp3-icon");
        }
        if (file.type === "video/mp4") {
            newIcon = wrapper.data("mp4-icon");
        }

        icon.attr("src", newIcon);

        removeBtn.show();
    } else {
        target.text("Upload File").addClass("text-info");
        icon.attr("src", wrapper.data("default-icon"));
        removeBtn.hide();
    }
});

$(".image-uploader .zip-remove-btn").on("click", function () {
    const wrapper = $(this).closest(".image-uploader");

    wrapper.find(".image-uploader__zip").val(null);
    wrapper.find(".image-uploader__title")
        .text("Upload File")
        .addClass("text-info");

    wrapper.find(".upload-preview-icon")
        .attr("src", wrapper.data("default-icon"));

    $(this).hide();
});

let groupIndex = $(".addon-group-row").length;

$(document).on("click", ".add-addon-group-row", function () {
    let groupHtml = `
        <div class="card addon-group-row border mb-3">
            <div class="card-header d-flex justify-content-between align-items-center">
                <div class="col-md-10">
                    <label class="title-color font-weight-bold">${translate("group_name")}</label>
                    <input type="text" name="addon_group_name[${groupIndex}]" class="form-control" placeholder="${translate("ex:_Choose_Sauce")}">
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm remove-addon-group-row p-0">
                    <i class="fi-sr-trash lh-0 fs-6 p-2"></i>
                </button>
            </div>
            <div class="card-body">
                <div class="addon-item-section" data-item-count="1">
                    <div class="row g-2 addon-item-row border rounded p-2 mb-2">
                        <div class="col-md-7">
                            <label class="title-color">${translate("item_name")}</label>
                            <input type="text" name="addon_item_name[${groupIndex}][]" class="form-control" placeholder="${translate("ex:_Tomato_Sauce")}">
                        </div>
                        <div class="col-md-2">
                            <label class="title-color">${translate("price")}</label>
                            <input type="number" step="0.01" name="addon_item_price[${groupIndex}][]" class="form-control" value="0" min="0">
                        </div>
                        <div class="col-md-2">
                            <label class="title-color d-block text-center">${translate("is_active")}</label>
                            <label class="switcher d-flex justify-content-center">
                                <input type="checkbox" name="addon_item_active[${groupIndex}][0]" class="switcher_input" checked>
                                <span class="switcher_control"></span>
                            </label>
                        </div>
                        <div class="col-md-1 d-flex align-items-end">
                            <button type="button" class="btn btn-outline-danger btn-sm remove-addon-item-row w-100">
                                <i class="lh-0 fs-6 p-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-outline-primary btn-sm add-addon-item-row" data-index="${groupIndex}">
                    <i class="fi-rr-plus"></i> ${translate("add_item")}
                </button>
            </div>
        </div>`;
    $("#addon-group-section").append(groupHtml);
    groupIndex++;
});

$(document).on("click", ".add-addon-item-row", function () {
    let currentGroupIndex = $(this).data("index");
    let section = $(this).closest(".card-body").find(".addon-item-section");
    let currentItemIndex = section.data("item-count") || section.find(".addon-item-row").length;
    let itemHtml = `
        <div class="row g-2 addon-item-row border rounded p-2 mb-2">
            <div class="col-md-7">
                <label class="title-color">${translate("item_name")}</label>
                <input type="text" name="addon_item_name[${currentGroupIndex}][]" class="form-control" placeholder="${translate("ex:_Tomato_Sauce")}">
            </div>
            <div class="col-md-2">
                <label class="title-color">${translate("price")}</label>
                <input type="number" step="0.01" name="addon_item_price[${currentGroupIndex}][]" class="form-control" value="0" min="0">
            </div>
            <div class="col-md-2">
                <label class="title-color d-block text-center">${translate("is_active")}</label>
                <label class="switcher d-flex justify-content-center">
                    <input type="checkbox" name="addon_item_active[${currentGroupIndex}][${currentItemIndex}]" class="switcher_input" checked>
                    <span class="switcher_control"></span>
                </label>
            </div>
            <div class="col-md-1 d-flex align-items-end">
                <button type="button" class="btn btn-outline-danger btn-sm remove-addon-item-row w-100">
                    <i class="fi-sr-trash lh-0 fs-6 p-2"></i>
                </button>
            </div>
        </div>`;
    section.append(itemHtml);
    section.data("item-count", currentItemIndex + 1);
});

$(document).on("click", ".remove-addon-group-row", function () {
    $(this).closest(".addon-group-row").remove();
});

$(document).on("click", ".remove-addon-item-row", function () {
    $(this).closest(".addon-item-row").remove();
});

function translate(key) {
    // This is a simple fallback if the global translate function isn't available or if we want to handle unique keys.
    // In this project, many keys are handled via data attributes or global JS translation objects if available.
    return key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}
