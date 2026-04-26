<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Loan extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'tenor',
        'status',
        'skor_kredit',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
