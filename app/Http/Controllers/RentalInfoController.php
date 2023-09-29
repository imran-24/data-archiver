<?php

namespace App\Http\Controllers;

use App\Models\Listing;
use Devfaysal\BangladeshGeocode\Models\District;
use Devfaysal\BangladeshGeocode\Models\Division;
use Devfaysal\BangladeshGeocode\Models\Upazila;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RentalInfoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $queryParameters = $request->query();
        $searchQuery = $queryParameters['search'] ?? null;

        $listings = Listing::orderBy("created_at", "desc");

        if ($searchQuery) {
            $listings->where(function ($query) use ($searchQuery) {
                $query->where('id', 'like', '%' . $searchQuery . '%')
                    ->orWhere('building_type', 'like', '%' . $searchQuery . '%')
                    ->orWhere('office_name', 'like', '%' . $searchQuery . '%')
                    ->orWhere('previous_name', 'like', '%' . $searchQuery . '%');
            });
        }

        if (isset($queryParameters['Division'])) {
            $listings->where('division', $queryParameters['Division']);
        }
        if (isset($queryParameters['District'])) {
            $listings->where('district', $queryParameters['District']);
        }
        if (isset($queryParameters['Upazila'])) {
            $listings->where('upazila', $queryParameters['Upazila']);
        }

        if (isset($queryParameters['Approval'])) {
            $listings->where('head_office_approval', $queryParameters['Approval']);
        }

        if (isset($queryParameters['RentType'])) {
            $listings->where('type_of_rent', $queryParameters['RentType']);
        }

        $listings = $listings->get();


        $divisions = Division::all();
        $districts = District::all();
        $upazilas = Upazila::all();
        if(Auth::user()){
            $user = Auth::user();
            return Inertia
            ::render('RentalInfos/page',[
                'rental_infos' => $listings,
                'user' => $user,
                'divisions' => $divisions,
                'districts' => $districts,
                'upazilas' => $upazilas,
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function dashboard()
    {
        $listings = Listing::orderBy("created_at", "desc");
        $listings = $listings->get();

        if(Auth::user()){
            $user = Auth::user();
            return Inertia
            ::render('Dashboard',[
                'rental_infos' => $listings,
                'user' => $user,
            ]);
        }

    }

    public function criticalListings()
    {
        $listings = Listing::orderBy("created_at", "desc");
        $listings = $listings->get();

        $divisions = Division::all();
        $districts = District::all();
        $upazilas = Upazila::all();
        if(Auth::user()){
            $user = Auth::user();
            return Inertia
            ::render('CriticalListings/page',[
                'rental_infos' => $listings,
                'user' => $user,
                'divisions' => $divisions,
                'districts' => $districts,
                'upazilas' => $upazilas,
            ]);
        }

    }

    public function expiredListings()
    {
        $listings = Listing::orderBy("created_at", "desc");
        $listings = $listings->get();

        $divisions = Division::all();
        $districts = District::all();
        $upazilas = Upazila::all();
        if(Auth::user()){
            $user = Auth::user();
            return Inertia
            ::render('ExpiredListings/page',[
                'rental_infos' => $listings,
                'user' => $user,
                'divisions' => $divisions,
                'districts' => $districts,
                'upazilas' => $upazilas,
            ]);
        }

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Listing $rental_info)
    {
        
        $divisions = Division::all();
        $districts = District::all();
        $upazilas = Upazila::all();
        if(Auth::user()){
            $user = Auth::user();
            return Inertia::render('RentalInfos/RentalInfo/page',[
                'rental_info' => $rental_info,
                'user' => $user,
                'divisions' => $divisions,
                'districts' => $districts,
                'upazilas' => $upazilas,
        ]);}
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
