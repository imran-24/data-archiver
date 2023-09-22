<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use DateInterval;
use DateTime;
use Devfaysal\BangladeshGeocode\Models\District;
use Devfaysal\BangladeshGeocode\Models\Division;
use Devfaysal\BangladeshGeocode\Models\Upazila;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class ListingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listings = Listing::orderBy("created_at", "desc")->get();
        
        if(Auth::user()){
            $user = Auth::user();
            return Inertia::render('Admin/Listings/page',[
                'listings' => $listings,
                'user' => $user,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $divisions = Division::all();
        $districts = District::all();
        $upazilas = Upazila::all();
        if(Auth::user()->is_admin){
            $user = Auth::user();
            return Inertia::render('Admin/Listings/listing/page',[
                        'user' => $user,
                        'divisions' => $divisions,
                        'districts' => $districts,
                        'upazilas' => $upazilas,
        
            ]);
        }
        return back();     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'office_name' => ['required', 'string', 'max:255'],
            'type_of_rent' => ['required', 'string'],
            'building_type' => 'required',
            'year_of_construction' => 'required', 
            'floor_space' => ['required', 'numeric'],
            'floor_position' => 'required',
            'rent_per_sqft' => ['required', 'numeric'],
            'tensure_of_lease_aggrement' => ['required', 'numeric'],
            'starting_date' => 'required',
            'expiry_date_of_aggrement' => ['required', 'date'],
            'address' => ['required', 'string', 'max:255'],
            'division' => ['required', 'string', 'max:10'],
            'district' => ['required', 'string', 'max:10'],
            'upazila' => ['required', 'string', 'max:10'],

        ]);

        
        
        $listing = new Listing();

        // floor position formatter
        // $floor_position = [];
        // foreach ($request->floor_position as $item) {
        //     array_push($floor_position, $item['value']);
        // }

        // expiry date formatter
        


        $listing->office_name = $request->office_name;
        $listing->previous_name = $request->previous_name;
        $listing->type_of_rent = $request->type_of_rent;
        $listing->building_type = $request->building_type;
        $listing->head_office_approval = $request->head_office_approval;
        $listing->year_of_construction = $request->year_of_construction;
        $listing->floor_space = $request->floor_space;
        $listing->floor_position = $request->floor_position;
        $listing->rent_per_sqft = $request->rent_per_sqft;
        $listing->tensure_of_lease_aggrement = $request->tensure_of_lease_aggrement;
        $listing->starting_date = $request->starting_date;
        $listing->expiry_date_of_aggrement = $request->expiry_date_of_aggrement;
        $listing->address = $request->address;
        $listing->division = $request->division;
        $listing->district = $request->district;
        $listing->upazila = $request->upazila;
        $listing->longitude = $request->location['lng'];
        $listing->latitude = $request->location['lat'];
        $listing->status = $request->status;

        $listing->save();

        return back();
     
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Listing $listing)
    {
        if(Auth::user()){
            $user = Auth::user();
            return Inertia::render('Admin/Listings/Details',[
                'listing' => $listing,
                'user' => $user
        ]);}
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Listing $listing)
    {
        
        $divisions = Division::all();
        $districts = District::all();
        $upazilas = Upazila::all();
        return Inertia::render('Admin/Listings/listing/page',[
            'listing' => $listing,
            'divisions' => $divisions,
            'districts' => $districts,
            'upazilas' => $upazilas,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Listing $listing)
    {
        $validate = $request->validate([
            'office_name' => ['required', 'string', 'max:255'],
            'type_of_rent' => ['required', 'string'],
            'building_type' => 'required',
            'year_of_construction' => 'required', 
            'floor_space' => ['required', 'numeric'],
            'floor_position' => 'required',
            'rent_per_sqft' => ['required', 'numeric'],
            'tensure_of_lease_aggrement' => ['required', 'numeric'],
            'starting_date' => 'required',
            'expiry_date_of_aggrement' => ['required', 'date'],
            'address' => ['required', 'string', 'max:255'],
            'division' => ['required', 'string', 'max:10'],
            'district' => ['required', 'string', 'max:10'],
            'upazila' => ['required', 'string', 'max:10'],
            // 'longitude',
            // 'latitude',
            // 'status',
        ]);

       
        $listing->update([
            'office_name' => $request->office_name,
            'previous_name' => $request->previous_name,
            'type_of_rent' => $request->type_of_rent,
            'building_type' => $request->building_type,
            'head_office_approval' => $request->head_office_approval,
            'year_of_construction' => $request->year_of_construction,
            'floor_space' => $request->floor_space,
            'floor_position' => $request->floor_position,
            'rent_per_sqft' => $request->rent_per_sqft,
            'tensure_of_lease_aggrement' => $request->tensure_of_lease_aggrement,
            'starting_date' => $request->starting_date,
            'expiry_date_of_aggrement' => $request->expiry_date_of_aggrement,
            'address' => $request->address,
            'division' => $request->division,
            'district' => $request->district,
            'upazila' => $request->upazila,
            'longitude' => $request->location['lng'],
            'latitude' => $request->location['lat'],
            'status' => $request->status,
        ]);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Listing $listing)
    {
        $listing->delete();
        return response()->json([
          'status' => 200,
          'message'=> "This item is deleted successfully"
        ], 200);
    }
}
