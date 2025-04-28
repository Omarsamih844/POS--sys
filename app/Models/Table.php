<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'number',
        'capacity',
        'status',
        'location'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'capacity' => 'integer',
    ];

    public function etage()
    {
        return $this->belongsTo(Etage::class, 'id_etage', 'id_etage');
    }

    public function statutTable()
    {
        return $this->belongsTo(StatutTable::class, 'id_statut_table', 'id_statut_table');
    }

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_table', 'id_table');
    }
}
