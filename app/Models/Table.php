<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;

    // Specify the name of the table
    protected $table = 'tables';

    // Define the primary key
    protected $primaryKey = 'id_table';

    // Indicate if the primary key is auto-incrementing
    public $incrementing = true;

    // Specify the attributes that are mass assignable (fillable)
    protected $fillable = [
        'numero_table',
        'coordonnee_x',
        'coordonnee_y',
        'id_statut_table',
        'id_etage'
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
