<div class="addons_wrapper mt-3">
    <div class="outline-wrapper">
        <div class="card rest-part bg-animate">
            <div class="card-header d-flex justify-content-between align-items-center border-0 pb-0">
                <div>
                    <h2 class="mb-1">{{ translate('Optional_Addons') }}</h2>
                    <p class="fs-12 mb-0">
                        {{ translate('Add_extra_options_or_features_that_customers_can_select_along_with_the_main_product.') }}
                    </p>
                </div>
                <button type="button" class="btn btn-primary btn-sm add-addon-group-row">
                    <i class="fi-rr-plus"></i> {{ translate('add_group') }}
                </button>
            </div>
            <div class="card-body">
                <div class="bg-section rounded-10 p-12 p-sm-20">
                    <div id="addon-group-section">
                        @foreach($product->addOnGroups as $gIndex => $group)
                            <div class="card addon-group-row border mb-3">
                                <div class="card-header d-flex justify-content-between align-items-center">
                                    <div class="col-md-10">
                                        <label class="title-color font-weight-bold">{{ translate('group_name') }}</label>
                                        <input type="text" name="addon_group_name[{{ $gIndex }}]" class="form-control" value="{{ $group->name }}" placeholder="{{ translate('ex:_Choose_Sauce') }}">
                                    </div>
                                    <button type="button" class="btn btn-outline-danger btn-sm remove-addon-group-row p-0">
                                        <i class="fi-sr-trash lh-0 fs-6 p-2"></i>
                                    </button>
                                </div>
                                <div class="card-body">
                                    <div class="addon-item-section" data-item-count="{{ $group->items->count() }}">
                                        @foreach($group->items as $iKey => $item)
                                            <div class="row g-2 addon-item-row border rounded p-2 mb-2">
                                                <div class="col-md-7">
                                                    <label class="title-color">{{ translate('item_name') }}</label>
                                                    <input type="text" name="addon_item_name[{{ $gIndex }}][]" class="form-control" value="{{ $item->name }}" placeholder="{{ translate('ex:_Tomato_Sauce') }}">
                                                </div>
                                                <div class="col-md-2">
                                                    <label class="title-color">{{ translate('price') }}</label>
                                                    <input type="number" step="0.01" name="addon_item_price[{{ $gIndex }}][]" class="form-control" value="{{ $item->price }}" min="0">
                                                </div>
                                                <div class="col-md-2">
                                                    <label class="title-color d-block text-center">{{ translate('is_active') }}</label>
                                                    <label class="switcher d-flex justify-content-center">
                                                        <input type="checkbox" name="addon_item_active[{{ $gIndex }}][{{ $iKey }}]" class="switcher_input" {{ $item->is_active ? 'checked' : '' }}>
                                                        <span class="switcher_control"></span>
                                                    </label>
                                                </div>
                                                <div class="col-md-1 d-flex align-items-end">
                                                    <button type="button" class="btn btn-outline-danger btn-sm remove-addon-item-row w-100">
                                                        <i class="fi-sr-trash lh-0 fs-6 p-2"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                    <button type="button" class="btn btn-outline-primary btn-sm add-addon-item-row" data-index="{{ $gIndex }}">
                                        <i class="fi-rr-plus"></i> {{ translate('add_item') }}
                                    </button>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
