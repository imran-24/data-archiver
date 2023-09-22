<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();
            $table->string('office_name');
            $table->string('previous_name')->nullable();
            $table->tinyInteger('type_of_rent');
            $table->boolean('head_office_approval')->default(false);
            $table->date('head_office_approval_date')->nullable();
            $table->string('building_type');
            $table->year('year_of_construction');
            $table->double('floor_space');
            $table->string('floor_position');
            $table->double('rent_per_sqft');
            $table->string('tensure_of_lease_aggrement');
            $table->date('starting_date');
            $table->date('expiry_date_of_aggrement');
            $table->string('address');
            $table->string('division');
            $table->string('district');
            $table->string('upazila');
            $table->string('longitude')->nullable();
            $table->string('latitude')->nullable();
            $table->tinyInteger('status')->default(0);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listings');
    }
};
