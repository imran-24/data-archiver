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
        $searchQuery = $request->input('search');

        if($searchQuery)
            {$listings = Listing::orderBy("created_at", "desc")
                ->when($searchQuery, function ($query) use ($searchQuery) {
            // Apply search filter if a searchQuery is provided
                return $query->where('office_name', 'like', '%' . $searchQuery . '%')
                    ->orWhere('previous_name', 'like', '%' . $searchQuery . '%');
            })
            ->get();
            
        }else{
            $listings = Listing::orderBy("created_at", "desc")->get();
        }


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
    public function create()
    {
        //
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
