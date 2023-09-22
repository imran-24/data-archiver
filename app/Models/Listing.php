<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Listing extends Model
{
    use HasFactory;
    protected $fillable = [
        'office_name',
        'previous_name',
        'type_of_rent',
        'head_office_approval',
        'head_office_approval_date',
        'building_type',
        'year_of_construction',
        'starting_date',
        'floor_space',
        'floor_position',
        'rent_per_sqft',
        'tensure_of_lease_aggrement',
        'expiry_date_of_aggrement',
        'address',
        'division',
        'district',
        'upazila',
        'longitude',
        'latitude',
        'status',
    ];

    protected $casts = [
        'floor_position' => 'array',
        'date_of_starting' => 'object'
    ];
}
