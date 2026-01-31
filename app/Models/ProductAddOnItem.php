<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductAddOnItem extends Model
{
    protected $fillable = ['product_add_on_group_id', 'name', 'price', 'is_active'];

    public function group(): BelongsTo
    {
        return $this->belongsTo(ProductAddOnGroup::class, 'product_add_on_group_id');
    }
}
