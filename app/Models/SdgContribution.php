<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SdgContribution extends Model
{
    protected $fillable = [
        'loan_id',
        'user_id',
        'target_sdg',
        'amount',
        'description'
    ];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
